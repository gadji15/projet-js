// Projet JS 2025
// Auteur : Gadji Cheikh Gaye - 1820382 - UADB
// Né le 15/03/2004 à Saly

// Toute la logique JS de l'application est ici.
// J'ai essayé de faire au mieux avec ce que j'ai appris en cours.

// Initialisation au chargement de la page
$(document).ready(function() {
    // Pour voir si tout fonctionne
    console.log("La page est prête!");
    
    afficherUtilisateurs();

    // Gestion des clics sur les boutons
    $('#users-list').on('click', '.btn-comments', function() {
        var userId = $(this).data('id');
        afficherCommentaires(userId);
    });

    $('#comments-section').on('click', '.btn-hide-comments', function() {
        $('#comments-section').empty();
    });
});

// Fonction pour mettre une majuscule (apprise en cours)
function premiereLettreMaj(chaine) {
    if (!chaine) return '';
    return chaine.charAt(0).toUpperCase() + chaine.slice(1);
}

// Charger et afficher les utilisateurs
function afficherUtilisateurs() {
    $('#users-list').html('<em>Chargement en cours...</em>');

    // Vérifier le localStorage pour éviter de recharger
    var usersFromStorage = localStorage.getItem('users');
    if (usersFromStorage) {
        var users = JSON.parse(usersFromStorage);
        afficherUsers(users);
    } else {
        // Requête AJAX pour les utilisateurs
        $.ajax({
            url: 'https://jsonplaceholder.typicode.com/users',
            method: 'GET',
            success: function(data) {
                // Sauvegarde dans le stockage local
                localStorage.setItem('users', JSON.stringify(data));
                afficherUsers(data);
            },
            error: function() {
                $('#users-list').html("<span class='error'>Erreur de chargement</span>");
            }
        });
    }
}

// Afficher les utilisateurs dans la page
function afficherUsers(users) {
    if (!users || users.length === 0) {
        $('#users-list').html("<em>Aucun utilisateur trouvé</em>");
        return;
    }
    
    var html = '';
    for (var i = 0; i < users.length; i++) {
        var user = users[i];
        // J'utilise la fonction pour la majuscule
        var nomMaj = premiereLettreMaj(user.name.split(' ')[0]);
        
        html += '<div class="user-card" data-user-id="' + user.id + '">';
        html += '  <div class="user-info">';
        html += '    <strong>' + nomMaj + '</strong><br>';
        html += '    <span>' + user.email + '</span> | ';
        html += '    <span>' + user.address.city + '</span>';
        html += '  </div>';
        html += '  <div class="user-actions">';
        html += '    <button class="btn btn-comments" data-id="' + user.id + '">Voir commentaires</button>';
        html += '    <button class="btn btn-delete-user">Supprimer</button>';
        html += '  </div>';
        html += '</div>';
    }
    
    $('#users-list').html(html);
}

// Afficher les commentaires d'un utilisateur
function afficherCommentaires(userId) {
    $('#comments-section').html('<em>Chargement des commentaires...</em>');

    // D'abord récupérer les posts de l'utilisateur
    $.ajax({
        url: 'https://jsonplaceholder.typicode.com/posts?userId=' + userId,
        method: 'GET',
        success: function(posts) {
            if (!posts || posts.length === 0) {
                $('#comments-section').html('<em>Aucun post trouvé</em>');
                return;
            }
            
            // Récupérer les IDs des posts
            var postIds = [];
            for (var j = 0; j < posts.length; j++) {
                postIds.push(posts[j].id);
            }
            
            // Récupérer tous les commentaires (méthode simple)
            $.ajax({
                url: 'https://jsonplaceholder.typicode.com/comments',
                method: 'GET',
                success: function(comments) {
                    // Filtrer les commentaires
                    var userComments = [];
                    for (var k = 0; k < comments.length; k++) {
                        if (postIds.includes(comments[k].postId)) {
                            userComments.push(comments[k]);
                        }
                    }
                    afficherCommentairesPage(userComments, userId);
                },
                error: function() {
                    $('#comments-section').html("<span class='error'>Erreur commentaires</span>");
                }
            });
        },
        error: function() {
            $('#comments-section').html("<span class='error'>Erreur posts</span>");
        }
    });
}

// Afficher les commentaires dans la page
function afficherCommentairesPage(comments, userId) {
    var html = '<div class="comments-bloc">';
    html += '<h3>Commentaires #' + userId + '</h3>';
    html += '<button class="btn btn-hide-comments">Masquer</button>';
    html += '<button class="btn btn-save-comments" data-user="' + userId + '">Sauvegarder</button>';
    html += '<div class="comments-list">';

    if (!comments || comments.length === 0) {
        html += '<em>Aucun commentaire</em>';
    } else {
        for (var i = 0; i < comments.length; i++) {
            var c = comments[i];
            html += '<div class="comment-card" data-comment-id="' + c.id + '">';
            html += '  <div>';
            html += '    <strong>' + c.name + '</strong>';
            html += '    (<span>' + c.email + '</span>)';
            html += '    <button class="btn btn-delete-comment">Supprimer</button>';
            html += '    <button class="btn btn-edit-comment">Modifier</button>';
            html += '  </div>';
            html += '  <div>' + c.body + '</div>';
            html += '</div>';
        }
    }

    html += '</div>'; // .comments-list
    
    // Formulaire d'ajout
    html += '<form class="add-comment-form">';
    html += '  <h4>Ajouter un commentaire</h4>';
    html += '  <input type="text" name="name" placeholder="Nom" required>';
    html += '  <input type="email" name="email" placeholder="Email" required>';
    html += '  <textarea name="content" placeholder="Contenu" required></textarea>';
    html += '  <button type="submit" class="btn">Ajouter</button>';
    html += '</form>';
    
    html += '</div>'; // .comments-bloc
    
    $('#comments-section').html(html);
}

// Sauvegarde des commentaires
$(document).on('click', '.btn-save-comments', function() {
    var userId = $(this).data('user');
    var comments = [];
    
    $('.comment-card').each(function() {
        var commentId = $(this).data('comment-id');
        var name = $(this).find('strong').text();
        var email = $(this).find('span').text();
        var content = $(this).find('div').last().text();
        
        comments.push({
            id: commentId,
            name: name,
            email: email,
            body: content
        });
    });
    
    localStorage.setItem('comments_user_' + userId, JSON.stringify(comments));
    alert('Sauvegardé!');
});

// Ajout d'un nouveau commentaire
$(document).on('submit', '.add-comment-form', function(e) {
    e.preventDefault();
    
    var name = $(this).find('[name="name"]').val();
    var email = $(this).find('[name="email"]').val();
    var content = $(this).find('[name="content"]').val();
    
    if (!name || !email || !content) {
        alert('Remplissez tous les champs');
        return;
    }
    
    // Création d'un ID simple
    var newId = 'local_' + new Date().getTime();
    
    var newCommentHtml = '<div class="comment-card" data-comment-id="' + newId + '">';
    newCommentHtml += '<div><strong>' + name + '</strong>';
    newCommentHtml += '(<span>' + email + '</span>)';
    newCommentHtml += '<button class="btn btn-delete-comment">Supprimer</button>';
    newCommentHtml += '<button class="btn btn-edit-comment">Modifier</button></div>';
    newCommentHtml += '<div>' + content + '</div>';
    newCommentHtml += '</div>';
    
    $('.comments-list').prepend(newCommentHtml);
    $(this)[0].reset();
});

// Suppression d'un commentaire
$(document).on('click', '.btn-delete-comment', function() {
    $(this).closest('.comment-card').remove();
});

// Suppression d'un utilisateur
$(document).on('click', '.btn-delete-user', function() {
    if (confirm('Supprimer cet utilisateur?')) {
        $(this).closest('.user-card').remove();
    }
});

// Édition d'un commentaire
$(document).on('click', '.btn-edit-comment', function() {
    var card = $(this).closest('.comment-card');
    var name = card.find('strong').text();
    var email = card.find('span').text();
    var content = card.find('div').last().text();
    
    var formHtml = '<form class="edit-form">';
    formHtml += '<input type="text" name="edit-name" value="' + name + '">';
    formHtml += '<input type="email" name="edit-email" value="' + email + '">';
    formHtml += '<textarea name="edit-content">' + content + '</textarea>';
    formHtml += '<button type="submit" class="btn">Valider</button>';
    formHtml += '<button type="button" class="btn cancel-edit">Annuler</button>';
    formHtml += '</form>';
    
    card.append(formHtml);
});

// Validation de l'édition
$(document).on('submit', '.edit-form', function(e) {
    e.preventDefault();
    
    var card = $(this).closest('.comment-card');
    var name = $(this).find('[name="edit-name"]').val();
    var email = $(this).find('[name="edit-email"]').val();
    var content = $(this).find('[name="edit-content"]').val();
    
    card.find('strong').text(name);
    card.find('span').text(email);
    card.find('div').last().text(content);
    
    $(this).remove();
});

// Annulation de l'édition
$(document).on('click', '.cancel-edit', function() {
    $(this).closest('.edit-form').remove();
});