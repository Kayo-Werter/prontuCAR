from rest_framework import routers
from .viewsets import VehicleViewSet


vehicle_router = routers.DefaultRouter()
vehicle_router.register('vehicle', VehicleViewSet)
vehicle_router.register('stats', VehicleViewSet)
