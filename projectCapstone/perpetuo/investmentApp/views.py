from email import header
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.shortcuts import render
from django.urls import reverse
from django import forms
from django.views.decorators.csrf import csrf_exempt
import json, time, requests, random

from . import util

# Create your views here.

config = util.readEnv()
now = int(time.time())*1000


key = config['API_KEY']
secret = config['API_SECRET']

url = "https://openapi-sandbox.kucoin.com"

headers = {
        "KC-API-TIMESTAMP": str(now),
        "KC-API-KEY": "62debb9141a5330001d1b0d1",
        "KC-API-PASSPHRASE": util.createPassphrase(config),
        "KC-API-KEY-VERSION": "2",
        "Content-Type": "application/json",
    }


print(config['API_NAME'])


def apiTest(request):

    if request.method == "GET":

        key = config['API_KEY']
        secret = config['API_SECRET']

        url = "https://openapi-sandbox.kucoin.com"
        
        headers = {
            "KC-API-SIGN": util.createSignature(now, 'GET', endpoint, config),
            "KC-API-TIMESTAMP": str(now),
            "KC-API-KEY": key,
            "KC-API-PASSPHRASE": util.createPassphrase(config),
            "KC-API-KEY-VERSION": "2",
            "Content-Type": "application/json",
        }

        response = requests.request('GET', url+"/api/v1/market/allTickers", headers=headers)

    return JsonResponse(response.json())

    

def test():

    endpoint = '/api/v1/orders'
    
    data = {
        "clientOid": "PPTOrder", 
        "side": "buy",
        "symbol": "ETH-USDT",
        "type": "market",
        "funds": "2"
    }
    data_json = json.dumps(data)

    headers["KC-API-SIGN"] = util.createSignature(now, 'POST', endpoint, config, body=data_json)

    # response = requests.request('GET', url+"/api/v1/market/allTickers" )
    response = requests.request('POST', url+"/api/v1/orders", headers=headers, data=data_json)
    print(response.json())

    return response.json()



def index(request):

    return render(request, "html/index.html")

test()