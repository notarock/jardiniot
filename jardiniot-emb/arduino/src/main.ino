/* Code pour le Arduino Uno et le DHT22 */
#include "DHT.h"
#include <SoftwareSerial.h>
#include <CmdMessenger.h>
#include <string.h>
// Si y'a un erreur parce que DHT.h n'est pas trouvé, exécutez la commande:
// platformio lib install "DHT sensor library"

int ledPin = 13;                 // LED connected to digital pin 13

#define DHTPIN 2
#define DHTTYPE DHT22
DHT dht(DHTPIN, DHTTYPE);

// http://www.martyncurrey.com/arduino-to-esp8266-serial-commincation/
SoftwareSerial ESPserial(3, 4); // pin 3 à TX du ESP | pin 4 à RX du ESP
// Attach a new CmdMessenger object to the default Serial port
CmdMessenger cmdMessenger = CmdMessenger(Serial);

// This is the list of recognized commands. These can be commands that can either be sent or received.
// In order to receive, attach a callback function to these events
enum
{
  kSetControl          , // Command to receive a command from the ESP for different sensor
  kStatus              , // Command to send status to ESP
};

// Callbacks define on which received commands we take action
void attachCommandCallbacks()
{
  // Attach callback methods
  cmdMessenger.attach(kSetControl, OnSetControl);
}

// Callback function that set the sensors
void OnSetControl()
{
  // Listen for communication from ESP
  String value = cmdMessenger.readStringArg();
  Serial.print("Value received :");
  Serial.println(value);
  long info = atol(value.c_str());
  convertInfoFromESP(info);
}


void setup()
{
  // put your setup code here, to run once:
  Serial.begin(9600);
  ESPserial.begin(9600);
  while (!Serial) {
      ; // wait for serial port to connect. Needed for native USB port only
  }

  dht.begin();  // part le DHT!

  Serial.println("Ready soon!");

  pinMode(ledPin, OUTPUT);

  // Adds newline to every command
  cmdMessenger.printLfCr();
  // Attach my application's user-defined callback methods
  attachCommandCallbacks();
}

void loop()
{
  // put your main code here, to run repeatedly:
  float h = dht.readHumidity();           // humidité
  float t = dht.readTemperature(false);        // temp (Celcius)

  if (isnan(h) || isnan(t)) {
    Serial.println("Echec de lecture du DHT!");
  } else {
    //pour faire flasher la led
    digitalWrite(ledPin, HIGH);
    delay(1000);
    digitalWrite(ledPin, LOW);
    delay(1000);

    //convertion de temperature en string
    char tempString[8];
    dtostrf(t, 6, 2, tempString);
    //convertion de l'humidite en string
    char humidityString[8];
    dtostrf(h, 6, 2, humidityString);

    //met les infos dans un char array (sprintf ne prends plus de float (%f) en parametre)
    char sensorStatus[50];
    sprintf(sensorStatus, "\"temperature\":%s,\"humidite\":%s",tempString,humidityString);

    // Send data to ESP
    // Process incoming serial data, and perform callbacks
    cmdMessenger.feedinSerialData();
    Serial.println("Command Sent!");
    cmdMessenger.sendCmd(kStatus, (String) sensorStatus);
    //ESPserial.write(sensorStatus);

  }
}

/*void readInfoFromESP()
{
  if (ESPserial.available()) {
    String value = ESPserial.readString();
    Serial.print("Value received :");
    Serial.println(value);

    long info = atol(value.c_str());
    convertInfoFromESP(info);
  }
}*/

void convertInfoFromESP(long info)
{
  // Extraire les infos contenu dans le int reçu
  int bleu = (info & 0xff000000) >> 24;
	int blanc = (info & 0xff0000) >> 16;
	int rouge = (info & 0xff00) >> 8;
  int fans = (info & 0xff);

  Serial.print("bleu :");
  Serial.println(bleu);
  Serial.print("blanc :");
  Serial.println(blanc);
  Serial.print("rouge :");
  Serial.println(rouge);
  Serial.print("Fans :");
  Serial.println(fans);

  // Todo Envoyer les valeurs aux différents senseurs
}
