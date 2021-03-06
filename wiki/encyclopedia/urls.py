from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("wiki/<str:entry>",views.wiki, name="wiki"),
    path("search/",views.search, name="search"),
    path("newentry",views.newEntry, name="newentry"),
    path("editpage/<str:entry>", views.editPage, name="editPage"),
    path("random", views.randomEntry, name="randomEntry")
]
