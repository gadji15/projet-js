# Script de Présentation – Projet JavaScript (Cheikh Gaye Gadji)

---

## Introduction

Bonjour,  
Je vais vous présenter mon projet JavaScript réalisé dans le cadre du devoir UADB, code permanent 1820382.  
C’est une application web qui permet de gérer dynamiquement des utilisateurs et leurs commentaires, en utilisant HTML, CSS, JavaScript et jQuery.

---

## Structure du projet

Le projet est composé de trois principaux fichiers :
- **index.html** : la page principale où tout s’affiche
- **style.css** : le fichier de style pour l’apparence du site
- **app.js** : le fichier JavaScript qui gère tout le fonctionnement dynamique

---

## Fonctionnement global

1. **Au chargement de la page**
   - La liste des utilisateurs s’affiche automatiquement.
   - Les utilisateurs sont récupérés via une requête AJAX à l’API, ou depuis le stockage local si déjà chargés.

2. **Affichage des utilisateurs**
   - Chaque utilisateur est présenté dans une carte avec son nom, son email, sa ville.
   - Deux boutons sont disponibles :
      - **Voir commentaires** : pour afficher les commentaires liés à cet utilisateur.
      - **Supprimer** : pour retirer l’utilisateur de la liste (localement).

3. **Affichage des commentaires**
   - Quand on clique sur “Voir commentaires”, les commentaires apparaissent juste sous la carte de l’utilisateur sélectionné.
   - Les commentaires sont récupérés en deux étapes :
      - D’abord les posts de l’utilisateur
      - Puis les commentaires liés à ces posts

4. **Gestion des commentaires**
   - Chaque commentaire a deux boutons :
      - **Supprimer** : pour retirer le commentaire de l’affichage
      - **Modifier** : pour éditer le commentaire directement en ligne
   - Un formulaire permet d’ajouter un nouveau commentaire, qui s’affiche en haut de la liste.

5. **Sauvegarde et masquage**
   - Le bouton **Sauvegarder** enregistre les commentaires affichés dans le localStorage du navigateur.
   - Le bouton **Masquer** ferme le bloc de commentaires sous l’utilisateur.

---

## Explication des choix

- **jQuery et AJAX** : J’ai utilisé jQuery comme demandé dans l’énoncé, pour les requêtes et la manipulation du DOM.
- **Tout est fait côté client** : Les ajouts, suppressions et modifications ne touchent que le navigateur, rien n’est modifié sur le serveur.
- **Affichage sous la carte utilisateur** : Cela évite de descendre dans la page et rend l’interface plus pratique.
- **Style simple** : J’ai voulu quelque chose de lisible, sobre, pas trop chargé.

---

## Points techniques clés

- Les utilisateurs et commentaires sont stockés dans le localStorage pour éviter les rechargements inutiles.
- Les boutons sont différenciés par des couleurs : vert (sauvegarder), orange (masquer), rouge (supprimer).
- Les modifications et suppressions sont instantanées dans l’interface.

---

## Exemple de questions/réponses

- **Pourquoi AJAX et pas Fetch ?**  
  _Parce que l’énoncé impose jQuery/AJAX._

- **Pourquoi les commentaires sous la carte ?**  
  _Pour éviter de scroller et pour que ce soit plus clair pour l’utilisateur._

- **Est-ce que tout est enregistré sur le serveur ?**  
  _Non, tout est local, comme demandé._

- **Que fait le bouton Sauvegarder ?**  
  _Il prend les commentaires affichés et les met dans le localStorage._

---

## Conclusion

En résumé, ce projet m’a permis de :
- Pratiquer les requêtes AJAX, le DOM et le localStorage
- Gérer des interactions dynamiques côté client
- Soigner la présentation et l’ergonomie

Merci de votre attention.

---