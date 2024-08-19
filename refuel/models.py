from django.db import models
from vehicle.models import Vehicle


class Refuel(models.Model):
    vehicle = models.ForeignKey(Vehicle, on_delete=models.PROTECT, related_name='refuels')
    price_gasoline = models.DecimalField(max_digits=20, decimal_places=2)
    value_total = models.DecimalField(max_digits=20, decimal_places=2)
    liters_gasoline = models.DecimalField(max_digits=20, decimal_places=2)
    refuel_date = models.DateField(auto_now=True)


    def __str__(self) -> str:
        return f'{self.vehicle} - {self.price_gasoline}'
    
