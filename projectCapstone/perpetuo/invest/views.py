from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.shortcuts import render
from django.urls import reverse
from django import forms
from django.views.decorators.csrf import csrf_exempt
import json

class loginForm(forms.Form):

    username = forms.CharField(label="Username: ", max_length=20)
    password = forms.CharField(label="Password: ", widget=forms.PasswordInput)


def index(request):

    return JsonResponse({})

def register(request):

    return render(request, "invest/register.html")

def login_view(request):

    return render(request, "invest/login.html", {
        "loginForm": loginForm
    })

def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))