exec mosquitto &
cd database && python3 ../../mqtt/fakejardin.py &
cd database && python3 ../../mqtt/mqttmain.py 

