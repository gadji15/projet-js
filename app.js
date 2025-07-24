// Projet JS 2025
// Auteur : [Votre Prénom Nom]

// Initialisation principale au chargement de la page
$(document).ready(function() {
    // Affichage initial
    afficherUtilisateurs();
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
                <button class="btn btn-comments" data-id="${user.id}">Voir les commentaires</button>
            </div>
        `;
    });
    html += '</div>';
    $('#users-list').html(html);
}