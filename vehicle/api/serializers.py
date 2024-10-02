from rest_framework import serializers
from vehicle.models import Vehicle


class VehicleSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Vehicle
        fields = '__all__'
        read_only_fields = ['user']