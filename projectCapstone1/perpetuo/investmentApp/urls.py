from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('portfolio', views.index, name='index'),
    path('getPriceHistory/<str:trading_pair>/<str:time_period>', views.getPriceHistory, name='getPriceHistory'),
    path('getAllCurrencies', views.getAllCurrencies, name='getAllCurrencies')
]