from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("addlisting", views.new_listing, name="newListing"),
    path("listing/<int:listing_id>", views.listing_view, name="listing"),
    path("my-watchlist",views.watchlist, name="watchlist"),
    path("category",views.categories, name="categories"),
    path("category/<str:category_name>",views.category_listing, name="categoryListing"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register")
]
