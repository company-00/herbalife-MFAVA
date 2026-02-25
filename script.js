/* ============================= */
/* CONFIGURACIÓN GENERAL */
/* ============================= */

// Fecha fija: 5:30 PM México
const endTime = new Date("2026-02-24T21:00:00-06:00").getTime();

// Número de WhatsApp (México sin +)
const phoneNumber = "525518975204";


/* ============================= */
/* MODALES */
/* ============================= */

function openModal(modalId) {

    const modal = document.getElementById(modalId);
    modal.style.display = "flex";

    let message = "";

    if (modalId === "modal1") {
        message = "Hola, me interesa la Promo Energía Total en $999 MXN 💚";
    } 
    else if (modalId === "modal2") {
        message = "Hola, me interesa la Promo Control de Peso en $1,299 MXN 💚";
    }

    const url = "https://wa.me/" + phoneNumber + "?text=" + encodeURIComponent(message);

    // Buscar el botón de WhatsApp dentro del modal actual
    modal.querySelector(".whatsapp-link").href = url;
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}

// Cerrar modal al hacer click fuera del contenido
window.addEventListener("click", function (e) {
    document.querySelectorAll(".modal").forEach(modal => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });
});


/* ============================= */
/* CONTADOR */
/* ============================= */

const timer = setInterval(function () {

    const now = new Date().getTime();
    const distance = endTime - now;

    if (distance <= 0) {
        clearInterval(timer);
        document.getElementById("timer").innerHTML = "PROMOCIÓN FINALIZADA";

        // Desactivar botones
        document.querySelectorAll(".promo-btn").forEach(btn => {
            btn.disabled = true;
            btn.style.opacity = "0.5";
            btn.innerText = "Promoción Finalizada";
        });

        return;
    }

    const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((distance / (1000 * 60)) % 60);
    const seconds = Math.floor((distance / 1000) % 60);

    document.getElementById("timer").innerHTML =
        hours + "h " + minutes + "m " + seconds + "s";

}, 1000);

