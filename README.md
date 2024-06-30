# Application Angular pour la gestion d'événements

## Fonctionnalités principales

- **Inscription et connexion des utilisateurs**
  - `UsersService` pour l'inscription, la connexion et la gestion des utilisateurs.
  - Stockage des informations d'utilisateur dans `SessionStorageService`.

- **Gestion des événements**
  - `EventService` pour récupérer, créer, mettre à jour et supprimer des événements.
  - `CategoryService` pour gérer les catégories d'événements.

- **Inscriptions aux événements**
  - `RegistrationService` pour gérer l'inscription des utilisateurs aux événements.

- **Réinitialisation de mot de passe**
  - Utilisation de `SwalService` pour afficher des messages d'alerte.
  - `UserService` pour la recherche d'utilisateurs par email et la réinitialisation du mot de passe.

## Configuration et installation

1. **Prérequis**
   - Assurez-vous d'avoir Node.js et npm installés localement.

2. **Installation des dépendances**
   ```bash
   npm install 
   ```
## Utilisation
Démarrez le serveur de développement avec ng serve.
Ouvrez votre navigateur et accédez à http://localhost:4200/ pour voir l'application en action.

## Auteur
 
Jeanne-Emma Lefèvre
