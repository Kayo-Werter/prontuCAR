from decimal import Decimal
from django.core.validators import MinValueValidator
from django.utils import timezone
from django.db import models
from vehicle.models import Vehicle



class Refuel(models.Model):
    vehicle = models.ForeignKey(Vehicle, on_delete=models.PROTECT, related_name='refuels')
    price_gasoline = models.DecimalField(default=Decimal('0.00'), 
                                         validators=[MinValueValidator(Decimal('0.00'), 'O preço não pode ser inferior a 0')], 
                                         max_digits=20,
                                         decimal_places=2)
    value_total = models.DecimalField(default=Decimal('0.00'), 
                                      validators=[MinValueValidator(Decimal('0.00'), 'O valor não pode ser inferior a 0')], 
                                      max_digits=20, 
                                      decimal_places=2)
    liters_gasoline = models.DecimalField(max_digits=20, decimal_places=2, editable=False)
    refuel_date = models.DateField(default=timezone.now)

    def save(self, *args, **kwargs):
        if (self.value_total > 0) and (self.price_gasoline > 0):
            self.liters_gasoline = self.value_total / self.price_gasoline
        else:
            self.price_gasoline = 0
        return super().save(*args, **kwargs)


    def __str__(self) -> str:
        return f'{self.vehicle} - {self.price_gasoline}'
    
