from django.db import models
from django.utils import timezone
from document.models import Document


class Vehicle(models.Model):
    automoveis = [
        ('Moto', 'Moto'),
        ('Carro', 'Carro')
    ]

    automobile = models.CharField(choices=automoveis, max_length=255)
    name = models.CharField(max_length=255)
    plate = models.CharField(max_length=255, null=True, blank=True)
    document = models.ForeignKey(Document, null=True, blank=True, on_delete=models.CASCADE, related_name='vehicles')
    buy_day = models.DateField(default=timezone.now)


    def __str__(self):
        return self.name
