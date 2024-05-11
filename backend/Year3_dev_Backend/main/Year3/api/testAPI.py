import datetime
import requests
import time
room_id = 1
baseURL = 'http://27.71.227.1:8000/api'
urlEnergyDataAPI = f'{baseURL}/energydata/realtime/monitor?room_id=1'
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
