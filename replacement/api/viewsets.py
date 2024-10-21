from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import serializers
from replacement.models import Replacement
from .serializers import ReplacementSerializer


class ReplacementViewSet(viewsets.ModelViewSet):
    queryset = Replacement.objects.all()
    serializer_class = ReplacementSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['vehicle']


    def get_queryset(self):
        return Replacement.objects.filter(vehicle__user=self.request.user)
    
    def perform_create(self, serializer):
        vehicle = serializer.validated_data['vehicle']
        if vehicle.user != self.request.user:
            raise serializers.ValidationError("Você não pode adicionar trocas de peças para veículos que não são seus.")
        serializer.save()

    def perform_update(self, serializer):
        vehicle = serializer.validated_data['vehicle']
        if vehicle.user != self.request.user:
            raise serializers.ValidationError("Você não pode atualizar trocas de peças para veículos que não são seus.")
        serializer.save()

    def perform_destroy(self, instance):
        if instance.vehicle.user != self.request.user:
            raise serializers.ValidationError("Você não pode deletar trocas de peças para veículos que não são seus.")
        instance.delete()
