from rest_framework import routers
from .viewsets import ReplacementViewSet


replacement_router = routers.DefaultRouter()
replacement_router.register('replacement', ReplacementViewSet)
