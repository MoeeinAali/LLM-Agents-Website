from django.urls import path
from .views import (
    BrandPositionListAPIView,
    PositionDetailAPIView,
    MyApplicationsAPIView, ApplyToPositionAPIView, UnapplyFromPositionAPIView
)

urlpatterns = [
    path('positions/', BrandPositionListAPIView.as_view(), name='brand-position-list'),
    path('positions/<int:id>/', PositionDetailAPIView.as_view(), name='position-detail'),
    path('applications/my/', MyApplicationsAPIView.as_view(), name='my-applications'),
    path('applications/apply/', ApplyToPositionAPIView.as_view(), name='apply-to-position'),

    path('applications/unapply/<int:position_id>/', UnapplyFromPositionAPIView.as_view(), name='unapply-from-position'),
]
