from django.contrib import admin
from .models import *

val = Bid.__dict__.keys()

class ListingAdmin(admin.ModelAdmin):
    list_display = list(Listing.__dict__.keys())[5:12]

class BidAdmin(admin.ModelAdmin):
    list_display = list(Bid.__dict__.keys())[5:10]

class CommentAdmin(admin.ModelAdmin):
    list_display = list(Comment.__dict__.keys())[5:10]

# Register your models here.
admin.site.register(User)
admin.site.register(Listing, ListingAdmin)
admin.site.register(Bid, BidAdmin)
admin.site.register(Comment, CommentAdmin)