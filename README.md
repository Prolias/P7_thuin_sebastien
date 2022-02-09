# Projet 7 du parcours Développeur web - OpenClassrooms

## Utilitaires nécessaires :
NodeJs version 17.x.x

MySQL avec MySQLWorkbench

## Processus d'installation de l'application

### Les commandes suivantes sont à exécuter dans le dossier `Back`

- Initialiser le backend avec la commande `npm install`

- Executer les migrations de la base de donnée avec la commande `npx sequelize-cli db:migrate`

  - Si la commande ne veut s'exécuter créer la base de donnée `groupomania` sur MySQL et réitérer la commande

- Créer un fichier `.env` à la racine du dossier `Back` avec les champs suivants : 
  - DB_HOST
  - DB_USER
  - DB_PASSWORD
  - DB_NAME
  - TOKEN_ENCRYPT

- Lancer le backend avec la commande `npm start`

### En parallèle à exécuter dans le dossier `front`

- Initialiser le frontend avec la commande `npm install`

- Créer un build du frontend avec la commande `npm run build`

- Installer l'application serve sur votre machine avec la commande `npm install -g serve`

- Lancer le serveur avec la commande `serve -s build`