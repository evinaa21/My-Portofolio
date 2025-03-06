let moon = document.getElementById('moon');
let stars = document.querySelectorAll('.stars');  
let clouds = document.querySelectorAll('.clouds');  
let text = document.getElementById('text');
let sections = document.querySelectorAll('.sec');
let header = document.querySelector('header');

// Parallax Effect
window.addEventListener('scroll', () => {
    let value = window.scrollY;

    if (moon) moon.style.transform = `translateY(${value * 0.5}px) translateX(50%)`;

    stars.forEach(star => {
        star.style.transform = `translateY(${value * 0.3}px)`;
    });

    if (moon) {
        let moonOpacity = Math.max(1 - (value / 500), 0);
        moon.style.opacity = moonOpacity;
    }

    highlightNavLink();
    updateNavbarColor();
});

// Smooth Scrolling for Nav Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        let targetSection = document.querySelector(this.getAttribute('href'));

        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - 50,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar Background Color Change
function updateNavbarColor() {
    let scrollPosition = window.scrollY;
    const threshold = 100;

    header.style.backgroundColor = scrollPosition > threshold 
        ? 'rgba(0, 0, 0, 0.4)' 
        : 'transparent';
}

// Highlight active section in the navbar
function highlightNavLink() {
    let scrollPosition = window.scrollY + window.innerHeight / 2;

    sections.forEach(section => {
        if (section.offsetTop <= scrollPosition && section.offsetTop + section.offsetHeight > scrollPosition) {
            let id = section.getAttribute("id");
            let activeLink = document.querySelector(`header ul li a[href="#${id}"]`);
            activeLink.classList.add("active");
        } else {
            let id = section.getAttribute("id");
            let activeLink = document.querySelector(`header ul li a[href="#${id}"]`);
            activeLink.classList.remove("active");
        }
    });
}
document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll(".sec");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show"); // Simply show the section text
                observer.unobserve(entry.target); // Stop observing after it's shown
            }
        });
    }, { threshold: 0.2 });

    sections.forEach(section => observer.observe(section)); // Observe all sections
});
