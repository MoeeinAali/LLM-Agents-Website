from django.urls import path
from .views import (
    BrandPositionListAPIView,
    PositionDetailAPIView,
    MyApplicationsAPIView
)

urlpatterns = [
    path('positions/', BrandPositionListAPIView.as_view(), name='brand-position-list'),
    path('positions/<int:id>/', PositionDetailAPIView.as_view(), name='position-detail'),
    path('applications/my/', MyApplicationsAPIView.as_view(), name='my-applications'),
]
