
# Documentation API EventSync

Bienvenue dans l’API EventSync. Cette documentation décrit l’ensemble des routes disponibles, leur comportement, les schémas de données et les règles d’accès.

## Authentification

- **Routes publiques** : aucune authentification requise (consultation événement, planning, intervenants, questions/upvotes).
- **Routes administrateur** : toutes les routes sous `/api/admin/...` nécessitent un **JWT** (Bearer Token) obtenu via `/admin/auth/login` ou `/admin/auth/register`. Le token doit être envoyé dans l’en-tête `Authorization: Bearer <token>`.

### Administrateur par défaut (après seeding)
- Email : `admin@eventsync.com`
- Mot de passe : `admin123`

---

## 1. Routes publiques

### 1.1 Événements

#### `GET /api/events`
Retourne la liste de tous les événements (seulement les métadonnées).

#### `GET /api/events/{id}`
Retourne les détails d’un événement, y compris la liste complète de ses sessions (avec salle et intervenants associés).

### 1.2 Salles

#### `GET /api/rooms`
Liste toutes les salles, chacune embarquant la liste des sessions qui s’y déroulent (titre, horaires, intervenants).

### 1.3 Intervenants

#### `GET /api/speakers`
Liste tous les intervenants (ID + nom complet).

#### `GET /api/speakers/{id}`
Page publique d’un intervenant : nom, photo, biographie, liens externes et liste des sessions auxquelles il participe (avec titre, horaires, salle).

### 1.4 Sessions et questions

#### `GET /api/sessions/{id}`
Détail complet d’une session : titre, description, horaires, capacité informative, salle, liste des intervenants.

#### `GET /api/sessions/{id}/questions`
Renvoie toutes les questions posées pour cette session, triées par nombre de upvotes (décroissant).  
**Condition d’accès** : La requête échoue avec `403` si la session n’est pas en cours (heure courante en dehors de la plage startTime → endTime).

#### `POST /api/sessions/{id}/questions`
Permet à un participant de poser une question.  
**Body** :
```json
{
  "content": "ma question",
  "authorName": "optionnel (par défaut 'Anonyme')"
}
```
**Contrôle** : la session doit être live (startTime ≤ now ≤ endTime), sinon renvoie `403`.  

#### `POST /api/questions/{questionId}/upvote`
Incremente le compteur de upvotes de la question cible.  
**Contrôle** : vérifie que la session associée est encore en cours (même règle que ci-dessus). Si la session est terminée, renvoie `403`.

---

## 2. Routes administrateur (JWT requis)

Toutes les routes commencent par `/api/admin/`, nécessitent un JWT valide et un rôle admin.

### 2.1 Authentification admin

#### `POST /api/admin/auth/register`
Inscrit un nouvel administrateur.  
**Body** : `{ "email": "...", "password": "..." }`  
Retourne un JWT et les informations utilisateur.

#### `POST /api/admin/auth/login`
Authentifie un administrateur existant.  
**Body** : `{ "email": "...", "password": "..." }`  
Retourne un JWT.

### 2.2 Gestion des événements

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| `POST` | `/admin/events` | Crée un événement (titre, description, startDate, endDate, location) |
| `PUT` | `/admin/events/{id}` | Modifie un événement existant |
| `DELETE` | `/admin/events/{id}` | Supprime un événement (ses sessions sont supprimées en cascade) |

### 2.3 Gestion des salles

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| `POST` | `/admin/rooms` | Crée une salle (nom) |
| `PUT` | `/admin/rooms/{id}` | Modifie le nom d’une salle |
| `DELETE` | `/admin/rooms/{id}` | Supprime une salle (les sessions perdent leur salle, mais restent) |

### 2.4 Gestion des intervenants

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| `POST` | `/admin/speakers` | Crée un intervenant (fullName, photoUrl, bio, externalLinks) |
| `PUT` | `/admin/speakers/{id}` | Modifie un intervenant |
| `DELETE` | `/admin/speakers/{id}` | Supprime un intervenant (les sessions concernées ne l’afficheront plus) |

### 2.5 Gestion des sessions

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| `POST` | `/admin/sessions` | Crée une session (titre, description, startTime, endTime, eventId, roomId, capacity, speakerIds) |
| `PUT` | `/admin/sessions/{id}` | Met à jour une session (mêmes champs) – la liste `speakerIds` remplace les intervenants existants |
| `DELETE` | `/admin/sessions/{id}` | Supprime une session (les questions associées sont supprimées) |

---

## 3. Codes d’erreur standards

- `400` – Requête invalide (champ manquant, mauvaise valeur)
- `401` – Token manquant ou invalide (route admin)
- `403` – Action interdite (session non live, rôle insuffisant)
- `404` – Ressource non trouvée
- `500` – Erreur serveur (contacter l’administrateur)

---

## 4. Exemple d’utilisation d’une session live

1. **L’organisateur** crée un événement, une salle, un intervenant, puis une session avec `startTime` dans le futur proche.
2. **Participant** consulte `/api/events/{id}` pour voir le planning.
3. À l’heure de début, le frontend détecte la session `live` (grâce aux horaires exposés) et affiche le bouton "Poser une question".
4. Le participant soumet une question via `POST /api/sessions/{id}/questions`.
5. Plusieurs participants upvotent via `POST /api/questions/{questionId}/upvote`.
6. L’intervenant (ou tout participant) peut consulter les questions triées par upvotes via `/api/sessions/{id}/questions`.
