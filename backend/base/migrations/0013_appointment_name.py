# Generated by Django 3.2.6 on 2022-03-11 07:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0012_auto_20220311_1208'),
    ]

    operations = [
        migrations.AddField(
            model_name='appointment',
            name='name',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
    ]
