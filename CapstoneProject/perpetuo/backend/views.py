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

    curr_time = datetime.datetime.today()

    match extent:

        case "1D":
            startAt = curr_time - datetime.timedelta(days=1)
        case "1W":
            startAt = curr_time - datetime.timedelta(weeks=1)
        case "1M":
            startAt = curr_time - datetime.timedelta(weeks=4)
        case "1Y":
            startAt = curr_time - datetime.timedelta(weeks=52)
        case _:
            # Default to 1M
            startAt = curr_time - datetime.timedelta(weeks=4)

    startAt = int(datetime.datetime.timestamp(startAt))
    curr_time = int(datetime.datetime.timestamp(curr_time))

    endpoint = "/api/v1/market/candles?type={}&symbol={}&startAt={}&endAt={}".format(
        period, trading_pair, startAt, curr_time)

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
    """  # endpoint = "/api/v1/orders?tradeType=TRADE&startAt=0000000000000&pageSize=500"
     # endpoint = "/api/v1/fills?startAt=0000000000000"
     endpoint = "/api/v1/fills"

     headers["KC-API-SIGN"] = utils.createSignature(
         now, 'GET', endpoint, config)

     response = requests.request('GET', url+endpoint, headers=headers)

     print(response.json()) """


# getUserTrades()


def getGrowthPercentage(purchaseDetails, currPrice):

    # totalInvestment = sum([purchaseDetail[0]
    #                       for purchaseDetail in purchaseDetails])
    # print(totalInvestment)
    # growth = sum([(purchaseDetail[0]/totalInvestment)*((currPrice-purchaseDetail[1]
    #                                                     )/purchaseDetail[1]) for purchaseDetail in purchaseDetails])*100
    # print(growth)
    purchaseDetails = pd.read_excel("./test1.xlsx")
    purchaseDetails["units"] = purchaseDetails[0]/purchaseDetails[1]
    withdraws = purchaseDetails.loc[purchaseDetails[0] < 0]
    purchases = purchaseDetails.loc[purchaseDetails[0] > 0]
    sum_of_purchased_units = purchases["units"].sum()
    sum_of_sold_units = withdraws["units"].sum()
    if sum_of_purchased_units > 0:
        avg_buy_price = ((purchases["units"]*purchases[1]).sum()/sum_of_purchased_units)
        curr_val_purchases = (purchases[0].sum()/avg_buy_price)
    if sum_of_sold_units < 0:
        avg_sell_price = ((withdraws["units"]*withdraws[1]).sum()/sum_of_sold_units)
        curr_val_withdraws = (withdraws[0].sum()/avg_sell_price) * -1
    else:
        curr_val_withdraws = 0
    curr_val = currPrice*(curr_val_purchases-curr_val_withdraws)
    growth = (curr_val-(purchases[0].sum()+withdraws[0].sum()))/(purchases[0].sum())*100
    print("Growth %: ", growth)

def pastHistoricalGrowth(symbol="BTC-USDT", period="4hour", extent="1Y", investmentCycle=""):
    # Get the estimated growth if the same amount was invested at regular intervals over the specified extent

    currPrice = 20079

    data = []
    klines = getPriceHistory(symbol, period, extent)["data"] 
    data = [{
        "startTime": kline[0],
        "avgPrice": (float(kline[1])+float(kline[2]))/2
    }
        for kline in klines]
    df = pd.DataFrame(data=data)
    df.to_excel("./test.xlsx")

    prevDate = datetime.datetime.fromtimestamp(int(df["startTime"][0]))

    purchasePrices = []
    lastDate = prevDate - datetime.timedelta(weeks=52)

    while (prevDate >= lastDate):
        purchasePrice = df["avgPrice"].loc[df["startTime"]
                                           == str(int(datetime.datetime.timestamp(prevDate)))]
        prevDate = prevDate - datetime.timedelta(days=7)
        try:
            purchasePrices.append([100, float(purchasePrice.values[0])])
        except:
            pass

    dftest = pd.DataFrame(data=purchasePrices)
    # dftest.to_excel("./test1.xlsx")
    getGrowthPercentage(dftest, currPrice)


pastHistoricalGrowth(investmentCycle="weekly")
             


def index(request):
    # Log in default user for testing
    user = authenticate(request, username="kamoi", password="Random")

    # Check if authentication successful
    if user is not None:
        login(request, user)

    # makeOrder(request)

    # getUserHoldings(request)

    return render(request, "build/index.html")
