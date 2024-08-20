from django.contrib import admin
from maintenance.models import Maintenance


@admin.register(Maintenance)
class MaintenanceAdmin(admin.ModelAdmin):
    list_display = ('maintenance_date',)
