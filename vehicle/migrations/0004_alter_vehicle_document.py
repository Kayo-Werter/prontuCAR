# Generated by Django 5.1 on 2024-09-20 20:44

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('document', '0003_document_file'),
        ('vehicle', '0003_alter_vehicle_buy_day'),
    ]

    operations = [
        migrations.AlterField(
            model_name='vehicle',
            name='document',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='vehicles', to='document.document'),
        ),
    ]
