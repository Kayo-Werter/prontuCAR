from rest_framework import viewsets, response, status, filters
from rest_framework import serializers
from django_filters.rest_framework import DjangoFilterBackend
from django.shortcuts import get_object_or_404
from vehicle import metrics 
from .serializers import VehicleSerializer
from vehicle.models import Vehicle


class VehicleViewSet(viewsets.ModelViewSet):
    queryset = Vehicle.objects.all()
    serializer_class = VehicleSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['automobile']

    def get_queryset(self):
        return Vehicle.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        vehicle = serializer.validated_data['vehicle']
        if vehicle.user != self.request.user:
            raise serializers.ValidationError("Erro ao adicionar um novo veículo.")
        serializer.save()

    def perform_update(self, serializer):
        vehicle = serializer.validated_data['vehicle']
        if vehicle.user != self.request.user:
            raise serializers.ValidationError("Você não pode atualizar veículos que não são seus.")
        serializer.save()

    def perform_destroy(self, instance):
        if instance.vehicle.user != self.request.user:
            raise serializers.ValidationError("Você não pode deletar veículos que não são seus.")
        instance.delete()


class VehicleExpensesViewSet(viewsets.ViewSet):

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
    
    def get_queryset(self):
        return Vehicle.objects.filter(user=self.request.user)

    def list(self, request):
        vehicles = self.get_queryset()
        data = []

        for vehicle in vehicles:
            refuels = vehicle.refuels.all()
            maintenances = vehicle.maintenances.all()
            replacements = vehicle.replacements.all()

            refuels_data = [{'refuel': refuel.id, 'date': refuel.refuel_date, 'price': refuel.value_total } for refuel in refuels]
            
            maintenances_data = [{'maintenance': maintenance.id, 'date': maintenance.maintenance_date, 'price': maintenance.value } for maintenance in maintenances]

            replacements_data = [{'replacement': replacement.id, 'date': replacement.exchanged_part, 'price': replacement.value_part } for replacement in replacements]

            data.append({
                'vehicle_id': vehicle.id,
                'vehicle_name': vehicle.name,
                'refuels': refuels_data,
                'maintenances': maintenances_data,
                'replacements': replacements_data
            })

        return response.Response(data=data, status=status.HTTP_200_OK)
    

    def retrieve(self, request, pk=None):
        vehicle = get_object_or_404(self.get_queryset(), pk=pk)
        refuels = vehicle.refuels.all()
        maintenances = vehicle.maintenances.all()
        replacements = vehicle.replacements.all()
        data = []

        refuels_data = [{'refuel': refuel.id, 'date': refuel.refuel_date, 'price': refuel.value_total } for refuel in refuels]
        expenses = metrics.get_total_cost_metrics(pk=pk)
        maintenances_data = [{'maintenance': maintenance.id, 'date': maintenance.maintenance_date, 'price': maintenance.value } for maintenance in maintenances]

        replacements_data = [{'replacement': replacement.id, 'date': replacement.exchanged_part, 'price': replacement.value_part } for replacement in replacements]

        data.append({
            'vehicle_id': vehicle.id,
            'vehicle_name': vehicle.name,
            'expenses': expenses,
            'refuels_data': refuels_data,
            'maintenances_data': maintenances_data,
            'replacements': replacements_data
        })

        return response.Response(data=data, status=status.HTTP_200_OK)
