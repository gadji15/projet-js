# 🚀 SUPER GUIDE DE RÉVISION – Projet JavaScript 2025

_Auteur : Gadji Cheikh Gaye (1820382) – UADB_

---

## 🗂️ Sommaire

- [1. Contexte et objectifs](#1-contexte-et-objectifs)
- [2. Organisation et structure du projet](#2-organisation-et-structure-du-projet)
- [3. Fonctionnement général](#3-fonctionnement-général)
- [4. Explication détaillée du code](#4-explication-détaillée-du-code)
  - [Affichage des utilisateurs](#affichage-des-utilisateurs)
  - [Affichage des commentaires](#affichage-des-commentaires)
  - [Ajout, suppression, modification de commentaires](#ajout-suppression-modification-de-commentaires)
  - [Bonus et ergonomie](#bonus-et-ergonomie)
- [5. Mots-clés et concepts à retenir](#5-mots-clés-et-concepts-à-retenir)
- [6. Conseils d’oral, FAQ et astuces](#6-conseils-doral-faq-et-astuces)
- [7. Exemples de questions/réponses](#7-exemples-de-questionsréponses)
---

## 1. 🎯 Contexte et objectifs

> Réaliser une application web qui affiche et permet de manipuler dynamiquement des utilisateurs et commentaires via l’API JSONPlaceholder, avec AJAX/jQuery, tout en respectant les contraintes pédagogiques de l’énoncé.

---

## 2. 🏗️ Organisation et structure du projet

| Fichier         | Rôle principal                                         |
|-----------------|-------------------------------------------------------|
| `index.html`    | La page principale, la structure du site              |
| `style.css`     | Le style du site, couleurs, marges, boutons…          |
| `app.js`        | Toute la logique : AJAX, affichage dynamique, actions |
| `README.md`     | Présentation du projet                                |
| `SUPER_GUIDE_PROJET_JS.md` | Ce guide de révision                       |

---

## 3. 🧩 Fonctionnement général

- **Chargement de la page** : la liste des utilisateurs s’affiche automatiquement.
- **Affichage utilisateurs** : chaque carte utilisateur propose “Voir commentaires” et “Supprimer”.
- **Affichage des commentaires** : s’ouvre juste sous la carte de l’utilisateur concerné, pour éviter tout défilement inutile.
- **Ajout, modification, suppression** : tout se fait côté client, instantanément.
- **Bonus** : boutons Masquer/Sauvegarder, gestion locale, interface responsive.

---

## 4. 📝 Explication détaillée du code

### Affichage des utilisateurs

```js
function afficherUtilisateurs() {
    $('#users-list').html('<em>Chargement en cour...</em>'); // faute volontaire
    var usersFromStorage = localStorage.getItem('users');
    if (usersFromStorage) {
        var users = JSON.parse(usersFromStorage);
        afficherUsers(users);
    } else {
        $.ajax({
            url: 'https://jsonplaceholder.typicode.com/users',
            method: 'GET',
            success: function(data) {
                localStorage.setItem('users', JSON.stringify(data));
                afficherUsers(data);
            },
            error: function() {
                $('#users-list').html("<span class='error'>Erreur de connexion. Veuillez réessayer plus tard.</span>");
            }
        });
    }
}
```
- **LocalStorage** : évite de refaire la requête à chaque fois.
- **AJAX** : pour charger les utilisateurs dynamiquement.
- **Simplicité** : pas de structure complexe, tout est séquentiel.

---

### Affichage des commentaires

```js
function afficherCommentaires(userId) {
    $('.comments-bloc').remove(); // on retire les anciens
    var userCard = $('.user-card[data-user-id="' + userId + '"]');
    if (userCard.length === 0) return;
    userCard.after('<div class="comments-bloc"><em>Chargement des commentaires...</em></div>');
    // ... (récupération des posts, puis des commentaires)
}
```
- **Affichage juste sous la carte utilisateur** : ergonomique et naturel.
- **Suppression de l’ancien bloc** : évite d’avoir plusieurs sections ouvertes.

---

### Ajout, suppression, modification de commentaires

```js
// Ajout d'un commentaire
$(document).on('submit', '.add-comment-form', function(e) {
    e.preventDefault();
    // ... récupération des champs ...
    var newCommentHtml = '<div class="comment-card" ... > ... </div>';
    $('.comments-list').prepend(newCommentHtml);
    $(this)[0].reset();
});

// Suppression d'un commentaire
$(document).on('click', '.btn-delete-comment', function() {
    $(this).closest('.comment-card').remove();
});

// Modification d'un commentaire
$(document).on('click', '.btn-edit-comment', function() {
    // Affiche un mini-formulaire dans la carte
});
```
- **Tout est fait côté client** : rien ne part sur le serveur.
- **Code simple, lisible, sans piège**.

---

### Bonus et ergonomie

- **Sauvegarde** : bouton vert “Sauvegarder” → stocke les commentaires dans le localStorage.
- **Masquer** : bouton orange “Masquer” → ferme la section commentaires.
- **Responsive** : le design s’adapte sur mobile.

---

## 5. 🏷️ Mots-clés et concepts à retenir

| Mot clé        | Explication rapide                                    |
|----------------|-------------------------------------------------------|
| `jQuery`       | Lib pour manipuler le DOM et faire des requêtes AJAX  |
| `AJAX`         | Charger des données sans recharger la page            |
| `localStorage` | Stocker des données dans le navigateur                |
| `.on('click', ...)` | Attacher un événement à un bouton                |
| `prepend()`    | Ajouter un élément en haut d’un bloc                  |
| `data-*`       | Attribut HTML pour garder l’ID ou info sous le coude  |

---

## 6. 💡 Conseils d’oral, FAQ et astuces

> **Astuce :** Explique étape par étape ce que tu fais quand tu cliques sur un bouton (voir, ajouter, supprimer…).
>
> **À retenir pour l’oral :**
> - “J’ai voulu faire simple, comme vu en TD.”
> - “J’ai utilisé le localStorage pour stocker côté client.”
> - “J’ai placé les commentaires juste sous la carte utilisateur pour l’ergonomie.”
> - “Tout est instantané, rien n’est envoyé sur le serveur.”

### **FAQ**

- **Pourquoi AJAX/jQuery ?** → “C’était dans l’énoncé.”
- **Pourquoi tout en local ?** → “Pour respecter la consigne de ne pas modifier l’API.”
- **Comment fonctionne la sauvegarde ?** → “Je prends les commentaires affichés et les mets dans le localStorage.”

---

## 7. 🤓 Exemples de questions/réponses

- **Q : Que fait le bouton “Sauvegarder” ?**  
  **R :** Il prend tous les commentaires affichés et les stocke dans le localStorage, clé personnalisée pour l’utilisateur.

- **Q : Si je supprime un utilisateur, il revient au rechargement ?**  
  **R :** Oui, car la suppression n’est que côté affichage.

- **Q : Pourquoi pas “fetch” ?**  
  **R :** Parce qu’on devait utiliser jQuery/AJAX.

---

## 🎉 Pour finir

**Tu peux relire ce guide, tester chaque fonctionnalité dans l’appli, et t’entraîner à expliquer chaque étape à voix haute.  
Avec ça, tu es prêt à briller au devoir !**

---