from rest_framework import serializers
from .models import Donor
from .models import BloodRequest


class DonorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Donor
        fields = ["id", "name", "blood_group", "location", "phone"]

class BloodRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = BloodRequest
        fields = [
            "id",
            "patient_name",
            "hospital_or_doctor",
            "blood_group",
            "quantity",
            "phone",
            "location",
            "requested_by",
            "requested_at"
        ]
        read_only_fields = ["id", "requested_by", "requested_at"]
