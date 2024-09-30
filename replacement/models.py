from django.db import models
from django.utils import timezone
from vehicle.models import Vehicle

class Replacement(models.Model):
    vehicle = models.ForeignKey(Vehicle, on_delete=models.PROTECT, related_name='replacements')
    exchanged_part = models.CharField(max_length=255)
    value_part = models.DecimalField(default=0, max_digits=20, decimal_places=2)
    replacement_day = models.DateField(default=timezone.now)
    description = models.TextField(null=True, blank=True)
    local = models.CharField(max_length=255, null=True, blank=True)

    def __str__(self) -> str:
        return f'{self.vehicle} - {self.value_part}'
    