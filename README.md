# Projet Casier Connecté avec Raspberry Pi, ESP32, I²C, NFC et Interface Web

## 📌 Description

Ce projet vise à concevoir un **casier connecté** commandé via un **code PIN sécurisé** et la détection d’un **tag NFC**. Le système repose sur l’utilisation d’un **Raspberry Pi**, d’un **ESP32**, d’un **bus I²C**, et d’une **interface web responsive**.

Le système est conçu pour permettre :
- L’identification d’un utilisateur via un tag NFC
- L’ouverture d’un casier contrôlé par relais
- La gestion du code PIN via une IHM
- La communication sécurisée entre tous les modules via I²C et une API locale

## 🧱 Structure du Projet

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

## ⚙️ Technologies utilisées

- 🐍 Python (Flask, sqlite3)
- 📡 Node.js (contrôle relais)
- 📶 I²C (communication entre Raspberry Pi et ESP32)
- 🌐 HTML / CSS / JavaScript (interface utilisateur)
- 🧠 ESP32 (microcontrôleur pour la logique NFC et action du relais)
- 🧰 Ngrok (exposition du serveur Flask pour l’accès mobile)
- 🛠 Impression 3D (support mécanique de l’écran et du contrôleur)

## 🛠 Installation

1. **Cloner le projet**
   ```bash
   git clone https://github.com/ton-utilisateur/projet-casier-connecte.git
   cd projet-casier-connecte
   ```

2. **Préparer la base de données SQLite**
   ```bash
   sqlite3 users.db
   > CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT UNIQUE, password TEXT, pin TEXT);
   > .exit
   ```

3. **Installer les dépendances Python**
   ```bash
   pip install flask flask-cors
   ```

4. **Installer Node.js (si ce n’est pas déjà fait)**
   ```bash
   cd relais-control
   npm install
   ```

## ▶️ Lancement du projet

Ouvrir plusieurs terminaux séparément :

1. **Terminal 1 — Script d’envoi I²C (NFC)**
   ```bash
   cd ~/Desktop
   python3 send_i2c.py
   ```

2. **Terminal 2 — Serveur Node.js (relais)**
   ```bash
   cd ~/relais-control
   node server.js
   ```

3. **Terminal 3 — Serveur Flask**
   ```bash
   cd ~/Desktop/mon_site_web
   python3 server.py
   ```

4. **Terminal 4 — Lancer ngrok pour accès distant**
   ```bash
   ngrok http 5000
   ```

## 🔒 Authentification & Sécurité

- Un utilisateur doit s’enregistrer avec un **nom, mot de passe et code PIN unique**
- Après identification par tag NFC, le serveur vérifie le code PIN
- Le système gère les sessions Flask pour le tableau de bord
- Le serveur empêche la réutilisation d’un même PIN par plusieurs utilisateurs

## 📁 Fonctionnalités

- 🔐 Authentification sécurisée
- 📲 Interface web responsive
- ✍️ Possibilité de modifier son code PIN
- 🧠 Communication Raspberry ↔ ESP32 via I²C
- 🔌 Contrôle d’un relais pour ouverture de casier
- 🌍 Accès distant via ngrok

## 💡 Exigences du système

Le système doit :
- Être utilisable sans écran physique après configuration
- Ouvrir le casier uniquement si le tag NFC et le PIN sont valides
- Permettre la gestion utilisateur de manière autonome

## 🔗 Diagramme des exigences

Le diagramme des exigences identifie les besoins fonctionnels : lecture du tag NFC, vérification du code PIN, actionnement du relais, et accès distant via interface web. Chaque module du projet a été conçu pour répondre à ces contraintes, dans une logique d'autonomie et de fiabilité.

## 🧩 Travail collaboratif

Avant le développement, chaque membre du groupe a étudié un aspect spécifique du projet (Flask, I²C, ESP32, base de données, etc.) grâce à la plateforme **ClickUp** pour organiser les tâches et le suivi.

## 🖨 Mécanique

Deux pièces ont été modélisées avec **Tinkercad** et imprimées en 3D :
- Un support pour l’écran tactile du Raspberry Pi
- Un boîtier pour l’ESP32 derrière la prise électrique

## 🔓 Code source

Le code complet est disponible et maintenu sur ce dépôt GitHub. N'hésitez pas à forker, cloner ou améliorer ce projet :
➡️ [https://github.com/ton-utilisateur/projet-casier-connecte](https://github.com/ton-utilisateur/projet-casier-connecte)

## 📬 Auteurs

Projet réalisé par [ton nom ici] dans le cadre d’un projet de terminale ou BTS.