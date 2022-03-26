# Back end - DrinkEats

start the project:

```
node server.js
```

using nodemon

```
nodemon server
```

Create a .env file in /api folder with the following content: // pas super pratique ce readme en localhost

```
MONGO_LINK = 'mongodb+srv://chuya:<pswd>@cluster0.vvtuz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
RANDOM_TOKEN_SECRET = '<token>'
```

// manque sûrement la documentation pour remplir la DB car je n'ai aucun produit affiché

`<pswd>` et `<token>` sont a remplacer par les valeurs données dans le mail.

Routes de l'application:

Le panier doit être stocké dans un cookie. Dès que le panier est validé, ça passe en base de données.

Pour le login, il faut utiliser un stockage dans un cookie et d’une session cookie, c’est le plus simple et le plus efficace.

POST /login permet à l’utilisateur de se connecter (mais il semble qu’il n’y en a pas besoin

DELETE /login permet de déconnecter l’utilisateur (mais il semble qu’il n’y en a pas besoin)

POST /register permet à l’utilisateur de se créer un compte (mais il semble qu’il n’y en a pas besoin)

POST /users permet de créer un utilisateur

PUT /users/:id permet de modifier un utilisateur

- Le mieux étant d’utiliser celui dans la session active pour éviter les soucis de sécurité

GET /users/:id permet de récupérer un utilisateur

GET /products permet de récupérer la liste des produits

GET /products/:id permet de récupérer un unique produit

POST /products permet de créer un produit

Ne doit pouvoir être fait que par l’administrateur

PUT /products permet de modifier un produit

Ne doit pouvoir être fait que par administrateur

GET /users/:id/orders permet de récupérer les commandes d’un unique utilisateur

Utiliser l’utilisateur dans la session pour faciliter les choses

POST /orders permet de créer une commande

Le créateur de la commande est celui contenu dans la session

POST /orders/:id/validate permet à l’administrateur de valider une commande

DELETE /order/:id/validate permet à l’administrateur d’annuler la validation de la commande
