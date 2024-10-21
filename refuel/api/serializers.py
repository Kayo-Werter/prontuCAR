from rest_framework import serializers
from refuel.models import Refuel


class RefuelSerializer(serializers.ModelSerializer):

    class Meta:
        model = Refuel
        fields = '__all__'
