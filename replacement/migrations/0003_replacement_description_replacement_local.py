# Generated by Django 5.1 on 2024-09-24 17:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('replacement', '0002_alter_replacement_value_part'),
    ]

    operations = [
        migrations.AddField(
            model_name='replacement',
            name='description',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='replacement',
            name='local',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]