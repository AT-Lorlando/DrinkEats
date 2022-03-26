# DrinkEats

Application de livraison de soupe.

Front: React
Back: Express + MongoDB

// pourquoi avoir push ton dossier node_modules ?

// les deux serveurs démarrent sur le port 3000 par défaut, c'est dommage

## Run the project

Use the token and the url given in the mail to start the project:

Go to /api folder and run the following command:

```
npm ci // beaucoup mieux quand tu push ton package-lock
node server
```

or

```
npm ci
nodemon server
```

then go to /app folder and run the following command:

```
npm ci
npm start
```

And press y to use another port for the front

## Todo:

### Auth:

- Messages d'erreurs depuis le back (ex: "Mot de passe invalide")

### Command:

- Ajout d'une quantité maximale d'un produit à envoyer au front, pour éviter que la commande ne dépasse la quantité disponible.
- Ajout d'un fonctionnement de panier par cookie
- Ajout d'un fonctionnement de session par cookie

### Front:

- Ajout d'une recherche de produit par mot clé
- Ajout d'une recherche de produit par catégorie
- Ajout de trie par prix
- Ajout d'un bouton "mes commandes" pour voir ses commandes passées / en cours -> grace au token / cookie / etc

### Admin:

- Ajout d'une catégorie userAdmin, pour pouvoir créer des produits, etc
- Ajout d'un système de validation de commande pour les admins (panelAdmin)

### Back:
