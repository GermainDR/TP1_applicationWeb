// Sélection des éléments du DOM
const switchButtons = document.querySelectorAll('.switch-btn');
const forms = document.querySelectorAll('.auth-form');
const loginForm = document.getElementById('login-form');
const signinForm = document.getElementById('signin-form');
const togglePasswordButtons = document.querySelectorAll('.toggle-password');

// Ajout de la validation en temps réel pour les emails
const loginEmail = document.getElementById('login-email');
const signinEmail = document.getElementById('signin-email');

// Au début du fichier, après la sélection des éléments
loginForm.setAttribute('novalidate', true);
signinForm.setAttribute('novalidate', true);

// Fonction pour afficher un message d'erreur
function showError(inputId, message) {
    const errorElement = document.getElementById(`${inputId}-error`);
    const inputElement = document.getElementById(inputId);
    const formGroup = inputElement.closest('.form-group');
    
    errorElement.textContent = message;
    errorElement.classList.add('active');
    inputElement.classList.add('error');
    formGroup.classList.add('has-error');
}

// Fonction pour cacher un message d'erreur
function hideError(inputId) {
    const errorElement = document.getElementById(`${inputId}-error`);
    const inputElement = document.getElementById(inputId);
    const formGroup = inputElement.closest('.form-group');
    
    errorElement.classList.remove('active');
    inputElement.classList.remove('error');
    formGroup.classList.remove('has-error');
    
    // Force le recalcul du style pour assurer la transition
    void formGroup.offsetWidth;
}

// Fonction de validation d'email
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Gestion du switch entre les formulaires
switchButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Retirer la classe active de tous les boutons
        switchButtons.forEach(btn => btn.classList.remove('active'));
        
        // Ajouter la classe active au bouton cliqué
        button.classList.add('active');
        
        // Récupérer le formulaire à afficher
        const formToShow = button.dataset.form;
        const newForm = document.getElementById(`${formToShow}-form`);
        const currentForm = document.querySelector('.auth-form.active');
        
        if (currentForm) {
            currentForm.classList.remove('active');
            // Cacher tous les messages d'erreur
            document.querySelectorAll('.error-message').forEach(error => {
                error.classList.remove('active');
            });
            document.querySelectorAll('.form-group').forEach(group => {
                group.classList.remove('has-error');
            });
            document.querySelectorAll('input').forEach(input => {
                input.classList.remove('error');
                input.value = ''; // Réinitialiser les champs
            });
        }
        
        // Afficher le nouveau formulaire
        newForm.classList.add('active');
    });
});

// Gestion du formulaire de connexion
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    // Validation de l'email
    if (!email) {
        showError('login-email', 'L\'email est requis');
        isValid = false;
    } else if (!validateEmail(email)) {
        showError('login-email', 'Veuillez entrer un email valide (exemple@domaine.com)');
        isValid = false;
    } else {
        hideError('login-email');
    }
    
    // Validation du mot de passe
    if (!password) {
        showError('login-password', 'Le mot de passe est requis');
        isValid = false;
    } else if (password.length < 8) {
        showError('login-password', 'Le mot de passe doit contenir au moins 8 caractères');
        isValid = false;
    } else {
        hideError('login-password');
    }
    
    if (isValid) {
        // Récupérer les utilisateurs du localStorage
        const users = JSON.parse(localStorage.getItem('users')) || [];
        
        // Vérifier les identifiants
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            window.location.href = 'index.html';
        } else {
            showError('login-password', 'Email ou mot de passe incorrect');
        }
    }
});

// Gestion du formulaire d'inscription
signinForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;
    
    const name = document.getElementById('signin-name').value;
    const email = document.getElementById('signin-email').value;
    const password = document.getElementById('signin-password').value;
    
    // Validation du nom
    if (!name) {
        showError('signin-name', 'Le nom est requis');
        isValid = false;
    } else if (name.length < 2) {
        showError('signin-name', 'Le nom doit contenir au moins 2 caractères');
        isValid = false;
    } else {
        hideError('signin-name');
    }
    
    // Validation de l'email
    if (!email) {
        showError('signin-email', 'L\'email est requis');
        isValid = false;
    } else if (!validateEmail(email)) {
        showError('signin-email', 'Veuillez entrer un email valide (exemple@domaine.com)');
        isValid = false;
    } else {
        hideError('signin-email');
    }
    
    // Validation du mot de passe
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;
    if (!password) {
        showError('signin-password', 'Le mot de passe est requis');
        isValid = false;
    } else if (!passwordRegex.test(password)) {
        showError('signin-password', 'Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial');
        isValid = false;
    } else {
        hideError('signin-password');
    }
    
    if (isValid) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        
        if (users.find(u => u.email === email)) {
            showError('signin-email', 'Cet email est déjà utilisé');
            return;
        }
        
        const newUser = { name, email, password };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        
        signinForm.reset();
        switchButtons[0].click();
        alert('Inscription réussie ! Vous pouvez maintenant vous connecter');
    }
});

// Gestion de l'affichage/masquage des mots de passe
togglePasswordButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetId = button.getAttribute('data-target');
        const passwordInput = document.getElementById(targetId);
        const icon = button.querySelector('i');

        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
            button.classList.add('showing');
        } else {
            passwordInput.type = 'password';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
            button.classList.remove('showing');
        }
    });
});

// Validation en temps réel pour l'email de connexion
loginEmail.addEventListener('input', () => {
    if (loginEmail.value === '') {
        showError('login-email', 'L\'email est requis');
    } else if (!validateEmail(loginEmail.value)) {
        showError('login-email', 'Veuillez entrer un email valide (exemple@domaine.com)');
    } else {
        hideError('login-email');
    }
});

// Validation en temps réel pour l'email d'inscription
signinEmail.addEventListener('input', () => {
    if (signinEmail.value === '') {
        showError('signin-email', 'L\'email est requis');
    } else if (!validateEmail(signinEmail.value)) {
        showError('signin-email', 'Veuillez entrer un email valide (exemple@domaine.com)');
    } else {
        hideError('signin-email');
    }
}); 