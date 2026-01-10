from rest_framework import serializers
from .models import Request

class BloodRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Request
        fields = "__all__"
        read_only_fields = ["id", "user", "created_at"]
