from rest_framework import routers
from .viewsets import RefuelViewSet


refuel_router = routers.DefaultRouter()
refuel_router.register('refuel', RefuelViewSet)
