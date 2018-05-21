#!/usr/bin/python

from pyrebase import pyrebase
import time


print ("Hello World!")
print ("Hello Again")

config = {
	"apiKey": "AIzaSyASl36A_6t0BQkhrZ22bu0Gu7v1xWj5jlM",
	"authDomain": "barup-ca0f9.firebaseapp.com",
	"databaseURL": "https://barup-ca0f9.firebaseio.com",
	"storageBucket": "barup-ca0f9.appspot.com"
}

class Bar:
	'Holds the data for a bar as it appears in the database'
	beer = 0
	beerPrice = 0
	billiards = 0
	crowd = "temp"
	darts = 0
	football = 0
	id = 0
	location = "temp"
	name = "temp"
	rating = 0
   

	def __init__(beer, beerPrice, billiards, crowd, darts, football, id, location,name, rating):
		self.beer = beer
		self.beerPrice = beerPrice
		self.billiards = billiards
		self.crowd = crowd
		self.darts = darts
		self.football = football
		self.id = id
		self.location = location
		self.name = name
		self.rating = rating
        
firebase = pyrebase.initialize_app(config)

db = firebase.database()
test = db.child("status_search").child("-LCiGxdHnFR4pMroxKwi").get()

print(test.val())

data = {"name": "The bar with no name","class": "test"}
db.child("results").child("TestBar").set(data)

time.sleep(10)

db.child("results").child("TestBar").remove()
