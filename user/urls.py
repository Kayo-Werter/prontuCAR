from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .viewsets import CustomUserViewSet

user_router = DefaultRouter()
user_router.register(r'users', CustomUserViewSet, basename='user')

urlpatterns = [
    path('', include(user_router.urls)),
    path('users/<int:pk>/hard_delete/', CustomUserViewSet.as_view({'delete': 'hard_delete'})),
    path('users/<int:pk>/recover/', CustomUserViewSet.as_view({'put': 'recover'})),
    path('users/<int:pk>/recover/', CustomUserViewSet.as_view({'put': 'recover'})),

]
