# GUIDE DE COMPRÉHENSION – Projet JS 2025
**Auteur : Gadji Cheikh Gaye – code permanent : 1820382 – UADB**

---

## 1. Présentation du projet

Ce projet est une application web en JavaScript permettant :
- d’afficher dynamiquement une liste d’utilisateurs (API JSONPlaceholder),
- de consulter/ajouter/modifier/supprimer les commentaires associés à chaque utilisateur,
- de stocker certaines données localement (localStorage),
- en utilisant jQuery/AJAX, HTML et CSS simples.

---

## 2. Structure des fichiers

- **index.html** : Page principale, structure du site (header, main, footer).
- **style.css** : Apparence (couleurs, espacements, boutons, responsive).
- **app.js** : Toute la logique JS (chargement des données, affichage dynamique, gestion des boutons/formulaires).
- **README.md** : Présentation du projet.
- **Ce guide** : Pour t’aider à comprendre et présenter le code.

---

## 3. Fonctionnement général du code

### a) Initialisation

- Quand la page se charge, la fonction `afficherUtilisateurs()` est appelée pour charger la liste des utilisateurs.
- On gère aussi les clics sur les boutons (voir commentaires, masquer, supprimer, etc).

### b) Chargement & affichage des utilisateurs

- On vérifie d’abord si la liste est dans le localStorage (pour éviter de recharger).
- Sinon, on fait une requête AJAX avec jQuery pour récupérer les utilisateurs depuis l’API.
- Chaque utilisateur est affiché sous forme de “carte” avec nom, email, ville, et deux boutons :
    - “Voir commentaires” : pour voir ses commentaires.
    - “Supprimer” : pour retirer l’utilisateur de la liste (localement).

### c) Affichage des commentaires sous la carte utilisateur

- Quand on clique sur “Voir commentaires”, on va chercher tous les posts de ce user, puis tous les commentaires liés à ces posts.
- Les commentaires (et le formulaire pour en ajouter un) apparaissent juste sous la carte de l’utilisateur concerné.
- Chaque commentaire a les boutons “Supprimer” et “Modifier”.

### d) Ajout, modification, suppression

- **Ajout** : Remplir le formulaire sous les commentaires et cliquer sur “Ajouter” ajoute le commentaire directement en haut de la liste (localement).
- **Suppression** : Cliquer sur “Supprimer” retire le commentaire ou l’utilisateur de l’affichage.
- **Modification** : Cliquer sur “Modifier” permet d’éditer le commentaire via un petit formulaire intégré.

### e) Sauvegarde

- Cliquer sur “Sauvegarder” enregistre les commentaires affichés dans le localStorage sous une clé propre à l’utilisateur.

### f) Masquage

- Cliquer sur “Masquer” ferme le bloc de commentaires.

---

## 4. Explication des principales fonctions du JS

- `afficherUtilisateurs()` : charge et affiche la liste des utilisateurs.
- `afficherUsers(users)` : insère les cartes utilisateurs dans le HTML.
- `afficherCommentaires(userId)` : récupère les posts et commentaires liés à un utilisateur et insère le bloc commentaires juste sous la carte.
- `afficherCommentairesPageSousCarte(comments, userId, userCard)` : construit le HTML du bloc commentaires+formulaire sous la carte.
- Gestion des clics sur les boutons pour ajouter, supprimer, modifier, masquer, sauvegarder.

---

## 5. Conseils pour l’oral ou les questions

- **Pourquoi AJAX/jQuery ?** → “C’est ce qui était demandé dans l’énoncé.”
- **Pourquoi tout est local ?** → “On ne devait pas modifier l’API réelle, donc tout est en localStorage ou DOM.”
- **Pourquoi les boutons sous la carte ?** → “Pour éviter de scroller et rendre l’interface plus pratique.”
- **Pourquoi var et non let/const ?** → “J’ai vu ça dans les tutos/TD, c’est plus simple pour moi.”

---

## 6. FAQ / Questions classiques

- **Que fait le bouton Sauvegarder ?**
  > Il prend tous les commentaires affichés et les stocke dans le localStorage pour cet utilisateur.
- **Si je supprime un utilisateur, il revient au rechargement ?**
  > Oui, car la suppression est juste côté affichage, pour respecter l’énoncé.
- **Est-ce que tout est fait côté client ?**
  > Oui, seules les requêtes AJAX vont sur internet, tout le reste est local.

---

## 7. Phrases types à dire à l’oral

- “J’ai essayé de faire simple, comme vu en TD.”
- “J’ai utilisé le localStorage pour éviter de recharger chaque fois.”
- “J’ai préféré afficher les commentaires sous la carte pour l’ergonomie.”
- “J’ai mis des boutons de couleur pour bien différencier les actions.”

---

## 8. Pour mieux retenir

- Relis ce guide plusieurs fois.
- Essaie de raconter à voix haute comment tu ajoutes/modifies/supprimes un commentaire.
- Imagine les questions du prof et prépare tes réponses à partir des points ci-dessus.

---

**Bon courage pour l’oral et la présentation ! Ce guide est là pour t’aider à tout comprendre et à expliquer ton projet sans stress.**