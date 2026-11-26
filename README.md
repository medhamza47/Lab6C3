# Lab 6 — Routing et navigation

1. Démarrer Spring Boot depuis `backend/` avec Java 17 et `mvn spring-boot:run`.
2. À la racine du dépôt, avec Node.js 22.12 ou plus récent sur cette branche, exécuter `npm install`, puis `npm start`.
3. Ouvrir http://localhost:4200. Le serveur Angular redirige les requêtes API vers Spring Boot.

Le tableau de bord est protégé par une garde qui redirige les visiteurs vers `/login`. Cette page ouvre une session de démonstration en mémoire. L’authentification côté serveur est étudiée dans le lab 8.

Les sections Étudiants et Formations sont chargées à la demande. Chaque liste ouvre une fiche par identifiant. La recherche des étudiants utilise le paramètre `search`, que la navigation de retour conserve. Une URL inconnue affiche la page 404.
