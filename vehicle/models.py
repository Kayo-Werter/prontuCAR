from django.db import models
from django.utils import timezone
from django.core.validators import FileExtensionValidator


class Vehicle(models.Model):
    automoveis = [
        ('Moto', 'Moto'),
        ('Carro', 'Carro')
    ]

    automobile = models.CharField(choices=automoveis, max_length=255)
    name = models.CharField(max_length=255)
    plate = models.CharField(max_length=255, null=True, blank=True)
    file = models.FileField(null=True, blank=True, upload_to='documents/', validators=[FileExtensionValidator(allowed_extensions=['pdf'])])
    buy_day = models.DateField(default=timezone.now)


    def __str__(self):
        return self.name
