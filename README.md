# TODO-API

## Base de données

Voici les étapes pour créer la base de données selon une approche code first.

1. Copier le fichier .env.example et le renommer .env
2. Compléter la configuration en remplissant les valeurs manquantes après le =. Dans notre cas, il ne manquerait que le `DB_PASSWORD=ton_mot_de_passe`.
3. Dans mariaDB, créer la base de données todo_api
4. exécuter la commande `npm run db:push` pour créer la base de données. La table est générée à partir du fichier `schema.ts`. Va y jeter un coup d'oeil.
5. Une fois que c'est fait, exécute `npm run dev` pour démarrer le serveur et va sur `http://localhost:3001/health`. Tu devrais avoir `"database": "healthy"` d'affiché.
6. C'est Drizzle qui sera notre ORM pour cette session.

### Questions à répondre :

0. On va se séparer les fichiers dans toute la classe. Ensuite, en grand groupe, on revient sur ces questions.
1. Quelle commande permet de démarrer ton serveur node.js?
2. Où sont entreposées les variables qui servent à configurer la base de données?
3. Comment sont lues ces variables qui sont dans le fichier .env?
4. Comment la table todos a-t-elle été créée?
5. Dans quel dossier se situe la configuration de la base de données?
6. Comment ferais-tu pour modifier
   1. Le nom de la base de données
   2. Le type de base de données
   3. Le nom d'une colonne
7. Quelle est l'architecture utilisée?
8. Si je veux ajouter une route, je vais où?
9. Ou est-ce qu'on gère les autorisations?

## Swagger
Il est possible de tester l'API à partir du fichier swagger.yml. Par contre, il n'existe pas encore...... Il faudrait le créer. Utilise github copilot pour qu'il génère ton fichier swagger.
```
servers:
  - url: http://localhost:3001
  - url: lien vers ton site web déployé
```

## Authentification et authorisation

Ajoute un accès protégé à l'API à l'aide d'un register et un login. Petite nouveauté, tu dois gérer deux niveaux d'accès soit administrateur et utilisateur normal. Je te laisse voir les sites webs fournis sur moodle pour t'aider!

## Déploiement

J'aimerais que tu déploies cet API sur un VPS digital ocean. Les contraintes sont les suivantes :
- Ton api doit être accessible sur une adresse de type fqdn (fully qualified domain name) ex : antoine.com  et non pas une adresse IP.
- Ton api doit être déployée une fois buildée (`npm run build`) sur le serveur. Un dossier nommé dist sera créé et c'est le fichier server.js qu'il faut démarrer.
- Jamais le fichier .env doit être dans ton projet (il contient le mot de passe vers ta base de données). Tu dois donc gérer les variables d'environnement dans le serveur directement.
  - Soit tu crées un autre fichier .env (moins sécuritaire, car il contient des informations critiques)
  - Soit tu lances le serveur avec une ligne dans ce genre : `PORT=3001 NODE_ENV=production DB_HOST=localhost ...ETC..... node dist/server.js`
