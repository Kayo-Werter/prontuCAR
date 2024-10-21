from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from user.models import CustomUser
from .serializers import CustomUserSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated


class CustomUserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def hard_delete(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.hard_delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def recover(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.recover()
        return Response(status=status.HTTP_200_OK)

    def get_permissions(self):
        if self.action == 'create':
            self.permission_classes = [AllowAny]
        else:
            self.permission_classes = [IsAuthenticated]
        return super(CustomUserViewSet, self).get_permissions()
