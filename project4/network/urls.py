
from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),

    # API Paths

    path("all-posts", views.allPosts, name="allPosts"),
    path("save-post", views.savePost, name="savePost"),
    path("like-post/<int:postId>", views.likePost, name="likePost"),
    path("<str:name>/profile", views.profilePage, name="profilePage"),
    path("user/follow", views.followingPosts, name="followingPosts"),


]
#Just add jsonresponse to function a 