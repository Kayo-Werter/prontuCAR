from rest_framework import viewsets
from replacement.models import Replacement
from .serializers import ReplacementSerializer


class ReplacementViewSet(viewsets.ModelViewSet):
    queryset = Replacement.objects.all()
    serializer_class = ReplacementSerializer
