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

from .models import User, Transaction, CurrencySplitPref  # Used for testing

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

    totalInvestment = sum([purchaseDetail[0]
                          for purchaseDetail in purchaseDetails])
    print(totalInvestment)
    growth = sum([(purchaseDetail[0]/totalInvestment)*((currPrice-purchaseDetail[1]
                                                        )/purchaseDetail[1]) for purchaseDetail in purchaseDetails])*100
    print(growth)


def pastHistoricalGrowth(symbol, period, extent="1Y"):
    # Get the estimated growth if the same amount was invested at regular intervals over the specified extent

    currPrice = 800

    data = []
    klines = getPriceHistory("BTC-USDT", "4hour", extent)["data"]
    data = [{
        "startTime": kline[0],
        "avgPrice": (float(kline[1])+float(kline[2]))/2
    }
        for kline in klines]
    df = pd.DataFrame(data=data)

    prevDate = datetime.datetime.fromtimestamp(int(df["startTime"][0]))

    purchasePrices = []
    lastDate = prevDate - datetime.timedelta(weeks=4)

    while (prevDate >= lastDate):
        purchasePrice = df["avgPrice"].loc[df["startTime"]
                                           == str(int(datetime.datetime.timestamp(prevDate)))]
        prevDate = prevDate - datetime.timedelta(days=1)
        try:
            purchasePrices.append([100, float(purchasePrice.values[0])])
        except:
            pass

    getGrowthPercentage(purchasePrices, currPrice)


# pastHistoricalGrowth()


def getPriceHistoryTest():

    month_in_sec = 30*24*60*60
    curr_time = int(now/1000)
    last_month = curr_time - month_in_sec

    endpoint = "/api/v1/market/candles?type=4hour&symbol=BTC-USDT&startAt={}&endAt={}".format(
        last_month, curr_time)

    headers["KC-API-SIGN"] = utils.createSignature(
        now, 'GET', endpoint, config)

    response = requests.request('GET', url+endpoint, headers=headers)

    print("test")

    """
    candledetails = ["startTime","openingPrice","closingPrice"]
    candles = []
    # print(response.json())
    df = pd.read_json(response.text)
    # df = df["data"].map
    df["data"].map(lambda x: candles.append([x[0],x[1], x[2]]))
    print(candles)
    df1 = pd.DataFrame(candles, columns=candledetails)
    # df["data"].map(lambda x: print(pd.DataFrame([{"startTime": x[0], "openingPrice": x[1], "closingPrice": x[2]}])))
    print(df1.head())
    df1.to_excel("historicaldata.xlsx")
    # print(df.head())
    """


# getPriceHistoryTest()
def getOrderDetails(orderID):
    # Obtain order details given order ID

    endpoint = "/api/v1/orders/" + orderID

    headers["KC-API-SIGN"] = utils.createSignature(
        now, 'GET', endpoint, config)

    response = requests.request('GET', url+endpoint, headers=headers)

    print(response.json())

    return response.json()

@login_required
def makeOrder(request):

    endpoint = '/api/v1/orders'

    data = {
        "clientOid": "PPTOrder",
        "side": "buy",
        "symbol": "KCS-USDT",
        "type": "market",
        "funds": "2"
    }
    data_json = json.dumps(data)

    headers["KC-API-SIGN"] = utils.createSignature(
        now, 'POST', endpoint, config, body=data_json)

    response = requests.request(
        'POST', url+"/api/v1/orders", headers=headers, data=data_json)
    print(response.json())
    response = response.json()

    orderID = response["data"]["orderId"]

    # Get order details in order to store in database
    orderDetails = getOrderDetails(orderID)

    Transaction(userId=request.user,
                transactionId=orderDetails["data"]["id"],
                symbol=orderDetails["data"]["symbol"].split("-")[0],
                amountInvested=float(orderDetails["data"]["dealFunds"]),
                transactionDate=int(orderDetails["data"]["createdAt"])).save()

    return response

# makeOrder()
# getUserTrades()


def getAllCurrencies(request):

    endpoint = "/api/v1/market/allTickers"
    response = requests.request('GET', url+endpoint)
    response = response.json()
    # Get currency icon from coinmarketcap API - https://coinmarketcap.com/api/documentation/v1/#operation/getV1CryptocurrencyInfo
    symbols = [pair["symbol"]
               for pair in response["data"]["ticker"] if "USD" in pair["symbol"]]

    return JsonResponse({"symbols": symbols})

def getUserHoldings(request):

    user = request.user.id
    # userTransactions = Transaction.objects.filter(userId = request.user.id)
    userTransactions = Transaction.objects.filter(userId = 1)
    # userCurrencies = list(set([transaction.symbol for transaction in userTransactions]))
    userHoldings = {}

    for transaction in userTransactions:
        if transaction.amountInvested > 0:
            if not transaction.symbol in userHoldings:
                userHoldings[transaction.symbol] = transaction.amountInvested
            else:
                userHoldings[transaction.symbol] = userHoldings[transaction.symbol] + transaction.amountInvested
    
    #Just returning the list of currencies bought for now. I may need to add other values later on  
    
    return JsonResponse({"currencies": userHoldings})

@csrf_exempt
def getUserPreferences(request):
    userPreferences = CurrencySplitPref.objects.filter(userId = 1)
    
    if request.method == "POST":
        test = request.body
        test1 = json.loads(request.body.decode('utf-8'))
        userPrefs = json.loads(request.body)
        userPreferences.delete()
        for userPref in userPrefs:
            check = userPref
            CurrencySplitPref(
                userId = User.objects.get(id = 1),
                currency = userPref["currency"],
                percentage = userPref["percentage"],
            ).save()
            
    
    return JsonResponse([userPreference.serialize() for userPreference in userPreferences], safe=False)


def index(request):
    #Log in default user for testing
    user = authenticate(request, username="kamoi", password="Random")

    # Check if authentication successful
    if user is not None:
        login(request, user)
    
    makeOrder(request)

    getUserHoldings(request)

    return render(request, "build/index.html")

