from rest_framework import viewsets
from refuel.models import Refuel
from .serializers import RefuelSerializer


class RefuelViewSet(viewsets.ModelViewSet):
    queryset = Refuel.objects.all()
    serializer_class = RefuelSerializer