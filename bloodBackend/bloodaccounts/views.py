from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import UserProfile
from rest_framework.permissions import AllowAny

from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import MyTokenObtainPairSerializer


class RegisterView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        full_name = request.data.get("full_name")
        email = request.data.get("email")
        password = request.data.get("password")
        dob = request.data.get("date_of_birth")

        if User.objects.filter(username=email).exists():
            return Response(
                {"detail": "Email already registered"},
                status=status.HTTP_400_BAD_REQUEST
            )

        user = User.objects.create_user(
            username=email,
            email=email,
            password=password
        )

        UserProfile.objects.create(
            user=user,
            full_name=full_name,
            date_of_birth=dob
        )

        return Response(
            {"detail": "Account created successfully"},
            status=status.HTTP_201_CREATED
        )
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

