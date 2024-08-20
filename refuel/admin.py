from django.contrib import admin
from refuel.models import Refuel


@admin.register(Refuel)
class RefuelAdmin(admin.ModelAdmin):
    list_display = ('value_total', 'refuel_date',)
