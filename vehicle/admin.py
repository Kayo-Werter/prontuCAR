from django.contrib import admin
from vehicle.models import Vehicle


@admin.register(Vehicle)
class VehicleAdmin(admin.ModelAdmin):
    list_display = ('name', 'automobile', 'plate',)