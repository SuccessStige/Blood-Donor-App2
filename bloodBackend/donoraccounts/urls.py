from django.urls import path
from .views import DonorView
from .views import BloodRequestCreateView, BloodRequestListView

# urlpatterns = [
#     path("register/", DonorView.as_view()),                     # POST /api/donors/register/
#     path("request/create/", BloodRequestCreateView.as_view()),  # POST /api/donors/request/create/
#     path("request/list/", BloodRequestListView.as_view()),      # GET /api/donors/request/list/
# ]

urlpatterns = [
    path("register/donor/", DonorView.as_view()),
    path("request/create/", BloodRequestCreateView.as_view(), name="blood-request-create"),
    path("request/list/", BloodRequestListView.as_view(), name="blood-request-list"),
    path("blood/request/create/", BloodRequestCreateView.as_view(), name="create-blood-request"),
    
]


