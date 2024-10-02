from rest_framework import serializers
from maintenance.models import Maintenance


class MaintenanceSerializer(serializers.ModelSerializer):
    vehicle = serializers.CharField(source='vehicle.name', read_only=True)
    class Meta:
        model = Maintenance
        fields = '__all__'
