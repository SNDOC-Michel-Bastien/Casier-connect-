# Projet Casier Connecté avec Raspberry Pi, ESP32, I²C, NFC et Interface Web

## 📌 Description

Ce projet vise à concevoir un **casier connecté** commandé via un **code PIN sécurisé** ou la détection d’un **tag NFC**. Le système repose sur l’utilisation d’un **Raspberry Pi**, d’un **ESP32**, d’un **bus I²C**, et d’une **interface web responsive**.

Le système est conçu pour permettre :
- L’identification d’un utilisateur via un tag NFC
- L’ouverture d’un casier contrôlé par relais
- La gestion du code PIN via une IHM
- La communication sécurisée entre tous les modules via I²C et une API locale
- L'utilisation d'une application mobile pour la gestion du compte
- D'un abonnement pour l'utilisation d'une prise électrique

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
- 🧠 ESP32 (microcontrôleur pour l'action des relais)
- 🧰 Ngrok (exposition du serveur Flask pour l’accès mobile)
- 🛠 Impression 3D (support mécanique de l’écran et du contrôleur)

## 🛠 Installation

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

Projet réalisé par MICHEL Bastien, BROUSSE Antoine, SAMA MOLA Soultane dans le cadre d’un projet de Licence Pro.
