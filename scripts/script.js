// Basic JS functionality for modals and interactive features

// Register Modal
const registerModal = document.getElementById('registerModal');
const registerBtn = document.getElementById('registerBtn');
const closeBtn = document.getElementsByClassName('close')[0];

// Show the modal when register link is clicked
if (registerBtn) {
    registerBtn.onclick = function() {
        registerModal.style.display = 'block';
    };
}

// Close the modal when the close button is clicked
if (closeBtn) {
    closeBtn.onclick = function() {
        registerModal.style.display = 'none';
    };
}

// Close the modal when clicking outside of it
window.onclick = function(event) {
    if (event.target == registerModal) {
        registerModal.style.display = 'none';
    }
};

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Example alert for form submission (You can remove or change this as needed)
const contactForm = document.querySelector('#contact form');
if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent actual form submission
        alert('Message sent successfully!');
    });
}

const loginForm = document.querySelector('#login form');
if (loginForm) {
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent actual form submission
        alert('Login successful!');
    });
}


