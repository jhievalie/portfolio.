// Mobile navigation functionality
function mobileNav() {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    // Toggle nav on burger click
    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
        burger.classList.toggle('toggle');

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
            nav.classList.remove('nav-active');
            burger.classList.remove('toggle');
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
    mobileNav();
    smoothScroll();
});



// Select the nav links
// const navLinks = document.querySelectorAll('nav a'); 

// Smooth scroll to .about_me section
// navLinks.forEach(link => {
//     link.addEventListener('click', (e) => {
//         e.preventDefault();

        // Scroll to the .about_me section
//         document.querySelector(link.getAttribute('href')).scrollIntoView({
//             behavior: 'smooth',
//             block: 'start'
//         });
//     });
// });


// Select the nav links, sections, and footer
const navLinks = document.querySelectorAll('.nav-links li a'); 
const sections = document.querySelectorAll('section');
const footer = document.querySelector('footer');

// Smooth scroll to sections
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();

        // Scroll to the corresponding section
        document.querySelector(link.getAttribute('href')).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// Function to check which section is in the viewport
function setActiveLink() {
    let currentSection = '';
    let footerTop = footer ? footer.offsetTop : null;
    let footerHeight = footer ? footer.offsetHeight : 0;

    // Loop through each section
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100; // Adjust offset to your liking
        const sectionHeight = section.offsetHeight;
        const sectionBottom = sectionTop + sectionHeight;

        // Check if the section is fully in the viewport or more than halfway visible
        if (window.scrollY >= sectionTop && window.scrollY <= sectionBottom) {
            currentSection = section.getAttribute('id');
        } else if (window.scrollY + window.innerHeight / 3.5 > sectionTop && window.scrollY + window.innerHeight / 2 < sectionBottom) {
            currentSection = section.getAttribute('id');
        }
    });

    // Check if footer is in the viewport (for Contact link)
    if (footerTop && window.scrollY + window.innerHeight >= footerTop) {
        currentSection = 'contact'; // Set active section to 'contact' when footer is visible
    }

    // Loop through the nav links and update the active class
    navLinks.forEach(link => {
        if (link.getAttribute('href').includes(currentSection)) {
            link.classList.add('active'); // Active class for the link
            link.style.color = 'var(--primary-color)'; // Set active color
        } else {
            link.classList.remove('active'); // Remove active class
            link.style.color = 'var(--text-color)'; // Set inactive color (use your text color)
        }
    });
}

// Listen to the scroll event to update the active link
window.addEventListener('scroll', setActiveLink);

// Initial call to set the active link based on the initial scroll position
setActiveLink();


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
            return response.json();
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
