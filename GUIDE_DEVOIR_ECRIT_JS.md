# 📚 GUIDE DE PRÉPARATION – DEVOIR ÉCRIT JAVASCRIPT (ÉNONCÉ SPA JSONPLACEHOLDER)

_Auteur : Cheikh Gaye Gadji (1820382) – UADB_

---

## 📝 1. RAPPEL DE L’ÉNONCÉ / ATTENDUS

- Application web (SPA) en HTML/CSS/JS/jQuery/AJAX
- Afficher dynamiquement des utilisateurs et leurs commentaires via l’API JSONPlaceholder
- Gestion du localStorage
- Bonus : suppression/modification locale, interface propre et responsive

---

## 🧠 2. NOTIONS À MAÎTRISER POUR L’ÉCRIT

- **AJAX avec jQuery** : syntaxe, principe, callback success/error
- **Manipulation du DOM** : ajout/suppression de noeuds, classes, attributs
- **localStorage** : setItem, getItem, JSON.stringify/parse
- **Boucles JS** : for, forEach, map, filter
- **Gestion d’événements** : .on('click'), .on('submit')
- **Récupération de données d’une API** : $.ajax, $.get, $.post
- **Principe d’une SPA** : pas de rechargement de page, tout se manipule dynamiquement
- **Différence côté client / côté serveur**
- **Organisation de code** : séparer logique, affichage, styles

---

## ❗ 3. PIÈGES CLASSIQUES À ÉVITER

- Oublier le callback error dans AJAX
- Ne pas parser/stringifier le JSON pour le localStorage
- Oublier d’initialiser ou de vérifier les champs du formulaire
- Ne pas vérifier si les tableaux sont vides avant d’afficher
- Confondre suppression locale (DOM) et suppression serveur (API)
- Ne pas commenter un minimum le code écrit à la main

---

## 💬 4. EXEMPLES DE QUESTIONS / MODÈLES DE RÉPONSES

### Q1 : Écrire le code pour récupérer les utilisateurs via AJAX (jQuery) et les afficher dans la console

```js
$.ajax({
    url: 'https://jsonplaceholder.typicode.com/users',
    method: 'GET',
    success: function(data) {
        console.log(data);
    },
    error: function() {
        console.log('Erreur de connexion');
    }
});
```
*À retenir : toujours mettre error, toujours utiliser success.*

---

### Q2 : Comment sauvegarder un tableau d’objets dans le localStorage ?

```js
let users = [{ id: 1, nom: "Jean" }];
localStorage.setItem('users', JSON.stringify(users));
```
*Explication : Il faut convertir le tableau en chaîne avec JSON.stringify.*

---

### Q3 : Expliquer la différence entre suppression locale et suppression serveur

> **Suppression locale** : on retire l’élément du DOM ou du localStorage, mais il existe toujours dans l’API distante.  
> **Suppression serveur** : on envoie une requête (DELETE) à l’API, l’élément disparaît pour tous.

---

### Q4 : Comment ajouter dynamiquement un commentaire à la liste dans le DOM ? (exemple en JS/jQuery)

```js
// Après avoir récupéré les champs du formulaire :
let html = '<div class="comment-card">' +
    '<strong>' + nom + '</strong> (' + email + ')<br>' +
    contenu +
    '</div>';
$('.comments-list').prepend(html);
```
*Astuce : .prepend() l’ajoute en haut de la liste.*

---

### Q5 : Définir AJAX, localStorage, SPA, callback

- **AJAX** : Technique pour charger des données sans recharger la page.
- **localStorage** : Espace de stockage clé/valeur dans le navigateur, persistant.
- **SPA** : Single Page Application, tout se passe sur une seule page, très dynamique.
- **Callback** : Fonction passée en paramètre, exécutée après une opération (ex : success dans AJAX).

---

## 🏷️ 5. MOTS-CLÉS, SYNTHAXES ET EXPRESSIONS À PLACER DANS SA COPIE

- `$.ajax({...})` **pour charger des données**
- `.on('click', ...)` **pour gérer les actions utilisateur**
- `localStorage.setItem` / `localStorage.getItem`
- `JSON.stringify` / `JSON.parse`
- **Manipulation du DOM** : `.html()`, `.append()`, `.remove()`
- **Vérification des données** : `if (users && users.length > 0) {...}`

---

## 📝 6. CONSEILS DE PRÉSENTATION ÉCRITE

- **Toujours commenter** le code écrit à la main, même brièvement.
- **Bien indenter** pour montrer que tu maîtrises la structure.
- **Faire des schémas** pour expliquer le flux (ex : “Chargement → Affichage → Ajout/Suppression”)
- **Utiliser les mots-clés JS/jQuery** du cours.
- **Toujours expliquer les choix** (“J’utilise le localStorage pour sauvegarder côté client…”).
- **Répondre en phrases courtes et claires**.

---

## 🎤 7. MODÈLE DE PLAN POUR UNE QUESTION DE RÉDACTION

**Ex : “Expliquez le fonctionnement général d’une SPA qui gère des utilisateurs et commentaires.”**

- Introduction rapide (rappeler ce qu’est une SPA, le contexte)
- Étape 1 : Chargement des utilisateurs (AJAX, affichage dynamique)
- Étape 2 : Affichage des commentaires (AJAX, filtrage, DOM)
- Étape 3 : Ajout/Suppression/Modification (DOM uniquement, localStorage)
- Bonus : Responsive, ergonomie, gestion locale
- Conclusion (“Ce fonctionnement permet une interface fluide et moderne, comme demandé dans l’énoncé.”)

---

## ✅ 8. CHECK-LIST DE RÉVISION AVANT LE DEVOIR

- [ ] Je sais coder une requête AJAX avec jQuery (avec gestion d’erreur)
- [ ] Je sais afficher dynamiquement du contenu dans le DOM
- [ ] Je sais utiliser le localStorage (en JSON)
- [ ] Je sais expliquer la différence entre frontend/backend, local/server
- [ ] Je sais comment ajouter/modifier/supprimer localement un élément
- [ ] Je sais présenter chaque étape du flux de l’application
- [ ] Je connais les mots-clés à placer dans ma copie

---

## 🚩 À retenir

> - Écrire simple, clair, sans chercher à “faire pro” à tout prix
> - Montrer que tu comprends la logique, pas juste raconter le code
> - Citer AJAX, DOM, localStorage, SPA, callback, etc.
> - Relire sa copie, vérifier l’indentation/les commentaires

**Avec ce guide, tu peux réviser, t’entraîner à écrire tes réponses, et viser la meilleure note au devoir écrit !**

---