from statistics import mode
from tkinter import CASCADE
from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    pass

class Listing(models.Model):
    title = models.CharField(max_length=64)
    starting_bid = models.IntegerField()
    description = models.CharField(max_length=500)
    #reserved_price = models.IntegerField(blank=True)
    category = models.CharField(max_length=25, blank=True)
    img_link = models.URLField(blank=True,max_length=300)
    creator = models.ForeignKey(User, on_delete=models.CASCADE, related_name="listing_made")

class Bid(models.Model):
    bid = models.IntegerField()   
    bidder = models.ForeignKey(User, on_delete=models.CASCADE, related_name="bid")
    listing = models.ForeignKey(Listing, on_delete=models.CASCADE, related_name="bid")
     

class Comment(models.Model):
    creator = models.ForeignKey(User, on_delete=models.CASCADE, related_name="comment")
    listing = models.ForeignKey(Listing, on_delete=models.CASCADE, related_name="comment")
    comment = models.CharField(max_length=300)