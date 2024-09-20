from django.db.models import Sum
from django.utils.formats import number_format
from .models import Vehicle
from refuel.models import Refuel
from maintenance.models import Maintenance
from replacement.models import Replacement


def get_total_cost_metrics(pk=None):
    total_refuels = Refuel.objects.filter(vehicle=pk).aggregate(total_refuels=Sum('value_total'))['total_refuels'] or 0
    total_maintenaces = Maintenance.objects.filter(vehicle=pk).aggregate(total_maintenaces=Sum('value'))['total_maintenaces'] or 0
    total_replacement = Replacement.objects.filter(vehicle=pk).aggregate(total_replacement=Sum('value_part')) ['total_replacement'] or 0

    total = total_refuels + total_maintenaces + total_replacement
  

    return dict(total_refuels = number_format(total_refuels, decimal_pos=2, force_grouping=True),
                total_maintenaces=number_format(total_maintenaces, decimal_pos=2, force_grouping=True),
                total_replacement=number_format(total_replacement, decimal_pos=2, force_grouping=True),
                total=number_format(total, decimal_pos=2, force_grouping=True)
                )
    