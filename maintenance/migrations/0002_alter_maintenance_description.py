# Generated by Django 5.1 on 2024-08-19 20:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('maintenance', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='maintenance',
            name='description',
            field=models.TextField(blank=True, null=True),
        ),
    ]
