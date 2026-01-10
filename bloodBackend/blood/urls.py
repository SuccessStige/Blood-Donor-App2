# blood/urls.py
from django.urls import path
from .views import StatsAPIView
from .views import (
    CreateBloodRequestView,
    AdminBloodRequestListView,
    UpdateBloodRequestStatusView
)

urlpatterns = [
    path("request/create/", CreateBloodRequestView.as_view(), name="create-blood-request"),
    # path("blood/request/create/", CreateBloodRequestView.as_view()),
    path("admin/blood/requests/", AdminBloodRequestListView.as_view()),
    path("admin/blood/request/<int:pk>/status/", UpdateBloodRequestStatusView.as_view()),
    path("stats/", StatsAPIView.as_view(), name="stats"),
]


