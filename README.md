# DrinkEats

Application de livraison de soupe.

Front: React
Back: Express + MongoDB

## Todo:

### Auth:
* Messages d'erreurs depuis le back (ex: "Mot de passe invalide")

### Command:
* Ajout d'une quantité maximale d'un produit à envoyer au front, pour éviter que la commande ne dépasse la quantité disponible.
* Ajout d'un fonctionnement de panier par cookie

### Front:
* Ajout d'une recherche de produit par mot clé
* Ajout d'une recherche de produit par catégorie
* Ajout de trie par prix
* Ajout d'un bouton "mes commandes" pour voir ses commandes passées / en cours -> grace au token / cookie / etc

### Admin:
* Ajout d'une catégorie userAdmin, pour pouvoir créer des produits, etc
* Ajout d'un système de validation de commande pour les admins (panelAdmin)

### Back:
* Ajouter le système de quantité de produit disponible
* Check soup pour savoir si le produit est disponible

