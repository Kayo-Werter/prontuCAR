from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import serializers
from rest_framework import viewsets
from refuel.models import Refuel
from .serializers import RefuelSerializer


class RefuelViewSet(viewsets.ModelViewSet):
    queryset = Refuel.objects.all()
    serializer_class = RefuelSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['vehicle']

    def get_queryset(self):
        return Refuel.objects.filter(vehicle__user=self.request.user)

    def perform_create(self, serializer):
        vehicle = serializer.validated_data['vehicle']
        if vehicle.user != self.request.user:
            raise serializers.ValidationError("Você não pode adicionar abastecimentos para veículos que não são seus.")
        serializer.save()

    def perform_update(self, serializer):
        vehicle = serializer.validated_data['vehicle']
        if vehicle.user != self.request.user:
            raise serializers.ValidationError("Você não pode atualizar abastecimentos para veículos que não são seus.")
        serializer.save()

    def perform_destroy(self, instance):
        if instance.vehicle.user != self.request.user:
            raise serializers.ValidationError("Você não pode deletar abastecimentos para veículos que não são seus.")
        instance.delete()
