from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse

from .models import Flight, Passenger

# Create your views here.

def index(request):

    return render(request, "flights/index.html",{
        "flights": Flight.objects.all()
    })

def flight(request, flight_id):
    
    if (flight_id > len(Flight.objects.all())):
        return HttpResponseRedirect(reverse("index"))

    flight = Flight.objects.get(pk = flight_id) #'pk' - Private Key
    passengers = flight.passengers.all()
    non_passengers = Passenger.objects.exclude(flights=flight).all()

    return render(request, "flights/flight.html",{
        "flight": flight,
        "passengers": passengers,
        "non_passengers": non_passengers
    })

def book(request, flight_id):

    if request.method == "POST":

        flight = Flight.objects.get(pk = flight_id)

        passenger_id = int(request.POST["passenger"])
        passenger = Passenger.objects.get(id = passenger_id)
        passenger.flights.add(flight)

        return HttpResponseRedirect(reverse("flight", args=[flight.id]))