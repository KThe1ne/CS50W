from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.shortcuts import render
from django.urls import reverse
from django import forms
from django.views.decorators.csrf import csrf_exempt
import json

from .models import User, Post

class newPostForm(forms.Form):
    newPost = forms.CharField(label="", widget=forms.Textarea(attrs={'class': 'newPost', 'cols': 80, 'rows': 5}))

@csrf_exempt
def index(request):

    currUser = request.user

    if currUser.is_authenticated:
    
        return render(request, "network/index.html",{
            "postForm": newPostForm
        })

    else: 

        return render(request, "network/index.html")

@csrf_exempt
@login_required
def savePost(request):

    currUser = request.user

    data = json.loads(request.body)
     
    postContent = data.get("content", "")
    postType = data.get("type", "")
    postId = data.get("postId", "")

    if postType == "new":

        post = Post(
                    user = currUser,
                    content = postContent,
                )   

    if postType == "edit":

        post = Post.objects.get(id = postId)
        post.content = postContent
        post.save()

    return JsonResponse({"message": "Posted successfully."}, status=201)


def allPosts(request):
                          
    posts = list(Post.objects.all())
    posts.reverse()
    
    return JsonResponse({"allPosts":[post.serialize() for post in posts], "user": request.user.serialize()}, safe=False)


def profilePage(request, name):

    profile = User.objects.get(username = name)

    return JsonResponse(profile.serialize())

def flatten(arr):
    
    return [ele for arr1 in arr for ele in arr1]


@login_required
def followingPosts(request):

    profile = User.objects.get(id = request.user.id)
    followers = profile.userFollows.all()
    followersPosts = [(Post.objects.filter(user = follower)) for follower in followers]

    followersPosts = flatten(followersPosts)

    return JsonResponse({"followingPosts": [post.serialize() for post in followersPosts], "user": request.user.serialize()}, safe=False)

@csrf_exempt
@login_required
def likePost(request, postId): 

    currUser = request.user
    post = Post.objects.get(id = postId)
    
    if (currUser in post.likes.all()):

        post.likes.remove(currUser)

    else:

        post.likes.add(currUser)

    test = post.serialize()


    return JsonResponse(post.serialize(), safe=False)
    

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
