const toggle = document.getElementById("menu");
const navBar = document.getElementById("navbar");
const authButton = document.getElementById("authButton");

// Fonction pour vérifier si un utilisateur est connecté
function checkAuthStatus() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        authButton.textContent = "Se déconnecter";
        authButton.classList.add("logged-in");
    } else {
        authButton.textContent = "Se connecter";
        authButton.classList.remove("logged-in");
    }
}

// Gestion du clic sur le bouton de connexion/déconnexion
authButton.addEventListener("click", () => {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        // Déconnexion
        localStorage.removeItem('currentUser');
        checkAuthStatus();
    } else {
        // Redirection vers la page de connexion
        window.location.href = "auth.html";
    }
});

// Gestion du menu mobile
toggle.addEventListener("click", () => {
    console.log("click");

    if (navBar.style.right === "0px") {
        navBar.style.right = "-300px"; 
        toggle.style.zIndex = 1; 
        navBar.style.zIndex = 0;

        toggle.classList.remove("active");
    } else {
        navBar.style.right = "0px"; 
        toggle.style.zIndex = 99; 
        navBar.style.zIndex = 98;

        toggle.classList.add("active");
    }
});

// Vérifier le statut de connexion au chargement de la page
document.addEventListener('DOMContentLoaded', checkAuthStatus);