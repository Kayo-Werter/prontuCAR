# Generated by Django 5.1 on 2024-09-20 20:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('replacement', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='replacement',
            name='value_part',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=20),
        ),
    ]