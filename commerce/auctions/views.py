from cProfile import label
import re
from unicodedata import category
from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse
from django import forms
from django.contrib.auth.decorators import login_required

from .models import *

class addCommentForm(forms.Form):
    comment = forms.CharField(label="Comment", max_length=300, widget=forms.Textarea(attrs={'rows': 2, 'cols':100}))

class addListingForm(forms.Form):
    title = forms.CharField(label="Title")
    starting_bid = forms.IntegerField(label="Starting Bid")
    category = forms.CharField(label="Category")
    img_link = forms.URLField(label="Image Link", required=False)
    description = forms.CharField(label="Description", widget=forms.Textarea(attrs={'rows': 4, 'cols':100}))


def index(request):

    listings = Listing.objects.filter(active = True) # Displays only active listings

    return render(request, "auctions/index.html",{
        "listings": listings,
        "page": "Active Listings"
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

@login_required(login_url="login")
def new_listing(request):

    curr_user = request.user

    if request.method == "POST":

        form = addListingForm(request.POST)

        if form.is_valid():

            cleaned_data = form.cleaned_data

            newListing = Listing(title=cleaned_data["title"], starting_bid=cleaned_data["starting_bid"],category=cleaned_data["category"], img_link=cleaned_data["img_link"], description=cleaned_data["description"], creator=curr_user)
            newListing.save()
        
            return HttpResponseRedirect(reverse("index"))

    return render(request, "newListing/index.html", {
        "form": addListingForm,
        "page": "Add New Listing"
    })

def listing_view(request, listing_id):

    list_item = Listing.objects.get(id = listing_id)
    comments = list_item.comment.all()
    curr_user = request.user
    
    highestBid = highest_bid(list_item) # Highest bid is passed into the page on load to allow for client-side check

    
    if request.method == "POST":

        if (curr_user.is_authenticated):

            if ("bid" in request.POST):

                bid_amount = int(request.POST["bid"])

                if (bid_amount > highest_bid(list_item) and bid_amount >= list_item.starting_bid): # Get highest bid again for server-sdie check in case another bid was successful before the client-side is updated.
                                
                    new_bid = Bid(bid=bid_amount, bidder=curr_user, listing=list_item)
                    new_bid.save()


            elif ("addtowatchlist" in request.POST):

                list_item.watchlist.add(curr_user)

            elif ("removefromwatchlist" in request.POST):

                list_item.watchlist.through.objects.filter(user_id = curr_user.id).delete() 

            elif ("closeauction" in request.POST):
            
                list_item.active = False
                list_item.save()
            
            elif ("comment" in request.POST):

                new_comment = Comment(creator=curr_user,listing=list_item,comment=request.POST["comment"])
                new_comment.save()


            return HttpResponseRedirect(reverse("listing", args=[listing_id]))


    return render(request, "listing/index.html",{
        "item": list_item,
        "highest_bid": highestBid,
        "comments": comments,
        "watchlisted": list(list_item.watchlist.filter(id = curr_user.id)),  #Checks if item is watchlisted by current user. 'filter' is used to ensure that error is not thrown if the item is not watchlisted
        "curr_user": curr_user,
        "form": addCommentForm,
        "page": ""
    })

def highest_bid(item):
    try:
        return item.bid.all().order_by("bid").last().bid #Throws an error if no bids are present.
    except:
        return 0

@login_required(login_url="login")
def watchlist(request):

    curr_user = request.user    
    
    watchlist_listings = curr_user.watchlisted.all()

    return render(request, "auctions/index.html",{
        "listings": watchlist_listings,
        "page": "Your Watchlist"
    })

def categories(request):

    # category_listing = Listing.objects.filter(category=category_name)
    categories = set([item.category for item in Listing.objects.all()])

    return render(request, "categories/index.html",{
        "categories": categories,
        "page": "Categories"
    })

def category_listing(request, category_name):

    category_listing = Listing.objects.filter(category=category_name)

    return render(request, "auctions/index.html",{
        "listings": category_listing,
        "page": "Active Listings"
    })