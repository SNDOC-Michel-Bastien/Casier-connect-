document.addEventListener("DOMContentLoaded", function() {
    function ouvrirCasierAleatoire() {
        // Réinitialise tous les casiers
        document.querySelectorAll('.casier').forEach(casier => {
            casier.classList.remove('casier-ouvert');
        });

        // Sélectionne un casier au hasard
        let numeroAleatoire = Math.floor(Math.random() * 12) + 1;
        let casierOuvert = document.getElementById(`casier${numeroAleatoire}`);

        // Change l'apparence du casier ouvert
        casierOuvert.classList.add('casier-ouvert');

        // Affiche le numéro du casier ouvert
        document.getElementById("numCasier").innerText = numeroAleatoire;
    }

    // Change de casier toutes les 5 secondes
    setInterval(ouvrirCasierAleatoire, 5000);
});
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