// Projet JS 2025
// Auteur : Gadji Cheikh Gaye - 1820382 - UADB
// Né le 15/03/2004 à Saly

// Toute la logique JS de l'application est ici.
// Design moderne, loader, toast, dark mode, feedback utilisateur.

// --- Initialisation Supabase ---
const supabaseUrl = 'https://sjsdpshlwrzatknuzwli.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNqc2Rwc2hsd3J6YXRrbnV6d2xpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM4Nzg1ODMsImV4cCI6MjA2OTQ1NDU4M30.cFclX5dq6-ifcrOcQfGPlvtdOirvZR7GNm0Pa5YDiXs';
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

$(document).ready(function() {
    // Dark mode init
    if (
        localStorage.getItem("darkMode") === "true" ||
        (localStorage.getItem("darkMode") === null && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
        $("body").addClass("dark");
    }
    majBoutonDark();

    // Toggle dark mode
    $("#toggle-dark").on("click", function () {
        $("body").toggleClass("dark");
        localStorage.setItem("darkMode", $("body").hasClass("dark"));
        majBoutonDark();
    });
    function majBoutonDark() {
        if ($("body").hasClass("dark")) {
            $("#toggle-dark").html("☀️ Mode clair");
        } else {
            $("#toggle-dark").html("🌙 Mode sombre");
        }
    }

    afficherUtilisateurs();

    // Gestion des clics sur les boutons
    $('#users-list').on('click', '.btn-comments', function() {
        var userId = $(this).data('id');
        afficherCommentaires(userId);
    });

    // Gestion du clic "Masquer" sous la carte utilisateur
    $(document).on('click', '.btn-hide-comments', function() {
        $(this).closest('.comments-bloc').remove();
    });
});

// Fonction utilitaire : mettre une majuscule
function premiereLettreMaj(chaine) {
    if (!chaine) return '';
    return chaine.charAt(0).toUpperCase() + chaine.slice(1);
}

// Loader global (animation centrale)
function showLoader() {
    $("#global-loader").fadeIn(100);
}
function hideLoader() {
    $("#global-loader").fadeOut(200);
}

// Toast notification
function showToast(message, type) {
    var $toast = $("#toast");
    $toast.stop(true, true);
    if (type === "success") $toast.css("background", "linear-gradient(90deg, #27ae60 70%, #3498db 100%)");
    else if (type === "error") $toast.css("background", "linear-gradient(90deg, #e74c3c 70%, #c0392b 100%)");
    else $toast.css("background", "linear-gradient(90deg, #3498db 70%, #232c3d 100%)");
    $toast.text(message).fadeIn(180).delay(1700).fadeOut(700);
}

// Charger et afficher les utilisateurs
async function afficherUtilisateurs() {
    showLoader();
    $('#users-list').html('');
    // --- Nouvelle version : chargement via Supabase ---
    const { data, error } = await supabase.from('users').select('*');
    hideLoader();
    if (error) {
        $('#users-list').html("<span class='error'>Erreur de connexion à Supabase.</span>");
        showToast("Erreur Supabase: " + error.message, "error");
        return;
    }
    afficherUsers(data);
}

// Afficher les utilisateurs dans la page
let allUsers = []; // Pour le filtrage global

function afficherUsers(users) {
    allUsers = users; // Mémorise la liste pour la recherche instantanée

    let searchValue = ($('#user-search').val() || '').toLowerCase();
    let filtered = users.filter(function(user) {
        return (
            user.name.toLowerCase().includes(searchValue) ||
            user.email.toLowerCase().includes(searchValue) ||
            user.address.city.toLowerCase().includes(searchValue)
        );
    });

    if (!filtered || filtered.length === 0) {
        $('#users-list').html("<em>Aucun utilisateur trouvé</em>");
        return;
    }
    var html = '';
    for (var i = 0; i < filtered.length; i++) {
        var user = filtered[i];
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

// Recherche instantanée utilisateurs
$(document).on('input', '#user-search', function() {
    afficherUsers(allUsers);
});

// Afficher les commentaires (table comments Supabase, filtré par user_id)
async function afficherCommentaires(userId) {
    $('.comments-bloc').remove();
    var userCard = $('.user-card[data-user-id="' + userId + '"]');
    if (userCard.length === 0) return;
    userCard.after('<div class="comments-bloc" style="min-height:70px;display:flex;align-items:center;"><div class="loader"></div></div>');

    // On suppose que chaque commentaire a un champ user_id qui correspond à l'utilisateur
    const { data, error } = await supabase
        .from('comments')
        .select('*')
        .eq('user_id', userId);
    if (error) {
        userCard.next('.comments-bloc').html("<span class='error'>Erreur Supabase: impossible de charger les commentaires.</span>");
        showToast("Erreur Supabase: " + error.message, "error");
        return;
    }
    afficherCommentairesPageSousCarte(data, userId, userCard);
}

// Afficher les commentaires dans le bloc sous la carte
function afficherCommentairesPageSousCarte(comments, userId, userCard) {
    var html = '';
    html += '<h3>Commentaires #' + userId + '</h3>';
    html += '<button class="btn btn-hide-comments btn-hide">Masquer</button>';
    html += '<button class="btn btn-save-comments btn-save" data-user="' + userId + '">Sauvegarder</button>';
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
    html += '</div>';
    // Formulaire d'ajout
    html += '<form class="add-comment-form">';
    html += '  <h4>Ajouter un commentaire</h4>';
    html += '  <input type="text" name="name" placeholder="Nom" required>';
    html += '  <input type="email" name="email" placeholder="Email" required>';
    html += '  <textarea name="content" placeholder="Contenu" required></textarea>';
    html += '  <button type="submit" class="btn">Ajouter</button>';
    html += '</form>';
    userCard.next('.comments-bloc').html(html);
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
    showToast("Commentaires sauvegardés avec succès !", "success");
});

// Ajout d'un nouveau commentaire
$(document).on('submit', '.add-comment-form', function(e) {
    e.preventDefault();
    var name = $(this).find('[name="name"]').val();
    var email = $(this).find('[name="email"]').val();
    var content = $(this).find('[name="content"]').val();
    if (!name || !email || !content) {
        showToast('Veuillez remplir tous les champs svp', "error");
        return;
    }
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
    showToast("Commentaire ajouté !", "success");
});

// Suppression d'un commentaire
$(document).on('click', '.btn-delete-comment', function() {
    $(this).closest('.comment-card').remove();
    showToast("Commentaire supprimé.", "info");
});

// Suppression d'un utilisateur
$(document).on('click', '.btn-delete-user', function() {
    if (confirm('Supprimer cet utilisateur?')) {
        $(this).closest('.user-card').remove();
        showToast("Utilisateur supprimé.", "info");
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
    showToast("Commentaire modifié.", "success");
});

// Annulation de l'édition
$(document).on('click', '.cancel-edit', function() {
    $(this).closest('.edit-form').remove();
});