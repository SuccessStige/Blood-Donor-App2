from rest_framework import generics, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser
from .models import Request
from .serializers import BloodRequestSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .models import Request
from blood.models import Request  
from django.contrib.auth import get_user_model




class CreateBloodRequestView(generics.CreateAPIView):
    queryset = Request.objects.all()
    serializer_class = BloodRequestSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class AdminBloodRequestListView(generics.ListAPIView):
    queryset = Request.objects.all().order_by("-created_at")
    serializer_class = BloodRequestSerializer
    permission_classes = [IsAdminUser]


class UpdateBloodRequestStatusView(APIView):
    permission_classes = [IsAdminUser]

    def patch(self, request, pk):
        try:
            blood_request = Request.objects.get(pk=pk)
        except Request.DoesNotExist:
            return Response(
                {"error": "Not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        new_status = request.data.get("status")

        if new_status not in ["APPROVED", "REJECTED"]:
            return Response(
                {"error": "Invalid status"},
                status=status.HTTP_400_BAD_REQUEST
            )

        blood_request.status = new_status
        blood_request.save()

        serializer = BloodRequestSerializer(blood_request)
        return Response(serializer.data, status=status.HTTP_200_OK)


from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny

# Import models from their respective apps
from donoraccounts.models import Donor, BloodRequest
# from .models import Request  # or BloodRequest if renamed

class StatsAPIView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        # Count all registered donors
        total_donors = Donor.objects.count()

        # Count all blood requests (regardless of status)
        total_requests = BloodRequest.objects.count()

        # Count only approved blood requests
        lives_saved = Request.objects.filter(status="APPROVED").count()

        return Response({
            "total_donors": total_donors,
            "total_requests": total_requests,
            "lives_saved": lives_saved
        })
