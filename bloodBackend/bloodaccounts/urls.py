from django.urls import path
from .views import RegisterView
from rest_framework_simplejwt.views import TokenObtainPairView
from .views import MyTokenObtainPairView

urlpatterns = [
    path("register/", RegisterView.as_view()),                  # POST /api/auth/register/
    path("login/", MyTokenObtainPairView.as_view(), name="token_obtain_pair"),  # POST /api/auth/login/
]

# urlpatterns = [
#     path("auth/register/", RegisterView.as_view()),
#     path("auth/login/", TokenObtainPairView.as_view()),
#     path("auth/login/", MyTokenObtainPairView.as_view(), name="token_obtain_pair"),

# ]
