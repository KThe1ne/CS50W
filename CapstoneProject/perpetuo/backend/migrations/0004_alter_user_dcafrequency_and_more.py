# Generated by Django 4.1.1 on 2022-09-29 14:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0003_delete_currencysplitpref'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='dcaFrequency',
            field=models.JSONField(default=dict),
        ),
        migrations.AlterField(
            model_name='user',
            name='portfolioSplitPreference',
            field=models.JSONField(default=dict),
        ),
    ]