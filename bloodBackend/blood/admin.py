from django.contrib import admin
from .models import Request

@admin.register(Request)
class BloodRequestAdmin(admin.ModelAdmin):
    list_display = ("patient_name", "blood_group", "quantity", "location", "status", "created_at")
    list_filter = ("status", "blood_group", "location")
    search_fields = ("patient_name", "phone")

    # Make admin read-only
    def has_add_permission(self, request):
        # Disable adding via admin
        return False

    def has_change_permission(self, request, obj=None):
        # Disable editing via admin
        return True

    def has_delete_permission(self, request, obj=None):
        # Optionally disable deleting via admin
        return True
