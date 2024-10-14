from django.db.models import Sum
from django.utils.formats import number_format
from .models import Vehicle
from refuel.models import Refuel
from maintenance.models import Maintenance
from replacement.models import Replacement


def get_total_cost_metrics(pk=None):
    total_refuels = Refuel.objects.filter(vehicle=pk).aggregate(total_refuels=Sum('value_total'))['total_refuels'] or 0
    total_maintenances = Maintenance.objects.filter(vehicle=pk).aggregate(total_maintenaces=Sum('value'))['total_maintenaces'] or 0
    total_replacements = Replacement.objects.filter(vehicle=pk).aggregate(total_replacement=Sum('value_part')) ['total_replacement'] or 0

    total = total_refuels + total_maintenances + total_replacements
  

    return dict(total_refuels = number_format(total_refuels, decimal_pos=2, force_grouping=True),
                total_maintenances=number_format(total_maintenances, decimal_pos=2, force_grouping=True),
                total_replacements=number_format(total_replacements, decimal_pos=2, force_grouping=True),
                total=number_format(total, decimal_pos=2, force_grouping=True)
                )
    