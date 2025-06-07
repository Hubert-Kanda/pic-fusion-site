document.addEventListener("DOMContentLoaded", () => {
  // Menu mobile toggle
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      menuToggle.querySelector("i").classList.toggle("fa-bars");
      menuToggle.querySelector("i").classList.toggle("fa-times"); // Change l'icône en X
    });

    // Fermer le menu si un lien est cliqué
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        if (navLinks.classList.contains("active")) {
          navLinks.classList.remove("active");
          menuToggle.querySelector("i").classList.remove("fa-times");
          menuToggle.querySelector("i").classList.add("fa-bars");
        }
      });
    });
  }

  // FAQ Accordion
  const faqQuestions = document.querySelectorAll(".faq-question");
  faqQuestions.forEach((question) => {
    question.addEventListener("click", () => {
      const answer = question.nextElementSibling;
      question.classList.toggle("active");
      if (question.classList.contains("active")) {
        answer.style.maxHeight = answer.scrollHeight + "px";
      } else {
        answer.style.maxHeight = 0;
      }
    });
  });

  // Scroll Reveal Animation (réappliquée pour s'assurer qu'elle fonctionne avec les nouveaux paddings/marges)
  const revealElements = document.querySelectorAll(".reveal");

  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    revealElements.forEach((el) => {
      const elementTop = el.getBoundingClientRect().top;
      const elementVisible = 150; // Ajustez cette valeur pour contrôler quand l'élément apparaît

      if (elementTop < windowHeight - elementVisible) {
        el.classList.add("active");
        // Active également les reveal-item à l'intérieur
        el.querySelectorAll(".reveal-item").forEach((item, index) => {
          setTimeout(() => {
            item.classList.add("active");
          }, index * 100); // Délai séquentiel pour les items
        });
      } else {
        // Optionnel: Réinitialiser l'animation si l'utilisateur fait défiler vers le haut
        // el.classList.remove('active');
        // el.querySelectorAll('.reveal-item').forEach(item => {
        //     item.classList.remove('active');
        // });
      }
    });
  };

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll(); // Exécute une fois au chargement pour les éléments déjà visibles

  // Formulaire de contact (Gestion de la réponse de Formspree)
  const contactForm = document.getElementById("contact-form");
  const formResponse = document.getElementById("form-response");

  if (contactForm) {
    contactForm.addEventListener("submit", async (event) => {
      event.preventDefault(); // Empêche la soumission par défaut du formulaire

      const formData = new FormData(contactForm);
      try {
        const response = await fetch(contactForm.action, {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json", // Important pour Formspree
          },
        });

        if (response.ok) {
          formResponse.textContent =
            "Message envoyé avec succès ! Nous vous répondrons bientôt.";
          formResponse.classList.remove("error");
          formResponse.classList.add("success");
          contactForm.reset(); // Réinitialise le formulaire
        } else {
          const data = await response.json();
          if (data.errors) {
            formResponse.textContent = data.errors
              .map((error) => error.message)
              .join(", ");
          } else {
            formResponse.textContent =
              "Une erreur est survenue. Veuillez réessayer.";
          }
          formResponse.classList.remove("success");
          formResponse.classList.add("error");
        }
      } catch (error) {
        formResponse.textContent =
          "La connexion a échoué. Vérifiez votre connexion Internet.";
        formResponse.classList.remove("success");
        formResponse.classList.add("error");
      }
    });
  }
});
