from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"), # "" represents the default route since nothing is appended to the main url
    path("me",views.me, name="me"),
    path("<str:name>",views.greet, name="greet"),
    path("hellohtml", views.hellohtml, name="htmlhello")
    
]