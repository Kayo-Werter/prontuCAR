from rest_framework import serializers
from replacement.models import Replacement


class ReplacementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Replacement
        fields = '__all__'
