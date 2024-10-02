from django.contrib import admin
from django.urls import path, include
from rest_framework import permissions
from rest_framework.routers import DefaultRouter
from .viewsets import HomeApiViewSet
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from maintenance.api.router import maintenance_router
from refuel.api.router import refuel_router
from replacement.api.router import replacement_router
from vehicle.api.router import vehicle_router


schema_view = get_schema_view(
   openapi.Info(
      title="ProntuCAR",
      default_version='v1',
      description="Está documentação refere-se a primeira versão do ProntuCAR. Um sistema onde você poderá ter o controle de gastos do seu carro e toda sua retrospectiva de revisões, abastecimentos, trocas de peças. ",
      terms_of_service="#",
      contact=openapi.Contact(email="kayocampos@ads.fiponline.edu.br"),
      license=openapi.License(name="BSD License"),
   ),
   public=True,
permission_classes = [permissions.AllowAny]

)

home_router = DefaultRouter()
home_router.register('home', HomeApiViewSet, basename='home')

urlpatterns = [
   path('admin/', admin.site.urls),

   path('api/v1/', include('authentication.urls')),
   path('api/v1/', include('user.urls')),

   path('api/v1/', include(vehicle_router.urls)),
   path('api/v1/', include(maintenance_router.urls)),
   path('api/v1/', include(refuel_router.urls)),
   path('api/v1/', include(replacement_router.urls)),

   path('api/v1/', include(home_router.urls)),

   path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
   path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]
