function updateDateTime() {
    const now = new Date();
    const options = { 
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    };
    const dateStr = now.toLocaleDateString('fr-FR', options);
    const timeStr = now.toLocaleTimeString('fr-FR');
    document.getElementById("dateHeure").textContent = dateStr + " - " + timeStr;
}

// Mise à jour immédiate et toutes les secondes
updateDateTime();
setInterval(updateDateTime, 1000);

function toggleMenu() {
    let menu = document.getElementById("menuDropdown");
    menu.style.display = (menu.style.display === "block") ? "none" : "block";
}

// Fermer le menu si on clique en dehors
window.onclick = function(event) {
    if (!event.target.matches('.menu-button')) {
        let dropdowns = document.getElementsByClassName("menu-dropdown");
        for (let i = 0; i < dropdowns.length; i++) {
            let openDropdown = dropdowns[i];
            if (openDropdown.style.display === "block") {
                openDropdown.style.display = "none";
            }
        }
    }
};
