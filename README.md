# Casier connecté – Projet de fin d’année

Ce dépôt regroupe l’ensemble des fichiers et scripts nécessaires à la conception et à la mise en œuvre d’un **système de casiers connectés**, sécurisé par **badge NFC** et/ou **code PIN**, avec interface web hébergée sur un **Raspberry Pi**.

## 🔧 Objectifs du projet

- Permettre à un utilisateur de s’authentifier via badge NFC ou code PIN.
- Déverrouiller un casier de manière sécurisée via une interface web.
- Surveiller l’état des casiers en temps réel (ouvert, fermé, en charge...).
- Proposer une prise électrique commandable à distance.
- Avertir en cas de surchauffe (capteur de température).
- Centraliser la gestion via un Raspberry Pi et une base de données locale (SQLite).

---

## 🧱 Architecture matérielle

### **1. Saisie du schéma structurel**

*Exemple : carte Casier Connecté V1.0*
<p align="center">
  <img src="images/xxxxx.png" align=center width="400" height="300">
</p>


### **2. Routage du circuit imprimé**

*Exemple : carte Casier Connecté V1.0*

<p align="center">
 <img src="images/xxxxx.png" align=center width="400" height="200">
</p>

> [!TIP]
> Les étapes ci-dessous sont à réaliser dans l'ordre

> [!WARNING]
> Les 2 boitiers des transistors Q1 (TO18) et Q2 (TO92) choisies sur le routage sont différents de ceux utilisé pour nous facilité le routage, car manque de place

- Créer, si nécessaire, les boîtiers des composants qui ne seraient pas disponibles ou nouveaux.
-	***Configurer les règles de routage*** pour tous les types de liens (POWER, SIGNAL…).
-	Dimensionner le circuit imprimé (*Board Edge*).
-	Créer (si nécessaire) les composants manquants à partir de leurs documentations techniques.
-	Router le circuit imprimé en respectant l’empreinte de chaque composant.
-	Générer les fichiers de fabrication au format GERBER pour établir les devis de fabrication du PCB ([JLCPCB](https://jlcpcb.com/), [PCBWays](https://www.pcbway.com/), ...).
  

>[!IMPORTANT]
>
> *Contraintes de routage :*
>
> |Item|Valeur|
> |:---|:---:|
> | Pistes standard sans angle droit (rupture d’angle) largeur | 25th (T25) |
> | Pistes d’alimentation sans angle droit, plan de masse de largeur | 25th (T25) |
> | Espacement entre pistes/pistes | 15th (T15) |
> | Espacement entre pistes/pastilles | 15th (T15) |
> | Trous métallisés | autorisés |
> | Traversées (via) | V30 |
> | Double-face | autorisé |
> | Pistes en angles droits| **interdit** |
> | Dimensions du circuit | réduites au maximum |
> | Sérigraphies | composants/cartes |


### **3. Fabrication du circuit imprimé :**

<p align="center">
 <img src="images/carte_espace_v1.5-view.png" align=center width="400" height="300">
</p>


---


### 🟢 Raspberry Pi 4 (serveur principal)
- Interface utilisateur via écran tactile 7"
- Hébergement de l’IHM en HTML/CSS/JS
- Serveur Python (Flask) pour la gestion des requêtes
- Communication I2C avec les ESP32

### 🟦 ESP32 (par casier)
- Réception de commandes via I2C
- Commande de la gâche électrique (ouverture)
- Lecture des badges NFC (PN532)
- Mesure de courant et de température

### 📦 Capteurs
- **NFC (PN532)** : ouverture via badge
- **Capteur de fin de course** : vérifie si le casier est fermé
- **Capteur de température** : sécurité en cas de surchauffe
- **Capteur de courant** : contrôle de la prise électrique

### 🟠 Interface homme-machine
- Affichée sur écran tactile (Raspberry)
- Utilisation de HTML, CSS, JavaScript
- Saisie via clavier numérique ou lecture NFC

---

## 🖥️ Organisation du code


```bash
projet-casier-connecte/
│
├── mon_site_web/              # Interface web (HTML/CSS/JS)
│   ├── static/
│   ├── templates/
│   └── server.py              # Serveur Flask (API et base de données)
│
├── relais-control/           
│   └── server.js              # Serveur Node.js pour contrôle du relais (via l'ESP32)
│
├── send_i2c.py                # Script Python qui envoie un tag NFC détecté à l'ESP32 via I²C
├── users.db                   # Base de données SQLite
├── README.md                  # Ce fichier
└── ...
```


---

## 📡 Communication & fonctionnement

1. L’utilisateur scanne son **badge NFC** ou saisit son **code PIN** via l’IHM.
2. Le Raspberry interroge la base de données (`users.db`).
3. Si l’accès est autorisé, une **commande I2C** est envoyée à l’ESP32 concerné.
4. L’ESP32 déclenche l’ouverture du casier via une **gâche électrique 12V**.
5. Un retour d’information est possible (capteurs de fin de course, température, etc.).

---

## 🧪 Technologies utilisées

- **ESP32** : programmation en C++ (Arduino)
- **Raspberry Pi** : Python (Flask), JavaScript, HTML/CSS
- **SQLite** : base de données embarquée
- **Ngrok** : test d’accès distant via tunnel sécurisé
- **Tinkercad** : modélisation 3D pour le support écran/prise
- **Proteus 8 / Ares** : conception du schéma structurel et PCB

---

## 📦 Impression 3D

Deux pièces ont été modélisées :
- **Support écran + Raspberry Pi** : ergonomique, accessible, adapté au badge NFC.
- **Support prise + carte ESP32** : permet de masquer les câbles et sécuriser l’électronique.

> Les modèles sont pensés pour former un seul bloc compact, esthétique et facilement intégrable dans un environnement public.

<p align="center">
 <img src="images/xxxxxx.png" align=center width="400" height="300">
</p>

<p align="center">
 <img src="images/xxxxx.png" align=center width="400" height="300">
</p>


---

## 🛠️ À améliorer

- **Sécurité logicielle** : hachage des mots de passe, chiffrement des communications.
- **Sécurité électrique** : conformité à la norme NF C 15-100 en cas de déploiement.
- **Adressage automatique des ESP32** sur le bus I2C pour simplifier les extensions.
- **Finition mécanique** : support écran et fixation de la prise.

---

## 📁 Sources

Tous les fichiers sont disponibles ici :  
🔗 [https://github.com/SNDOC-Michel-Bastien/Casier-connect-](https://github.com/SNDOC-Michel-Bastien/Casier-connect-)

---

&copy; 2025 Casier Connecté – Projet Licence Pro La Salle Avignon
