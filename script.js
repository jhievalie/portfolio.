// Mobile navigation functionality
function mobileNav() {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    // Toggle nav on burger click
    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active'); // Toggle visibility of nav links
        burger.classList.toggle('toggle'); // Toggle the burger icon (rotate)

        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
    });

    // Hide burger when a nav link is clicked
    navLinks.forEach(item => {
        item.addEventListener('click', () => {
            nav.classList.remove('nav-active'); // Hide the nav
            burger.classList.remove('toggle'); // Reset the burger icon
        });
    });
}

// Smooth scrolling functionality
function smoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}

// Initialize the page content and functions
document.addEventListener('DOMContentLoaded', () => {
    mobileNav(); // Initialize mobile navigation function
    smoothScroll(); // Enable smooth scrolling for anchor links
});


// New message sent to GSheet
const scriptURL = 'https://script.google.com/macros/s/AKfycbyyupltVOE2-LXyg_mQdPHm3uSeqwn4aTl9E3JRbJuFQwc9WjOiQyWTjgKcT0JjBq_5/exec';
const form = document.forms['submit-to-google-sheet'];
const msg = document.getElementById("msg");

form.addEventListener('submit', e => {
    e.preventDefault();
    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json(); // Handle JSON response if needed
        })
        .then(data => {
            msg.innerHTML = "Message sent successfully";
            setTimeout(() => {
                msg.innerHTML = "";
            }, 1000);
            form.reset();
        })
        .catch(error => {
            msg.innerHTML = "Error sending message. Please try again.";
            console.error('Error!', error.message);
        });
});
