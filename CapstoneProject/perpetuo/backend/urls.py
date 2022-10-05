from django.urls import path
""
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('portfolio', views.index, name='index'),
    path('getAllCurrencies', views.getAllCurrencies, name='getAllCurrencies'),
    path('getUserPreferences', views.getUserPreferences, name='getUserPreference'),
    path('pastHistoricalGrowth/<str:symbol>/<str:period>/<str:extent>/<str:frequency>', views.pastHistoricalGrowth, name='pastHistoricalGrowth'),
]