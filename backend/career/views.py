from rest_framework import generics, permissions

from participant.models import Participant
from .models import Brand, Position, Application
from .serializers import (
    BrandWithPositionsSerializer,
    PositionDetailSerializer,
    ApplicationSerializer, ApplicationCreateSerializer
)
from rest_framework.exceptions import NotFound


class BrandPositionListAPIView(generics.ListAPIView):
    queryset = Brand.objects.all().prefetch_related('position_set')
    serializer_class = BrandWithPositionsSerializer


class PositionDetailAPIView(generics.RetrieveAPIView):
    queryset = Position.objects.select_related('brand').all()
    serializer_class = PositionDetailSerializer
    lookup_field = 'id'


class MyApplicationsAPIView(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ApplicationSerializer

    def get_queryset(self):
        try:
            participant = Participant.objects.get(user=self.request.user)
        except Participant.DoesNotExist:
            raise NotFound("Participant not found for this user.")
        return Application.objects.filter(participant=participant).select_related('position')


class ApplyToPositionAPIView(generics.CreateAPIView):
    serializer_class = ApplicationCreateSerializer
    permission_classes = [permissions.IsAuthenticated]


from rest_framework import generics, permissions, serializers
from rest_framework.response import Response
from rest_framework import status


class UnapplyFromPositionAPIView(generics.DestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]
    lookup_field = 'position_id'

    def delete(self, request, *args, **kwargs):
        user = request.user
        try:
            participant = Participant.objects.get(user=user)
        except Participant.DoesNotExist:
            return Response({"detail": "Participant not found."}, status=status.HTTP_400_BAD_REQUEST)

        position_id = kwargs.get('position_id')

        try:
            application = Application.objects.get(participant=participant, position_id=position_id)
        except Application.DoesNotExist:
            return Response({"detail": "No application found for this position."}, status=status.HTTP_404_NOT_FOUND)

        application.delete()
        return Response({"detail": "Application withdrawn successfully."}, status=status.HTTP_204_NO_CONTENT)
