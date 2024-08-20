from django.contrib import admin
from replacement.models import Replacement


@admin.register(Replacement)
class ReplacementAdmin(admin.ModelAdmin):
    list_display = ('replacement_day',)
