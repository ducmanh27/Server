import datetime
import requests
import time
room_id = 1
baseURL = 'http://192.168.2.199:8000/api'
urlEnergyDataAPI = f'{baseURL}/energydata/1'
urlGatewaySync = f'{baseURL}/gateway'
urlActuatorStatus = f'{baseURL}/actuator_status'
urlInformationTag = f'{baseURL}/room/information_tag?room_id={room_id}'

def getTimeCurrent():
    return datetime.datetime.now()
def send_request():
    response = requests.get(urlEnergyDataAPI)
    timeCurrent = getTimeCurrent()
    print(response.text)
    print(timeCurrent)
if __name__ == "__main__":
    send_request()
