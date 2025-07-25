// Projet JS 2025
// Auteur : Gadji Cheikh Gaye - 1820382 - UADB
// Né le 15/03/2004 à Saly

// Toute la logique JS de l'application est ici.
// Quelques commentaires pour guider la lecture.

// Initialisation principale au chargement de la page
$(document).ready(function() {
    // Affichage initial
    afficherUtilisateurs();

    // Gestion du clic sur "Voir les commentaires"
    $('#users-list').on('click', '.btn-comments', function() {
        let userId = $(this).data('id');
        afficherCommentaires(userId);
    });

    // Gestion du clic sur "Masquer les commentaires"
    $('#comments-section').on('click', '.btn-hide-comments', function() {
        $('#comments-section').empty();
    });
});

// Fonction qui va charger et afficher les utilisateurs
function afficherUtilisateurs() {
    $('#users-list').html('<em>Chargement des utilisateurs...</em>');

    // Vérifier si les users sont déjà en localStorage (évite requête inutile)
    let users = localStorage.getItem('users');
    if (users) {
        users = JSON.parse(users);
        afficherUsersDansPage(users);
    } else {
        // Sinon, récupération AJAX
        $.ajax({
            url: 'https://jsonplaceholder.typicode.com/users',
            method: 'GET',
            success: function(data) {
                // Sauvegarde en localStorage
                localStorage.setItem('users', JSON.stringify(data));
                afficherUsersDansPage(data);
            },
            error: function() {
                $('#users-list').html("<span style='color:red;'>Erreur lors du chargement des utilisateurs.</span>");
            }
        });
    }
}

// Affichage des utilisateurs dans la page
function afficherUsersDansPage(users) {
    if (!users || users.length === 0) {
        $('#users-list').html("<em>Aucun utilisateur trouvé.</em>");
        return;
    }
    let html = '<div>';
    users.forEach(function(user, idx) {
        html += `
            <div class="user-card" data-user-id="${user.id}">
                <div class="user-info">
                    <strong>${user.name}</strong><br>
                    <span>${user.email}</span> | 
                    <span>${user.address.city}</span>
                </div>
                <div>
                    <button class="btn btn-comments" data-id="${user.id}">Voir les commentaires</button>
                    <button class="btn btn-supprimer-user" style="background:#c0392b; margin-left:8px;">Supprimer</button>
                </div>
            </div>
        `;
    });
    html += '</div>';
    $('#users-list').html(html);
}

// Fonction pour afficher les commentaires d'un utilisateur
function afficherCommentaires(userId) {
    $('#comments-section').html('<em>Chargement des commentaires...</em>');

    // On doit d'abord récupérer les posts de l'utilisateur
    $.ajax({
        url: `https://jsonplaceholder.typicode.com/posts?userId=${userId}`,
        method: 'GET',
        success: function(posts) {
            if (!posts || posts.length === 0) {
                $('#comments-section').html('<em>Aucun commentaire trouvé pour cet utilisateur.</em>');
                return;
            }
            // Récupérer tous les commentaires associés à ces posts
            let postIds = posts.map(post => post.id);
            // Pour optimiser, on récupère tous les commentaires et on filtre
            $.ajax({
                url: `https://jsonplaceholder.typicode.com/comments`,
                method: 'GET',
                success: function(comments) {
                    // On ne prend que ceux liés à nos posts
                    let userComments = comments.filter(c => postIds.includes(c.postId));
                    afficherCommentairesDansPage(userComments, userId);
                },
                error: function() {
                    $('#comments-section').html("<span style='color:red;'>Erreur lors du chargement des commentaires.</span>");
                }
            });
        },
        error: function() {
            $('#comments-section').html("<span style='color:red;'>Erreur lors du chargement des posts.</span>");
        }
    });
}

// Affiche les commentaires dans la page
function afficherCommentairesDansPage(comments, userId) {
    let html = `<div class="comments-bloc">
                    <h3>Commentaires de l'utilisateur #${userId}</h3>
                    <button class="btn btn-hide-comments">Masquer les commentaires</button>
                    <button class="btn btn-save-comments" data-user="${userId}">Sauvegarder les commentaires</button>
                    <div class="comments-list">`;

    if (!comments || comments.length === 0) {
        html += "<em>Aucun commentaire pour cet utilisateur.</em>";
    } else {
        comments.forEach(function(c) {
            html += `
                <div class="comment-card" data-comment-id="${c.id}">
                    <div>
                        <strong>${c.name}</strong> (<span>${c.email}</span>)
                        <button class="btn btn-supprimer-commentaire" style="float:right; background:#c0392b; margin-left:6px;">Supprimer</button>
                        <button class="btn btn-modifier-commentaire" style="float:right; background:#f39c12;">Modifier</button>
                    </div>
                    <div>${c.body}</div>
                </div>
            `;
        });
    }

    html += `   </div>
                <form class="ajout-commentaire" style="margin-top:20px; border-top:1px solid #eee; padding-top:10px;">
                    <h4>Ajouter un commentaire</h4>
                    <input type="text" name="nom" placeholder="Nom" required style="margin-right: 8px;">
                    <input type="email" name="email" placeholder="Email" required style="margin-right: 8px;">
                    <input type="text" name="contenu" placeholder="Contenu" required style="width:180px; margin-right: 8px;">
                    <button class="btn" type="submit">Ajouter</button>
                </form>
            </div>`;
    $('#comments-section').html(html);
}

// Sauvegarde des commentaires affichés dans le localStorage
$(document).on('click', '.btn-save-comments', function() {
    let userId = $(this).data('user');
    let comments = [];
    // On récupère tous les commentaires actuellement affichés
    $('.comment-card').each(function() {
        comments.push({
            id: $(this).data('comment-id'),
            name: $(this).find('strong').text(),
            email: $(this).find('span').first().text(),
            body: $(this).find('div').last().text()
        });
    });
    // On stocke avec une clé propre à l'utilisateur
    localStorage.setItem('comments_user_' + userId, JSON.stringify(comments));
    alert('Commentaires sauvegardés pour l\'utilisateur #' + userId);
});

// Gestion de l'ajout d'un commentaire côté client
$(document).on('submit', '.ajout-commentaire', function(e) {
    e.preventDefault();
    let form = $(this);
    let nom = form.find('input[name="nom"]').val().trim();
    let email = form.find('input[name="email"]').val().trim();
    let contenu = form.find('input[name="contenu"]').val().trim();
    if (!nom || !email || !contenu) {
        alert('Merci de remplir tous les champs.');
        return;
    }
    // Créer un commentaire "fictif" avec un id unique basé sur la date
    let newComment = {
        id: 'local_' + Date.now(),
        name: nom,
        email: email,
        body: contenu
    };
    // Générer le HTML du commentaire et l'ajouter en haut
    let html = `
        <div class="comment-card" data-comment-id="${newComment.id}">
            <div><strong>${newComment.name}</strong> (<span>${newComment.email}</span>)</div>
            <div>${newComment.body}</div>
        </div>
    `;
    $('.comments-list').prepend(html);
    // Reset du formulaire
    form[0].reset();
});

// Suppression locale d'un commentaire
$(document).on('click', '.btn-supprimer-commentaire', function() {
    $(this).closest('.comment-card').remove();
});

// Suppression locale d'un utilisateur
$(document).on('click', '.btn-supprimer-user', function() {
    $(this).closest('.user-card').remove();
});

// Modification locale d'un commentaire
$(document).on('click', '.btn-modifier-commentaire', function() {
    let card = $(this).closest('.comment-card');
    let currentName = card.find('strong').text();
    let currentEmail = card.find('span').first().text();
    let currentBody = card.find('div').last().text();

    // Empêcher plusieurs formulaires en même temps
    if (card.find('.edit-form').length > 0) return;

    // Affiche un mini-formulaire en ligne
    let formHtml = `
        <form class="edit-form" style="margin-top:7px;">
            <input type="text" name="nom" value="${currentName}" required style="margin-right:6px;width:90px;">
            <input type="email" name="email" value="${currentEmail}" required style="margin-right:6px;width:120px;">
            <input type="text" name="contenu" value="${currentBody}" required style="margin-right:6px;width:150px;">
            <button type="submit" class="btn" style="background:#27ae60;">Valider</button>
            <button type="button" class="btn btn-annuler-edit" style="background:#7f8c8d;">Annuler</button>
        </form>
    `;
    card.append(formHtml);
    card.find('.edit-form input[name="nom"]').focus();
});

// Validation de la modification d'un commentaire
$(document).on('submit', '.edit-form', function(e) {
    e.preventDefault();
    let form = $(this);
    let card = form.closest('.comment-card');
    let nom = form.find('input[name="nom"]').val().trim();
    let email = form.find('input[name="email"]').val().trim();
    let contenu = form.find('input[name="contenu"]').val().trim();
    if (!nom || !email || !contenu) {
        alert('Merci de remplir tous les champs.');
        return;
    }
    // Met à jour l'affichage du commentaire
    card.find('strong').text(nom);
    card.find('span').first().text(email);
    card.find('div').last().text(contenu);
    form.remove();
});

// Annulation de l’édition d’un commentaire
$(document).on('click', '.btn-annuler-edit', function() {
    $(this).closest('.edit-form').remove();
});