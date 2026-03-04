/* ============================= */
/* CONFIGURACIÓN GENERAL */
/* ============================= */

// Hora de inicio (México -6)
const startTime = new Date("2026-03-06T18:00:00-06:00").getTime();

// Hora de finalización
const endTime = new Date("2026-03-06T22:00:00-06:00").getTime();

// Número de WhatsApp (México sin +)
const phoneNumber = "525539539196";


/* ============================= */
/* MODALES */
/* ============================= */

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = "flex";

    let message = ""; // ✅ Declara la variable aquí

    if (modalId === "modal1") {
        message = "Hola MFAVA-CLUB! Me interesa la Promo Breakfast en $125 MXN\n" +
                  "\n- Aloe\n" +
                  "- Té de sabor: (Escribe el sabor disponible a elegir aquí). \n" +
                  "- Malteada de sabor: (Escribe el sabor disponible a elegir aquí).\n" +
                  "- Wafle con: (Escribe la fruta disponible a elegir aquí).\n" +
                  "- SandWafle con todo: (¿Quieres quitar un ingrediente? Escribe aquí).";
    }

    const url = "https://wa.me/" + phoneNumber + "?text=" + encodeURIComponent(message);

    // Botón de WhatsApp dentro del modal
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

const timerText = document.getElementById("timer");
const countdownLabel = document.getElementById("countdown-label");

const buttons = document.querySelectorAll(".promo-btn");

const timer = setInterval(function () {

    const now = new Date().getTime();

    /* ============================= */
    /* 🔹 ANTES DE INICIAR */
    /* ============================= */
    if (now < startTime) {

        const startDate = new Date(startTime);

        countdownLabel.innerHTML = "";
        timerText.innerHTML =
            "Inicia el " +
            startDate.toLocaleDateString("es-MX") +
            " - " +
            startDate.toLocaleTimeString("es-MX", {
                hour: "2-digit",
                minute: "2-digit"
            });
        return;
    }

    /* ============================= */
    /* 🔴 DESPUÉS DE TERMINAR */
    /* ============================= */
    if (now >= endTime) {

    clearInterval(timer);

    countdownLabel.innerHTML = "";
    timerText.innerHTML = "PROMOCIÓN FINALIZADA";

    // 🔴 Forzar rojo permanente
    timerText.classList.remove("warning", "danger");
    timerText.classList.add("danger");

    buttons.forEach(btn => {
        btn.disabled = true;
        btn.style.opacity = "0.5";
        btn.innerText = "Promoción Finalizada";
    });

    return;
}

    /* ============================= */
    /* 🟢 MIENTRAS ESTÁ ACTIVA */
    /* ============================= */

    countdownLabel.innerHTML = "Promoción termina en: ";

    const distance = endTime - now;

    const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((distance / (1000 * 60)) % 60);
    const seconds = Math.floor((distance / 1000) % 60);

    timerText.innerHTML =
        hours + "h " + minutes + "m " + seconds + "s";

    // 🟢 Activar botón
   buttons.forEach(btn => {
    // Escuchar clic en cada botón
    btn.addEventListener("click", () => {
        // Abrir modal 1
        openModal("modal1");
    });
});

    /* ============================= */
    /* 🎨 COLORES DINÁMICOS */
    /* ============================= */

    timerText.classList.remove("warning", "danger");

    if (distance <= 900000) {
        timerText.classList.add("danger");
    }
    else if (distance <= 3600000) {
        timerText.classList.add("warning");
    }


}, 1000);
