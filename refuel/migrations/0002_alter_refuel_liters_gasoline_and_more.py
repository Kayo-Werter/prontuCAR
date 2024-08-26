# Generated by Django 5.1 on 2024-08-22 13:22

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('refuel', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='refuel',
            name='liters_gasoline',
            field=models.DecimalField(decimal_places=2, editable=False, max_digits=20),
        ),
        migrations.AlterField(
            model_name='refuel',
            name='price_gasoline',
            field=models.DecimalField(decimal_places=2, max_digits=20, validators=[django.core.validators.MinValueValidator(0, 'Avaliação não pode ser inferior a 0')]),
        ),
        migrations.AlterField(
            model_name='refuel',
            name='value_total',
            field=models.DecimalField(decimal_places=2, max_digits=20, validators=[django.core.validators.MinValueValidator(0, 'Avaliação não pode ser inferior a 0')]),
        ),
    ]
