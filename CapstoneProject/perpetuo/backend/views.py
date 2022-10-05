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


# getUserTrades()

def pastHistoricalGrowth(request, symbol="BTC", period="4hour", extent="1Y", dataType="simulated", frequency="weekly"):
    # Get the estimated growth if the same amount was invested at regular intervals over the specified extent
    """
        Periods:  1hour, 2hour, 4hour, 6hour, 8hour, 12hour, 1day, 1week
    """

    symbol = symbol + "-USDT"
    data = []

    if dataType == "simulated":

        # Get candle (klines) data with Kucoin API
        klines = getPriceHistory(symbol, period, extent)["data"] 
        
        currPrice = (float(klines[0][1])+float(klines[0][2]))/2 
        prevDate = datetime.datetime.fromtimestamp(int(klines[0][0]))
        lastDate = datetime.datetime.fromtimestamp(int(klines[-1][0]))
       
        
        for kline in klines:

            if kline[0] == str(int(datetime.datetime.timestamp(prevDate))):
                 # Store the start time and average price of each candle
                data.append({
                    "startTime": datetime.datetime.fromtimestamp(int(kline[0])),
                    "amountInvested": 100,
                    "avgPrice": (float(kline[1])+float(kline[2]))/2
                })
                if frequency == "daily":
                    prevDate = prevDate - datetime.timedelta(days=1)
                elif frequency == "weekly":
                    prevDate = prevDate - datetime.timedelta(days=7)
                elif frequency == "monthly":
                    prevDate = prevDate - datetime.timedelta(weeks=4)

                    

            if str(prevDate) < klines[-1][0]:
                break
    
    """ if dataType == "real":

        tradeDetails = getUserTrades()

        #In order to find growth percentage from userTrades, pass the symbol of interest and ensure that the trade was made from this program
        #Create a list of traded currencies and use a for loop to run the getGrowthPercentage function on each pair then find the average growth for the overall portfolio growth """

    df = pd.DataFrame(data=data)

    return JsonResponse({
            "no_of_cycles": int(len(df)),
            "startDate": datetime.datetime.fromtimestamp(int(klines[-1][0])).strftime("%m/%d/%Y"),
            "endDate": datetime.datetime.fromtimestamp(int(klines[0][0])).strftime("%m/%d/%Y"),
            **utils.getGrowthPercentage(df, currPrice) #Unpacking dictionary passed from function
        })



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
        "symbol": "ETH-USDT",
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
    userTransactions = Transaction.objects.filter(userId=1)
    # userCurrencies = list(set([transaction.symbol for transaction in userTransactions]))
    userHoldings = {}

    for transaction in userTransactions:
        if transaction.amountInvested > 0:
            if not transaction.symbol in userHoldings:
                userHoldings[transaction.symbol] = transaction.amountInvested
            else:
                userHoldings[transaction.symbol] = userHoldings[transaction.symbol] + \
                    transaction.amountInvested

    # Just returning the list of currencies bought for now. I may need to add other values later on

    return JsonResponse({"currencies": userHoldings})


@csrf_exempt
def getUserPreferences(request):
    user = User.objects.get(id=1)
    userPreferences = user.portfolioSplitPreference

    if request.method == "POST":
        userPrefs = json.loads(request.body)
        user.portfolioSplitPreference = userPrefs
        user.save()
        return JsonResponse({"response": "Success"})

    return JsonResponse(userPreferences, safe=False)


def index(request):
    # Log in default user for testing
    user = authenticate(request, username="kamoi", password="Random")

    # Check if authentication successful
    if user is not None:
        login(request, user)

    # makeOrder(request)

    # getUserHoldings(request)

    return render(request, "build/index.html")
