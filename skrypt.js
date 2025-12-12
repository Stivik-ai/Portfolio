document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
        const targetId = link.getAttribute("href").slice(1);
        const target = document.getElementById(targetId);
        if (!target) return;
        e.preventDefault();
        window.scrollTo({
            top: target.offsetTop - 80,
            behavior: "smooth",
        });
    });
});

const revealElems = document.querySelectorAll(".reveal-on-scroll");

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.25 }
);

revealElems.forEach((el) => observer.observe(el));

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

const setActiveLink = () => {
    let currentId = null;

    sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 120 && rect.bottom >= 120) {
            currentId = section.id;
        }
    });

    navLinks.forEach((link) => {
        const hrefId = link.getAttribute("href").slice(1);
        if (hrefId === currentId) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });
};

window.addEventListener("scroll", setActiveLink);
window.addEventListener("load", setActiveLink);
const scrollBar = document.getElementById('scroll-progress');

  window.addEventListener('scroll', () => {
    const doc = document.documentElement;
    const scrollTop = doc.scrollTop || document.body.scrollTop;
    const height = doc.scrollHeight - doc.clientHeight;
    const scrolled = height > 0 ? (scrollTop / height) * 100 : 0;
    scrollBar.style.width = scrolled + '%';
  });

const contactForm = document.getElementById("contact-form");

if (contactForm) {
  const submitBtn = contactForm.querySelector('button[type="submit"]');

  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const originalText = submitBtn.textContent;

    submitBtn.textContent = "Wysyłam...";
    submitBtn.disabled = true;

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        alert("Sukces! Twoja wiadomość została wysłana.");
        contactForm.reset();
      } else {
        alert("Błąd: " + (data.message || "coś poszło nie tak."));
      }
    } catch (error) {
      alert("Coś poszło nie tak. Spróbuj ponownie.");
    } finally {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".skills-track");
  if (!track) return;

  const cards = Array.from(track.children);
  if (!cards.length) return;

  if (cards.some(c => c.classList.contains("card-clone"))) return;

  cards.forEach(card => {
    const clone = card.cloneNode(true);
    clone.classList.add("card-clone");
    track.appendChild(clone);
  });
});
