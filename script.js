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



function opentab(event, tabname) {
    // Select all tab links and contents
    const tabLinks = document.querySelectorAll('.tab-links');
    const tabContents = document.querySelectorAll('.tab-contents');

    // Hide all tab contents and remove the active-tab class
    tabContents.forEach(content => content.classList.remove('active-tab'));

    // Remove active-link class from all tab links
    tabLinks.forEach(link => link.classList.remove('active-link'));

    // Add active-link class to the clicked tab link
    event.currentTarget.classList.add('active-link');

    // Show the selected tab content
    const activeTab = document.getElementById(tabname);
    if (activeTab) {
        activeTab.classList.add('active-tab');
    }
}



// Select the nav links
const navLinks = document.querySelectorAll('nav a'); // Assuming your nav links are <a> elements inside <nav>

// Smooth scroll to .about_me section
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent default link behavior

        // Scroll to the .about_me section
        document.querySelector(link.getAttribute('href')).scrollIntoView({
            behavior: 'smooth',
            block: 'start' // Scroll to the top of the element
        });
    });
});


// New message sent to GSheet
const scriptURL = 'https://script.google.com/macros/s/AKfycbxM1cR7HGRGZVMIfpu1u8ctbB6oMxWXj6TzoCRJMkcI_eX0lfUd_kHSeJ3kzQ5dJ2fZ/exec';
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
