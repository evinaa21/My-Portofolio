let moon = document.getElementById('moon');
let stars = document.querySelectorAll('.stars');  // Use class selectors
let clouds = document.querySelectorAll('.clouds');  // Use class selectors
let text = document.getElementById('text');

// Select all sections you want to apply the scroll effect to
let sections = document.querySelectorAll('.sec');  // Assuming the sections have the class 'sec'

window.addEventListener('scroll', () => {
    let value = window.scrollY;

    // Parallax effect for moon (move at a different speed)
    if (moon) moon.style.transform = `translateY(${value * 0.5}px) translateX(50%)`;  // Move moon to the right side with half visible

    // Parallax effect for stars
    stars.forEach(star => {
        star.style.transform = `translateY(${value * 0.3}px)`; // Apply effect to each star element
    });

    // Fade out the moon as you scroll
    if (moon) {
        let moonOpacity = Math.max(1 - (value / 500), 0);  // Adjust moon fade-out speed
        moon.style.opacity = moonOpacity;
    }
});

window.addEventListener('scroll', function () {
    let sections = document.querySelectorAll('.fade-in');
    
    sections.forEach(function (section) {
        let rect = section.getBoundingClientRect();
        
        // Check if the section is in the viewport
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
            section.classList.add('show');  // Add the class to trigger fade-in
        } else {
            section.classList.remove('show');  // Remove the class if out of view
        }
    });
});


function highlightNavLink() {
    let scrollY = window.scrollY + window.innerHeight / 2; // Center detection

    sections.forEach(section => {
        let sectionTop = section.offsetTop;
        let sectionHeight = section.offsetHeight;

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove("active"));
            let targetLink = document.querySelector(`header ul li a[href="#${section.id}"]`);
            if (targetLink) targetLink.classList.add("active");
        }
    });
}

document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll(".fade-in");

    const options = {
        threshold: 0.2, // Trigger when 20% of the section is visible
    };

    const observer = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                observer.unobserve(entry.target); // Stop observing after animation
            }
        });
    }, options);

    sections.forEach(section => {
        observer.observe(section); // Start observing each section
    });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        let targetSection = document.querySelector(this.getAttribute('href'));

        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - 50, // Adjust for header height
                behavior: 'smooth'
            });
        }
    });
});
// Get the header element
const header = document.querySelector('header');

// Function to update the navbar's background based on scroll position
function updateNavbarColor() {
    // Get the scroll position
    let scrollPosition = window.scrollY;

    // Set a threshold for when the navbar color changes
    const threshold = 100; // Adjust this value as per your design

    // If scrolled beyond the threshold, update the navbar's background color
    if (scrollPosition > threshold) {
        header.style.backgroundColor = 'rgba(0, 0, 0, 0.4)'; // Dark blue or any color
    } else {
        header.style.backgroundColor = 'transparent'; // Reset to transparent
    }
}

// Listen for the scroll event
window.addEventListener('scroll', updateNavbarColor);
// Get the h2 element
const aboutHeading = document.querySelector("#about h2");

// Add a scroll event listener
window.addEventListener("scroll", function() {
    const sectionTop = document.querySelector("#about").offsetTop;
    const sectionHeight = document.querySelector("#about").offsetHeight;
    const scrollPosition = window.scrollY + window.innerHeight;

    // Check if the section is in the viewport (show when 50% of the section is visible)
    if (scrollPosition > sectionTop + sectionHeight / 2) {
        aboutHeading.style.opacity = 1;
        aboutHeading.style.transform = "translateX(-50%) translateY(0)"; // Fade in and reset translate
    } else {
        aboutHeading.style.opacity = 0;
        aboutHeading.style.transform = "translateX(-50%) translateY(50px)"; // Move it down again
    }
});



