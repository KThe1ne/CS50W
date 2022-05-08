import re
from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse

from .models import *


def index(request):

    listings = Listing.objects.all()

    return render(request, "auctions/index.html",{
        "listings": listings
    })


def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "auctions/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "auctions/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "auctions/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "auctions/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "auctions/register.html")

def listing_view(request, listing_id):

    list_item = Listing.objects.get(id = listing_id)
    #comments = Comment.objects.filter(listing = )
    comments = list_item.comment.all()
    
    try:
        highest_bid = list_item.bid.all().order_by("bid").last().bid
    except:
        highest_bid = list_item.starting_bid

    
    if request.method == "POST":

        bid_amount = int(request.POST["bid"])



        curr_user = request.user

            
        new_bid = Bid(bid=bid_amount, bidder=curr_user, listing=list_item)
        new_bid.save()

        return render(request, "listing/index.html",{
            "item": list_item,
            "highest_bid": highest_bid,
            "comments": comments
        })


    return render(request, "listing/index.html",{
        "item": list_item,
        "highest_bid": highest_bid,
        "comments": comments
    })