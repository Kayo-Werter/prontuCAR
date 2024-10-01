import requests
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from services import openweathermap



class WeatherApiViewSet(viewsets.ViewSet):

    def list(self, request):
        user = request.user
        city = user.address.city
        weather = openweathermap.OpenWeatherMap(city)
    
        try:
            temperature = weather.temp()
            description = weather.description()
            
            data = {
                'temperature': temperature,
                'description': description
            }

            return Response(data, status=status.HTTP_200_OK)
        
        except requests.exceptions.RequestException as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
