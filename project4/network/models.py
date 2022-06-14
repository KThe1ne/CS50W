from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    # userFollowers = models.ManyToManyField('self', blank=True, related_name="follows", symmetrical=False)
    userFollows = models.ManyToManyField('self', blank=True, related_name="followers",symmetrical=False)

    def serialize(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "userFollows": [user.id for user in self.userFollows.all()]
        }

class Post(models.Model):

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="posts")
    content = models.CharField(max_length=280)
    likes = models.ManyToManyField(User, blank=True, related_name="likedPosts")
    timestamp = models.DateTimeField(auto_now_add=True)

    def serialize(self):
        return {
            "id": self.id,
            "creator": [self.user.username, self.user.id],
            "content": self.content,
            "likes": [user.id for user in self.likes.all()],
            "timestamp": self.timestamp.strftime("%a %b %d %Y, %I:%M %p"),
        }