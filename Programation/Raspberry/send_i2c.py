import board
import busio
from digitalio import DigitalInOut
from adafruit_pn532.i2c import PN532_I2C
import requests
import time

# Initialisation I2C
i2c = busio.I2C(board.SCL, board.SDA)
pn532 = PN532_I2C(i2c, debug=False)

pn532.SAM_configuration()  # Active la lecture NFC

print("Lecture des tags NFC...")

# UID d’un tag autorisé (à adapter)
UID_AUTORISE = [0xec, 0x51, 0xc7, 0x1]

while True:
    uid = pn532.read_passive_target(timeout=0.5)

    if uid is not None:
        print("Tag détecté ! UID:", [hex(i) for i in uid])

        if list(uid) == UID_AUTORISE:
            print("UID autorisé, activation du relais")
            try:
                requests.post("http://localhost:3000/control-relais/1")
            except Exception as e:
                print("Erreur HTTP:", e)
        else:
            print("UID non reconnu")

        time.sleep(2)  # anti-déclenchement multiple
