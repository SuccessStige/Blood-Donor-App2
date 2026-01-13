from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import DonorSerializer
from .models import Donor
from rest_framework import generics, permissions
from .models import BloodRequest
from .serializers import BloodRequestSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .models import BloodRequest
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.authentication import JWTAuthentication


class DonorView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def post(self, request):
        serializer = DonorSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)  # optional
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        donors = Donor.objects.all()
        serializer = DonorSerializer(donors, many=True)
        return Response(serializer.data)


class BloodRequestCreateView(generics.CreateAPIView):
    serializer_class = BloodRequestSerializer
    permission_classes = [permissions.IsAuthenticated]

class BloodRequestListView(generics.ListAPIView):
    serializer_class = BloodRequestSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return BloodRequest.objects.filter(requester=self.request.user)


class BloodRequestCreateView(generics.CreateAPIView):
    queryset = BloodRequest.objects.all()
    serializer_class = BloodRequestSerializer
    permission_classes = [permissions.IsAuthenticated]  # Only logged-in users

    def perform_create(self, serializer):
        serializer.save(requested_by=self.request.user)

