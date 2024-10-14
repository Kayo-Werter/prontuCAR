from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets
from rest_framework import serializers
from maintenance.models import Maintenance
from .serializers import MaintenanceSerializer



class MaintenanceViewSet(viewsets.ModelViewSet):
    queryset = Maintenance.objects.all()
    serializer_class = MaintenanceSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['vehicle']

    def get_queryset(self):
        return Maintenance.objects.filter(vehicle__user=self.request.user)

    def perform_create(self, serializer):
        vehicle = serializer.validated_data['vehicle']
        if vehicle.user != self.request.user:
            raise serializers.ValidationError("Você não pode adicionar manutenções para veículos que não são seus.")
        serializer.save()

    def perform_update(self, serializer):
        vehicle = serializer.validated_data['vehicle']
        if vehicle.user != self.request.user:
            raise serializers.ValidationError("Você não pode atualizar manutenções para veículos que não são seus.")
        serializer.save()

    def perform_destroy(self, instance):
        if instance.vehicle.user != self.request.user:
            raise serializers.ValidationError("Você não pode deletar manutenções para veículos que não são seus.")
        instance.delete()
