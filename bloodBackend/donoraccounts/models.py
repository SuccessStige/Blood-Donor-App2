from django.db import models
from django.contrib.auth.models import User

class Donor(models.Model):
    name = models.CharField(max_length=100)
    blood_group = models.CharField(max_length=5)
    location = models.CharField(max_length=100)
    phone = models.CharField(max_length=20)
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        null=True,
        blank=True
    )

    def __str__(self):
        return self.name
    

class BloodRequest(models.Model):
    # Optional: link request to a user
    requested_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    
    patient_name = models.CharField(max_length=255)
    hospital_or_doctor = models.CharField(max_length=255)
    blood_group = models.CharField(max_length=3)  # e.g., A+, O-, etc.
    quantity = models.PositiveIntegerField()      # Number of units
    phone = models.CharField(max_length=20)
    location = models.CharField(max_length=255)
    requested_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.patient_name} - {self.blood_group}"
