from django.http import HttpResponse
from django.shortcuts import render

# Create your views here.
def index(request):
    return HttpResponse("Hello, world!")

def me(request):
    return HttpResponse("Hello, Kamoi!!!")

def greet(request, name):
    return render(request,"hello/greet.html",{
        "name": name.capitalize()
    })

def hellohtml(request):
    return render(request, "hello/hello.html")