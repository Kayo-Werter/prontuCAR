from rest_framework import routers
from .viewsets import VehicleViewSet, VehicleExpensesViewSet


vehicle_router = routers.DefaultRouter()
vehicle_router.register('vehicle', VehicleViewSet)
vehicle_router.register('expense', VehicleExpensesViewSet, basename='vehicleexpense')
