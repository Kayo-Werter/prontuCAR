from rest_framework import serializers
from refuel.models import Refuel


class RefuelSerializer(serializers.ModelSerializer):
    vehicle = serializers.CharField(source='vehicle.name', read_only=True)

    class Meta:
        model = Refuel
        fields = '__all__'
