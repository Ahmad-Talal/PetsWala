# Generated by Django 3.2.6 on 2022-04-20 06:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0014_appointment_status'),
    ]

    operations = [
        migrations.AddField(
            model_name='vet',
            name='fee',
            field=models.IntegerField(blank=True, default=0, null=True),
        ),
        migrations.AddField(
            model_name='vet',
            name='title',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
    ]
