from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from django.contrib.auth.models import AbstractUser

# Create your models here.

# User
# Transaction (Link to user ID to portfolio purchases and preferences)


class User(AbstractUser):
    pass


class Transaction(models.Model):
    userId = models.ForeignKey("User",on_delete=models.CASCADE, related_name="transactions")
    transactionId = models.CharField(primary_key=True, max_length=30)
    amountInvested = models.FloatField(blank=False)
    symbol = models.CharField(max_length=10, blank=False)
    transactionDate = models.IntegerField(blank=False)

class CurrencySplitPref(models.Model):
    userId = models.ManyToManyField("User", blank=False, related_name="userPortfolioPref")
    currency = models.CharField(max_length=6, blank=False)
    percentage = models.PositiveIntegerField(blank=False, validators=[MinValueValidator(1), MaxValueValidator(100)]) 