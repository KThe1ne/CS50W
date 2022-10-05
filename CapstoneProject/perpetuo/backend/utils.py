import os
import time
import base64
import hmac, hashlib

from dotenv import dotenv_values, find_dotenv



def readEnv():
    
    config = dotenv_values(os.path.dirname(os.path.abspath(__file__)) + "\static\login\.env")

    return config

def createSignature(time, requestMethod, endpoint, config, body= ''):

    """ Use API-Secret to encrypt the prehash string {timestamp+method+endpoint+body} with sha256 HMAC. The request body is a JSON string and need to be the same with the parameters passed by the API.
    After that, use base64-encode to encrypt the result in step 1 again. """

    str_to_sign = str(time) + requestMethod.upper() + endpoint + body
    signature = base64.b64encode(
            hmac.new(config['API_SECRET'].encode('utf-8'),str_to_sign.encode('utf-8'), hashlib.sha256).digest())

    return signature

def createPassphrase(config):

    # Documentation
    """ For API key-V2.0, please Specify KC-API-KEY-VERSION as 2 --> Encrypt passphrase with HMAC-sha256 via API-Secret --> Encode contents by base64 before you pass the request." """

    passphrase = base64.b64encode(hmac.new(config['API_SECRET'].encode('utf-8'), config['API_PASSPHRASE'].encode('utf-8'), hashlib.sha256).digest())

    return passphrase

def getGrowthPercentage(tradeDetails, currPrice):

    tradeDetails["units"] = tradeDetails["amountInvested"]/tradeDetails["avgPrice"]
    withdraws = tradeDetails.loc[tradeDetails["amountInvested"] < 0]
    purchases = tradeDetails.loc[tradeDetails["amountInvested"] > 0]
    total_invested = purchases["amountInvested"].sum()
    sum_of_purchased_units = purchases["units"].sum()
    sum_of_sold_units = withdraws["units"].sum()
    if sum_of_purchased_units > 0:
        avg_buy_price = ((purchases["units"]*purchases["avgPrice"]).sum()/sum_of_purchased_units)
        curr_val_purchases = (total_invested/avg_buy_price)
    if sum_of_sold_units < 0:
        avg_sell_price = ((withdraws["units"]*withdraws["avgPrice"]).sum()/sum_of_sold_units)
        curr_val_withdraws = (withdraws["amountInvested"].sum()/avg_sell_price) * -1
    else:
        curr_val_withdraws = 0
    curr_val = currPrice*(curr_val_purchases-curr_val_withdraws)
    growth = (curr_val-(total_invested+withdraws["amountInvested"].sum()))/(total_invested)*100
    return {
        #Parse to float from numpy data type since numpy data types are not Json serializable
        "growth": float(growth), 
        "total_invested": float(total_invested) 
        }
