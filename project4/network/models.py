from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    # userFollowers = models.ManyToManyField('self', blank=True, related_name="follows", symmetrical=False)
    userFollows = models.ManyToManyField('self', blank=True, related_name="followers",symmetrical=False)

class Post(models.Model):

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="posts")
    content = models.CharField(max_length=280)
    likes = models.ManyToManyField(User, blank=True, related_name="likedPosts")
    timestamp = models.DateTimeField(auto_now_add=True)
