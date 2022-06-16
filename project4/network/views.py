from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.shortcuts import render
from django.urls import reverse
from django import forms

from .models import User, Post

class newPostForm(forms.Form):
    newPost = forms.CharField(label="", widget=forms.Textarea(attrs={'class': 'newPost', 'cols': 80, 'rows': 5}))


def index(request):

    currUser = request.user

    if request.method == 'POST':
        
        if ("newPost" in request.POST):

            if (currUser.is_authenticated):

                form = newPostForm(request.POST)

                if (form.is_valid()):

                    post = Post(
                        user = currUser,
                        content = form.cleaned_data["newPost"],
                        )
                    post.save()
    
    """ posts = list(Post.objects.all())
    posts.reverse()
    test = [post.serialize() for post in posts] """
    
    return render(request, "network/index.html",{
        "postForm": newPostForm
    })

def allPosts(request):
                          
    posts = list(Post.objects.all())
    posts.reverse()
    test = [post.serialize() for post in posts]
    
    return JsonResponse({"allPosts":[post.serialize() for post in posts], "user": request.user.serialize()}, safe=False)


def profilePage(request, name):

    profile = User.objects.get(username = name)

    return JsonResponse(profile.serialize())

def flatten(arr):
    
    return [ele for arr1 in arr for ele in arr1]


@login_required
def followingPosts(request):

    test = request.user
    profile = User.objects.get(id = request.user.id)
    followers = profile.userFollows.all()
    followersPosts = [(Post.objects.filter(user = follower)) for follower in followers]

    followersPosts = flatten(followersPosts)

    return JsonResponse({"followingPosts": [post.serialize() for post in followersPosts], "user": request.user.serialize()}, safe=False)


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
            return render(request, "network/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "network/login.html")


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
            return render(request, "network/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "network/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "network/register.html")
