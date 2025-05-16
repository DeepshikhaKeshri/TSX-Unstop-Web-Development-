console.log('Portfolio site loaded');

document.addEventListener('DOMContentLoaded', function () {

  // Start smooth scrolling for skill sections
  startSmoothScroll('web-scroll', 0.9);  // Adjust speed here
  startSmoothScroll('ml-scroll', 0.9);

  // Smooth scrolling for navbar links
  const navLinks = document.querySelectorAll('.nav-link');
  for (let link of navLinks) {
      link.addEventListener('click', function (e) {
          e.preventDefault();
          const targetId = this.getAttribute('href').substring(1);
          const targetSection = document.getElementById(targetId);
          if (targetSection) {
              window.scrollTo({
                  top: targetSection.offsetTop - 70,
                  behavior: 'smooth'
              });
          }
      });
  }

  // Highlight active nav link while scrolling
  const sections = document.querySelectorAll('section');
  const options = { threshold: 0.6 };

  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          const id = entry.target.getAttribute('id');
          const navLink = document.querySelector(`.nav-link[href="#${id}"]`);
          if (entry.isIntersecting) {
              navLinks.forEach(link => link.classList.remove('active'));
              if (navLink) navLink.classList.add('active');
          }
      });
  }, options);

  sections.forEach(section => observer.observe(section));

  // Navbar background toggle on scroll
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
          navbar.classList.add('navbar-scrolled');
      } else {
          navbar.classList.remove('navbar-scrolled');
      }
  });

  // 🌟 Smooth Auto Scroll with translateX
  function startSmoothScroll(wrapperId, speed) {
    const wrapper = document.getElementById(wrapperId);
    const scrollContent = wrapper.querySelector('.scroll-content');
    if (!scrollContent) return;

    // Create a wrapper track for scrolling
    const scrollTrack = document.createElement('div');
    scrollTrack.classList.add('scroll-track');
    scrollTrack.style.display = 'inline-flex';
    scrollTrack.style.willChange = 'transform';

    // Move content inside track
    scrollTrack.appendChild(scrollContent);
    wrapper.appendChild(scrollTrack);

    // Clone content for looping
    const clone = scrollContent.cloneNode(true);
    scrollTrack.appendChild(clone);

    let x = 0;

    function step() {
      x -= speed;
      if (Math.abs(x) >= scrollContent.offsetWidth) {
        x = 0;
      }
      scrollTrack.style.transform = `translateX(${x}px)`;
      requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

   document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('description').value.trim();

    const subject = encodeURIComponent(`Contact from Portfolio: ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);

    const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=deepshikhakeshri2403@gmail.com&su=${subject}&body=${body}`;
window.open(gmailLink, '_blank');


    window.location.href = mailtoLink;

    alert('Your message is being opened in your email client.');
  });

});
