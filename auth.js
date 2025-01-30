// Sélection des éléments du DOM
const switchButtons = document.querySelectorAll('.switch-btn');
const forms = document.querySelectorAll('.auth-form');
const loginForm = document.getElementById('login-form');
const signinForm = document.getElementById('signin-form');

// Gestion du switch entre les formulaires
switchButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Retirer la classe active de tous les boutons et formulaires
        switchButtons.forEach(btn => btn.classList.remove('active'));
        forms.forEach(form => form.classList.remove('active'));
        
        // Ajouter la classe active au bouton cliqué
        button.classList.add('active');
        
        // Afficher le formulaire correspondant
        const formToShow = button.dataset.form;
        document.getElementById(`${formToShow}-form`).classList.add('active');
    });
});

// Gestion du formulaire de connexion
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    // Récupérer les utilisateurs du localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Vérifier les identifiants
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        // Stocker l'utilisateur connecté
        localStorage.setItem('currentUser', JSON.stringify(user));
        alert('Connexion réussie !');
        window.location.href = 'index.html'; // Redirection vers la page d'accueil
    } else {
        alert('Email ou mot de passe incorrect');
    }
});

// Gestion du formulaire d'inscription
signinForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('signin-name').value;
    const email = document.getElementById('signin-email').value;
    const password = document.getElementById('signin-password').value;
    
    // Récupérer les utilisateurs existants
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Vérifier si l'email existe déjà
    if (users.find(u => u.email === email)) {
        alert('Cet email est déjà utilisé');
        return;
    }
    
    // Créer le nouvel utilisateur
    const newUser = {
        name,
        email,
        password
    };
    
    // Ajouter l'utilisateur à la liste
    users.push(newUser);
    
    // Sauvegarder dans le localStorage
    localStorage.setItem('users', JSON.stringify(users));
    
    alert('Inscription réussie ! Vous pouvez maintenant vous connecter');
    
    // Réinitialiser le formulaire
    signinForm.reset();
    
    // Basculer vers le formulaire de connexion
    switchButtons[0].click();
}); 