import requests
from django.conf import settings 


class OpenWeatherMap:

    def __init__(self, city):
        self.__base_url = 'https://api.openweathermap.org/data/2.5/'
        self.__api_key = settings.API_KEY_OPENWEATHERMAP
        self.city = city

    def weather(self):
        try:
            response = requests.get(
                url=f'{self.__base_url}weather?q={self.city}&appid={self.__api_key}'
            ) 
            response.raise_for_status()
            return response.json()
        
        except requests.exceptions.RequestException as e:
            return {"error": 'Estamos com problemas ao tentar acessar o clima da sua região!'}
        
    def description(self):
        weather = self.weather()
        return weather['weather'][0]['description']
    
    def temp(self):
        weather = self.weather()
        temp_celsius = weather['main']['temp'] - 273.15
        return round(temp_celsius, 2)
