from rest_framework import serializers
from document.models import Document


class DocumentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Document
        Fields = '__all__'
        