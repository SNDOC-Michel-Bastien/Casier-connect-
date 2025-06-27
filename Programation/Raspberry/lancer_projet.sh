#!/bin/bash


# Terminal 1 : Script Python NFC
lxterminal --command="bash -c 'python3 send_i2c.py; exec bash'" &

# Terminal 2 : Serveur Node.js
lxterminal --working-directory=../relais-control --command="bash -c 'node server.js; exec bash'" &

# Terminal 3 : Serveur Python du site web
lxterminal --working-directory=../Desktop/mon_site_web --command="bash -c 'python3 server.py; exec bash'" &

# Terminal 4 : Ngrok
lxterminal --working-directory=~ --command="bash -c 'ngrok http --domain=mustang-sound-boxer.ngrok-free.app --host-header=localhost 5000; exec bash'" &

# Ouverture de la page web
chromium-browser --start-fullscreen ../Desktop/Casier_connecté/Pages/Principale/HTML/index.html &
