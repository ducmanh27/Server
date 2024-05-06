import json
import paho.mqtt.client as mqtt

def send_json_to_mqtt_server(json_data, broker_address="192.168.2.199", broker_port=1883, topic="farm/monitor/alive"):
    print(json_data)
    # Kết nối tới broker MQTT
    client = mqtt.Client()
    client.connect(broker_address, broker_port)

    # Gửi chuỗi JSON tới chủ đề MQTT
    client.publish(topic, json_data)

    # Đóng kết nối tới broker MQTT
    client.disconnect()



