from rest_framework import routers
from .viewsets import MaintenanceViewSet


maintenance_router = routers.DefaultRouter()
maintenance_router.register('maintenance', MaintenanceViewSet)
