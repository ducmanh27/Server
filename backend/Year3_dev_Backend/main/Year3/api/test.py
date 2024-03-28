import datetime
import requests

if __name__ == "__main__":


    # Define the URL of the Django server
    url = 'http://192.168.1.199:8000/api/gateway'

    # Define the payload for the POST request
    payload = {
        'add_gateway': 'true',
        'room_id': '1',
        'ip_start': '192.168.1.180',
        'ip_end': '192.168.1.198'
    }

    # Send the POST request
    # response = requests.post(url, data=payload)
    response = requests.get(url)
    # response = requests.get(url)
    # Print the response
    print(response.text)
