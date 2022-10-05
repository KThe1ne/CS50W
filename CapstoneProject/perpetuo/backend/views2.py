from django.shortcuts import render
from django.core import serializers

# Create your views here.
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.shortcuts import render
from django.urls import reverse
from django import forms
from django.views.decorators.csrf import csrf_exempt

import json
import time
import requests
import random
import datetime

import pandas as pd

from .models import User, Transaction  # Used for testing

from . import utils

# Create your views here.

config = utils.readEnv()
now = int(time.time())*1000


key = config['API_KEY']
secret = config['API_SECRET']

url = "https://openapi-sandbox.kucoin.com"

headers = {
    "KC-API-TIMESTAMP": str(now),
    "KC-API-KEY": "62debb9141a5330001d1b0d1",
    "KC-API-PASSPHRASE": utils.createPassphrase(config),
    "KC-API-KEY-VERSION": "2",
    "Content-Type": "application/json",
}


def getPriceHistory(trading_pair, period, extent):

    currTime = datetime.datetime.today()

    match extent:

        case "1D":
            startAt = currTime - datetime.timedelta(days=1)
        case "1W":
            startAt = currTime - datetime.timedelta(weeks=1)
        case "1M":
            startAt = currTime - datetime.timedelta(weeks=4)
        case "1Y":
            startAt = currTime - datetime.timedelta(weeks=52)
        case _:
            # Default to 1M
            startAt = currTime - datetime.timedelta(weeks=4)

    startAt = int(datetime.datetime.timestamp(startAt))
    currTime = int(datetime.datetime.timestamp(currTime))

    endpoint = "/api/v1/market/candles?type={}&symbol={}&startAt={}&endAt={}".format(
        period, trading_pair, startAt, currTime)

    headers["KC-API-SIGN"] = utils.createSignature(
        now, 'GET', endpoint, config)

    response = requests.request('GET', url+endpoint, headers=headers)

    # print(response.json())

    return response.json()


def priceHistory(request, trading_pair, period, extent="1M"):

    # Return JSON response containing candle data.

    if request.method == "GET":

        response = getPriceHistory(trading_pair, period, extent="1M")

    return JsonResponse(response)


def getUserTrades():

    currPage=1
    fills = []

    while (True):
        endpoint = f"/api/v1/fills?currentPage={currPage}"

        headers["KC-API-SIGN"] = utils.createSignature(
            now, 'GET', endpoint, config)

        response = requests.request('GET', url+endpoint, headers=headers)
        response = response.json()["data"]
        fills.extend(response["items"])

        if currPage >= response["totalPage"]:
            break

        if response["items"] == []:
            break

        currPage +=1   

    return fills





def getGrowthPercentage(purchaseDetails, currPrice):

    purchaseDetails["units"] = purchaseDetails["amountInvested"]/purchaseDetails["avgPrice"]
    withdraws = purchaseDetails.loc[purchaseDetails["amountInvested"] < 0]
    purchases = purchaseDetails.loc[purchaseDetails["amountInvested"] > 0]
    sum_of_purchased_units = purchases["units"].sum()
    sum_of_sold_units = withdraws["units"].sum()
    if sum_of_purchased_units > 0:
        avg_buy_price = ((purchases["units"]*purchases["avgPrice"]).sum()/sum_of_purchased_units)
        curr_val_purchases = (purchases["amountInvested"].sum()/avg_buy_price)
    if sum_of_sold_units < 0:
        avg_sell_price = ((withdraws["units"]*withdraws["avgPrice"]).sum()/sum_of_sold_units)
        curr_val_withdraws = (withdraws["amountInvested"].sum()/avg_sell_price) * -1
    else:
        curr_val_withdraws = 0
    curr_val = currPrice*(curr_val_purchases-curr_val_withdraws)
    growth = (curr_val-(purchases["amountInvested"].sum()+withdraws["amountInvested"].sum()))/(purchases["amountInvested"].sum())*100
    print("Growth %: ", growth)
    return growth

def pastHistoricalGrowth(symbol="BTC-USDT", period="4hour", extent="1Y", dataType="simulated", frequency="weekly"):
    # Get the estimated growth if the same amount was invested at regular intervals over the specified extent

    data = []
    if dataType == "simulated":

        # Get candle (klines) data with Kucoin API
        klines = getPriceHistory(symbol, period, extent)["data"] 
        
        currPrice = (float(klines[0][1])+float(klines[0][2]))/2 
        prevDate = datetime.datetime.fromtimestamp(int(klines[0][0]))
        lastDate = prevDate - datetime.timedelta(weeks=52)
        
        for kline in klines:

            if kline[0] == str(int(datetime.datetime.timestamp(prevDate))):
                 # Store the start time and average price of each candle
                data.append({
                    "startTime": datetime.datetime.fromtimestamp(int(kline[0])),
                    "amountInvested": 100,
                    "avgPrice": (float(kline[1])+float(kline[2]))/2
                })
                prevDate = prevDate - datetime.timedelta(days=7)

            if str(prevDate) < klines[-1][0] or prevDate < lastDate:
                break
    
    """ if dataType == "real":

        tradeDetails = getUserTrades()

        #In order to find growth percentage from userTrades, pass the symbol of interest and ensure that the trade was made from this program
        #Create a list of traded currencies and use a for loop to run the getGrowthPercentage function on each pair then find the average growth for the overall portfolio growth """

    df = pd.DataFrame(data=data)

    return JsonResponse({
            "growth": getGrowthPercentage(df, currPrice)
        })
        

pastHistoricalGrowth()
             


def index(request):
    # Log in default user for testing
    user = authenticate(request, username="kamoi", password="Random")

    # Check if authentication successful
    if user is not None:
        login(request, user)

    # makeOrder(request)

    # getUserHoldings(request)

    return render(request, "build/index.html")
