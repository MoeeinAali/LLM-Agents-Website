from rest_framework import generics, permissions

from participant.models import Participant
from .models import Brand, Position, Application
from .serializers import (
    BrandWithPositionsSerializer,
    PositionDetailSerializer,
    ApplicationSerializer
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
