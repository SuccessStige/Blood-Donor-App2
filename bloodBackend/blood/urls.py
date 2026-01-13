# blood/urls.py
from django.urls import path
from .views import StatsAPIView
from .views import (
    CreateBloodRequestView,
    AdminBloodRequestListView,
    UpdateBloodRequestStatusView
)

# urlpatterns = [
#     path("request/create/", CreateBloodRequestView.as_view(), name="create-blood-request"),
#     # path("request/create/", CreateBloodRequestView.as_view()),                  # POST /api/blood/request/create/
#     path("admin/requests/", AdminBloodRequestListView.as_view()),               # GET /api/blood/admin/requests/
#     path("admin/request/<int:pk>/status/", UpdateBloodRequestStatusView.as_view()),  # PATCH /api/blood/admin/request/1/status/
#     path("stats/", StatsAPIView.as_view()),                                     # GET /api/blood/stats/
# ]

urlpatterns = [
    path("request/create/", CreateBloodRequestView.as_view(), name="create-blood-request"),
    path("admin/blood/requests/", AdminBloodRequestListView.as_view()),
    path("admin/blood/request/<int:pk>/status/", UpdateBloodRequestStatusView.as_view()),
    path("stats/", StatsAPIView.as_view(), name="stats"),
]


