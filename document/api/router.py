from rest_framework import routers
from .viewsets import DocumentViewSet


document_router = routers.DefaultRouter()
document_router.register('Document', DocumentViewSet)