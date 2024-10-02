import requests
from datetime import datetime 
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from services import openweathermap
from maintenance.models import Maintenance
from maintenance.api.serializers import MaintenanceSerializer




class HomeApiViewSet(viewsets.ViewSet):

    def list(self, request):
        user = request.user
        city = user.address.city
        weather = openweathermap.OpenWeatherMap(city)
        last_maintenance = Maintenance.objects.last()
        today = datetime.now()



        try:
            temperature = weather.temp()
            description = weather.description()

            weather_day = {
                'temperature': temperature,
                'description': description,
                'today': today.strftime("%A, %d/%m/%Y")
            }

            last_maintenance_data = MaintenanceSerializer(last_maintenance).data

            data = {
                'weather_day': weather_day,
                'last_maintenance': last_maintenance_data
            }

            return Response(data, status=status.HTTP_200_OK)
        
        except requests.exceptions.RequestException as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

