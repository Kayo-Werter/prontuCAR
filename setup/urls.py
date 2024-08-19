from django.contrib import admin
from django.urls import path, include
from document.api.router import document_router
from maintenance.api.router import maintenance_router
from refuel.api.router import refuel_router
from replacement.api.router import replacement_router
from vehicle.api.router import vehicle_router


urlpatterns = [
    path('admin/', admin.site.urls),
    
    path('api/v1/', include(document_router.urls)),
    path('api/v1/', include(maintenance_router.urls)),
    path('api/v1/', include(refuel_router.urls)),
    path('api/v1/', include(replacement_router.urls)),
    path('api/v1/', include(vehicle_router.urls)),
]
