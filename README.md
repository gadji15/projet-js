# Application Utilisateurs & Commentaires – Projet JavaScript

---

### Informations étudiant

- **Nom** : Gadji
- **Prénoms** : Cheikh Gaye
- **Code permanent** : 1820382
- **Université** : Université Alioune Diop de Bambey (UADB)
- **Date et lieu de naissance** : 15/03/2004 à Saly

---

## Présentation

Ce projet est une application web **Single Page (SPA)** développée dans le cadre du Devoir n°1 de JavaScript à l’UADB.  
L’objectif est d’afficher et de manipuler dynamiquement des utilisateurs et leurs commentaires en consommant l’API JSONPlaceholder.  
Tout a été réalisé individuellement et sans autre bibliothèque que jQuery, conformément à l’énoncé.

---

## Technologies utilisées

- **HTML5**
- **CSS3**
- **JavaScript (ES6)**
- **jQuery (AJAX)**

---

## Structure du projet

```
.
├── index.html          # Page principale de l’application
├── style.css           # Feuille de style personnalisée
├── app.js              # Script principal (toute la logique JS)
├── README.md           # Ce document
└── enonce projet.pdf   # Sujet du devoir (fourni)
```

---

## Installation et lancement

1. **Télécharger ou dézipper** le dossier du projet.
2. Ouvrir simplement le fichier `index.html` dans votre navigateur (aucune installation requise).
3. Il faut une connexion Internet pour que les requêtes AJAX vers l’API fonctionnent.

---

## Mode d’emploi

- La page affiche la liste des utilisateurs (nom, email, ville).
- Pour chaque utilisateur, un bouton permet d’afficher ses commentaires.
- On peut :
    - **Masquer les commentaires**
    - **Sauvegarder les commentaires affichés** (dans le localStorage du navigateur)
    - **Ajouter un commentaire** (formulaire en bas, le commentaire apparaît tout de suite)
    - **Supprimer un commentaire** (bouton rouge sur chaque commentaire, suppression locale)
    - **Modifier un commentaire** (bouton orange sur chaque commentaire, modification en ligne)
    - **Supprimer un utilisateur** (bouton rouge à droite du nom, suppression locale)
- Toutes les actions de suppression et modification sont **locales** et n’affectent pas l’API distante.

---

## Points particuliers & choix techniques

- Les requêtes AJAX utilisent uniquement jQuery comme autorisé.
- Le stockage local (localStorage) est utilisé pour les utilisateurs & commentaires sauvegardés.
- L’ajout, la suppression et la modification des commentaires ainsi que la suppression des utilisateurs sont gérés côté client uniquement.
- Le style est sobre, avec quelques couleurs pour différencier les boutons principaux/bonus.
- Le code est commenté aux endroits clés pour la compréhension.

---

## Remarques & contact

- Projet réalisé **seul** dans le cadre du devoir UADB – 2025.
- Toute ressemblance de code avec d’autres rendus serait purement fortuite.
- Pour toute question : Gadji Cheikh Gaye (UADB)

---

**Merci de votre lecture et bon test de l’application !**