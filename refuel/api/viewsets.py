from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
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