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



function opentab(tabname) {
    let tabLinks = document.querySelectorAll('.tab-links');
    let tabContents = document.querySelectorAll('.tab-contents');

    // Hide all tab contents
    tabContents.forEach(content => {
        content.classList.remove('active-tab');
        content.style.display = 'none'; // Ensure all are hidden
    });

    // Remove active class from all tab links
    tabLinks.forEach(link => link.classList.remove('active-link'));

    // Add active class to the clicked tab link
    event.currentTarget.classList.add('active-link');

    // Show the selected tab content
    const activeTab = document.getElementById(tabname);
    if (activeTab) {
        activeTab.classList.add('active-tab');
        activeTab.style.display = 'block'; // Show the active tab
    }
}

// Set height on document ready and on tab switch
// function setHeight() {
//     var col1Height = document.querySelector('.about-col-1').offsetHeight;
//     var col2Height = document.querySelector('.about-col-2').offsetHeight;
  
//     // Set both columns to the maximum height of either
//     var maxHeight = Math.max(col1Height, col2Height);
//     document.querySelector('.about-col-1').style.height = maxHeight + 'px';
//     document.querySelector('.about-col-2').style.height = maxHeight + 'px';
//   }
  
//   // Call function on load
//   window.onload = setHeight;
  
//   // Call function on tab switch
//   document.querySelectorAll('.tab-links').forEach(tab => {
//     tab.addEventListener('click', setHeight);
//   });




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
