
from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),

    # API Paths

    path("all-posts", views.allPosts, name="allPosts"),
    path("<str:name>", views.profilePage, name="profilePage"),
    path("<str:name>/followers", views.followersPosts, name="followersPosts"),


]
#Just add jsonresponse to function a 