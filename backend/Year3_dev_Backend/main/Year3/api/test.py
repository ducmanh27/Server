import datetime
import requests
import time
start_ip = 180
end_ip = 198
baseURL = 'http://27.71.227.1:8000/api'
urlGatewaySync = f'{baseURL}/gateway'
urlActuatorStatus = f'{baseURL}/actuator_status'
def getTimeCurrent():
    return datetime.datetime.now()
def send_request():
    response = requests.get(urlGatewaySync)
    timeCurrent = getTimeCurrent()
    print(response.text)
    print(timeCurrent)
def add_gateway():
    payload = {
        'add_gateway': 'true',
        'room_id': '1',
        'ip_start': f'192.168.1.{start_ip}',
        'ip_end': f'192.168.1.{end_ip}'
    }
    response = requests.post(urlGatewaySync, payload)
    timeCurrent = getTimeCurrent()
    print(response.text)
    print(timeCurrent)
if __name__ == "__main__":
    while True:
        send_request()
        time.sleep(1800)  
