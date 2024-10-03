from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets
from maintenance.models import Maintenance
from .serializers import MaintenanceSerializer



class MaintenanceViewSet(viewsets.ModelViewSet):
    queryset = Maintenance.objects.all()
    serializer_class = MaintenanceSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['vehicle']

    def get_queryset(self):
        return Maintenance.objects.filter(vehicle__user=self.request.user)
    