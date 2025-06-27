// --- Affichage de la date et l'heure ---
function updateDateTime() {
    const now = new Date();
    const options = {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    };
    const dateStr = now.toLocaleDateString('fr-FR', options);
    const timeStr = now.toLocaleTimeString('fr-FR');
    document.getElementById("dateHeure").textContent = `${dateStr} - ${timeStr}`;
}

updateDateTime();
setInterval(updateDateTime, 1000);

// --- Menu déroulant ---
function toggleMenu() {
    const menu = document.getElementById("menuDropdown");
    menu.style.display = (menu.style.display === "block") ? "none" : "block";
}

// Fermer le menu si clic en dehors
window.onclick = function(event) {
    if (!event.target.closest('.menu-button')) {
        const dropdowns = document.getElementsByClassName("menu-dropdown");
        for (let i = 0; i < dropdowns.length; i++) {
            dropdowns[i].style.display = "none";
        }
    }
};

// --- Digicode ---
let codeSaisi = "";

function enterDigit(digit) {
    if (codeSaisi.length < 4) {
        codeSaisi += digit;
        document.getElementById("digicodeInput").value = "*".repeat(codeSaisi.length);
    }
}

function clearDigit() {
    codeSaisi = "";
    document.getElementById("digicodeInput").value = "";
}

function validateCode() {
    fetch("http://localhost:5000/verify-pin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin: codeSaisi })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            activerRelais(1);
        } else {
            alert("Code incorrect !");
        }
        clearDigit(); // Effacer le code dans tous les cas
    })
    .catch(error => {
        console.error("Erreur lors de la vérification du code :", error);
        alert("Erreur de connexion au serveur.");
        clearDigit();
    });
}

// --- Contrôle des relais ---
function activerRelais(numero) {
    fetch(`http://localhost:3000/control-relais/${numero}`, {
        method: 'POST'
    })
    .then(response => response.text())
    .then(data => {
        console.log(`Réponse relais ${numero} :`, data);
    })
    .catch(error => {
        console.error(`Erreur sur relais ${numero} :`, error);
    });
}

// --- Écouteurs de clic sur les boutons relais ---
document.addEventListener("DOMContentLoaded", () => {
    const btnRelais1 = document.getElementById("btnRelais1");
    const btnRelais2 = document.getElementById("btnRelais2");

    if (btnRelais1) btnRelais1.addEventListener("click", () => activerRelais(1));
    if (btnRelais2) btnRelais2.addEventListener("click", () => activerRelais(2));
});
