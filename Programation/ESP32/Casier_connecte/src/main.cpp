#include <Arduino.h>
#include <WireSlave.h>

#define SDA_PIN 19
#define SCL_PIN 18
#define I2C_SLAVE_ADDR 0x08

#define RELAY1_PIN 3
#define RELAY2_PIN 8

void receiveEvent(int howMany);

void setup()
{
    Serial.begin(115200);

    pinMode(RELAY1_PIN, OUTPUT);
    pinMode(RELAY2_PIN, OUTPUT);

    // relais éteints au démarrage
    digitalWrite(RELAY1_PIN, HIGH);
    digitalWrite(RELAY2_PIN, HIGH);

    bool success = WireSlave.begin(SDA_PIN, SCL_PIN, I2C_SLAVE_ADDR);
    if (!success) {
        Serial.println("Échec initialisation I2C esclave");
        while (1) delay(100);
    }

    WireSlave.onReceive(receiveEvent);
}

void loop()
{
    WireSlave.update();
    delay(1);
}

void receiveEvent(int howMany)
{
    while (WireSlave.available()) {
        int command = WireSlave.read();
        Serial.print("Commande reçue : ");
        Serial.println(command);

        switch (command) {
            case 1:
                digitalWrite(RELAY1_PIN, LOW);
                delay(200);
                digitalWrite(RELAY1_PIN, HIGH);
                Serial.println("Relais prise activé");
                break;
            case 2:
                digitalWrite(RELAY2_PIN, LOW);
                delay(200);
                digitalWrite(RELAY2_PIN, HIGH);
                Serial.println("Relais porte activé");
                break;
            default:
                Serial.println("Commande inconnue");
                break;
        }
    }
}
