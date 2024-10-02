from rest_framework import serializers
from replacement.models import Replacement


class ReplacementSerializer(serializers.ModelSerializer):
    vehicle = serializers.CharField(source='vehicle.name', read_only=True)
    class Meta:
        model = Replacement
        fields = '__all__'
