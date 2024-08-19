from django.db import models
from vehicle.models import Vehicle

class Maintenance(models.Model):
    vehicle = models.ForeignKey(Vehicle, on_delete=models.PROTECT, related_name='maintenances')
    value = models.DecimalField(max_digits=20, decimal_places=2)
    description = models.TextField()
    local = models.CharField(max_length=255)
    maintenance_date = models.DateField(auto_now=True)


    def __str__(self) -> str:
        return f'{self.vehicle} - {self.local} - {self.maintenance_date}'
