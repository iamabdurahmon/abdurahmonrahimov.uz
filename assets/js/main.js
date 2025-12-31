// /*=============== EMAIL JS ===============*/

// const contactForm = document.getElementById("contact-form"),
//   contactMessage = document.getElementById("contact-message");

// const sendEmail = (e) => {
//   e.preventDefault();

//   // serviceID - templateID - #form - publicKey
//   emailjs
//     .sendForm(
//       "service_ff73e58",
//       "template_yqbb9fx",
//       "#contact-form",
//       "AduQcFGPXljF8g5PJ"
//     )

//     .then(
//       () => {
//         // show sent message
//         contactMessage.textContent = "Message sent successfully ✅";

//         // Remove message after five seconds
//         setTimeout(() => {
//           contactMessage.textContent = "";
//         }, 3000);

//         // clear input fields
//         contactForm.reset();
//       },
//       () => {
//         // Show error messages
//         contactMessage.textContent = "Message not sent (service error) ❌";
//       }
//     );
// };

// contactForm.addEventListener("submit", sendEmail);

/*=============== EMAIL JS & TELEGRAM BOT ===============*/

const contactForm = document.getElementById("contact-form"),
  contactMessage = document.getElementById("contact-message");

// Telegram ma'lumotlari
const botToken = "8239365513:AAGQY9AcMRvVGO2T7tEg1qtRX3L6990sqMI";
const chatId = "5379497693";

const sendEmail = (e) => {
  e.preventDefault();

  // 1. EmailJS orqali yuborish
  emailjs
    .sendForm(
      "service_ff73e58",
      "template_yqbb9fx",
      "#contact-form",
      "AduQcFGPXljF8g5PJ"
    )
    .then(
      () => {
        const formData = new FormData(contactForm);
        const name = formData.get("user_name");
        const email = formData.get("user_email");
        const message = formData.get("user_message");

        const telegramText = `
<b>🚀 YOU HAVE A NEW MESSAGE</b>
━━━━━━━━━━━━━━━━━━━━━━━━
<b>👤 User Name:</b> <code>${name}</code>
<b>📧 Email Address:</b> <code>${email}</code>
<b>📅 Date:</b> <code>${new Date().toLocaleString()}</code>
━━━━━━━━━━━━━━━━━━━━━━━━
<b>📝 Message:</b>
<i>"${message}"</i>
━━━━━━━━━━━━━━━━━━━━━━━━
✅ <i>This message has been sent by your website form.</i>
`;

        fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: chatId,
            text: telegramText,
            parse_mode: "HTML",
          }),
        });
        // -------------------------------------------------------------------------

        contactMessage.textContent = "Message sent successfully ✅";

        setTimeout(() => {
          contactMessage.textContent = "";
        }, 3000);

        contactForm.reset();
      },
      () => {
        contactMessage.textContent = "Message not sent (service error) ❌";
      }
    );
};

contactForm.addEventListener("submit", sendEmail);

/*=============== SHOW SCROLL UP ===============*/

/*=============== SHOW SCROLL UP ===============*/
const scrollUp = () => {
  const scrollUp = document.getElementById("scroll-up");
  // When the scroll is higher than 350 viewport height, add the
  this.scrollY >= 350
    ? scrollUp.classList.add("show-scroll")
    : scrollUp.classList.remove("show-scroll");
};
window.addEventListener("scroll", scrollUp);

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/

const sections = document.querySelectorAll("section[id]");

const scrollActive = () => {
  const scrollDown = window.scrollY;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight,
      sectionTop = current.offsetTop - 58,
      sectionId = current.getAttribute("id"),
      sectionsClass = document.querySelector(
        ".nav__list a[href*=" + sectionId + "]"
      );

    if (scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight) {
      sectionsClass.classList.add("active-link");
    } else {
      sectionsClass.classList.remove("active-link");
    }
  });
};
window.addEventListener("scroll", scrollActive);

/*=============== SCROLL REVEAL ANIMATION ===============*/

const sr = ScrollReveal({
  origin: "top",
  distance: "60px",
  duration: 2500,
  delay: 400,
  // reset: true, // Animations repeat
});

sr.reveal(`.perfil, .contact__form`);
sr.reveal(`.info`, { origin: "left", delay: 800 });
sr.reveal(`.skills`, { origin: "left", delay: 1000 });
sr.reveal(`.about`, { origin: "right", delay: 1200 });
sr.reveal(`.projects__card, .services__card, .experience__card`, {
  interval: 100,
});

/*=============== CURSOR ===============*/

const dot = document.querySelector(".cursor-dot");

let mouseX = 0,
  mouseY = 0;
let dotX = 0,
  dotY = 0;
let scale = 1;
const speed = 0.3;

window.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

document.querySelectorAll("a, button").forEach((link) => {
  link.addEventListener("mouseenter", () => {
    scale = 3;
    dot.style.backgroundColor = "rgba(255, 255, 255, 0.88)";
  });
  link.addEventListener("mouseleave", () => {
    scale = 1;
    dot.style.backgroundColor = "white";
  });
});

function animate() {
  dotX += (mouseX - dotX) * speed;
  dotY += (mouseY - dotY) * speed;

  dot.style.transform = `translate(${dotX}px, ${dotY}px) scale(${scale})`;

  requestAnimationFrame(animate);
}

animate();
