from django.db import models
from vehicle.models import Vehicle

class Replacement(models.Model):
    vehicle = models.ForeignKey(Vehicle, on_delete=models.PROTECT, related_name='replacements')
    exchanged_part = models.CharField(max_length=255)
    value_part = models.DecimalField(max_digits=20, decimal_places=2)
    replacement_day = models.DateField(auto_now=True)