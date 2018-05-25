from pyrebase import pyrebase
import time


config = {
	"apiKey": "AIzaSyASl36A_6t0BQkhrZ22bu0Gu7v1xWj5jlM",
	"authDomain": "barup-ca0f9.firebaseapp.com",
	"databaseURL": "https://barup-ca0f9.firebaseio.com",
	"storageBucket": "barup-ca0f9.appspot.com"
}

class Bar:
	'Holds the data for a bar as it appears in the database'
	Day_1_Evening = 0.0
	Day_1_Late_Night = 0.0
	Day_1_Midday = 0.0
	Day_1_Morning = 0.0
	atmosphere = 0
	beerPrice = 0.0
	billiards = 0
	coffeePrice = 0.0
	darts = 0
	football = 0
	id = 0
	latitude = 0.0
	longitude = 0.0
	rating = 0
	sodaPrice = 0.0
   

	def __init__(self,Day_1_Evening, Day_1_Late_Night, Day_1_Midday, Day_1_Morning,
				atmosphere, beerPrice, billiards, coffeePrice,
				darts, football, id, latitude, longitude, rating, sodaPrice):
				
		self.Day_1_Evening = Day_1_Evening
		self.Day_1_Late_Night = Day_1_Late_Night
		self.Day_1_Middays = Day_1_Midday
		self.Day_1_Morning = Day_1_Morning
		self.atmosphere = atmosphere
		self.beerPrice = beerPrice
		self.billiards = billiards
		self.coffeePrice = coffeePrice
		self.darts = darts
		self.football = football
		self.id = id
		self.latitude = latitude
		self.longitude = longitude
		self.rating = rating
		self.sodaPrice = sodaPrice
      
   
def badgeFilter(str, bars):

	for index in sorted(range(1,len(bars)),reverse=True):
		if bars[index][str] == 0:
			del bars[index]
	#print(bars)
			
def styleFilter(str, bars):
	if str == "youthful":
		cmp = 2
	elif str == "luxurious":
		cmp	= 3
	elif str == "sport":
		cmp	= 4
	elif str == "familiar":
		cmp = 1
		
	for index in sorted(range(1,len(bars)),reverse=True):
		if bars[index]["atmosphere"] != cmp:
			del bars[index]
   
firebase = pyrebase.initialize_app(config)

db = firebase.database()
#test = db.child("status_search").child("-LCiGxdHnFR4pMroxKwi").get()

#print(test.val())

#data = {"name": "The bar with no name","class": "test"}
#db.child("results").child("TestBar").set(data)

#time.sleep(10)

#db.child("results").child("TestBar").remove()

#print(db.child("bars").get().val())

###SECTION 1:sort with binary criteria badges and style ###

all_bar = db.child("bars").get().val()
keys = list(all_bar)

sortInfo = db.child("status_search").child("-LCiGxdHnFR4pMroxKwi").get().val()#child(id gotten from app)

#print(all_bar[1]["id"])


if sortInfo["it"]["badgets"]["billiards"] == 1:
	badgeFilter("billiards",all_bar)
if sortInfo["it"]["badgets"]["darts"] == 1:
	badgeFilter("darts",all_bar)
if sortInfo["it"]["badgets"]["table_football"] == 1:
	badgeFilter("football",all_bar)
#crowdedness
	
if sortInfo["it"]["style"]["familiar"] == 1:
	styleFilter("familiar",all_bar)
elif sortInfo["it"]["style"]["youthful"] == 1:
	styleFilter("youthful",all_bar)
elif sortInfo["it"]["style"]["luxurious"] == 1:
	styleFilter("luxurious",all_bar)
elif sortInfo["it"]["style"]["sport"] == 1:
	styleFilter("sport",all_bar)
print(all_bar)

#need to get key from input
'''
###SECTION 2:get the database in a list of objects for sorting### perhaps not needed


#print(all_bar[keys[0]]["beer"])

bList = []

for id in range(0, len(keys)):
    
	bList.append(Bar(all_bar[keys[id]]["beer"],all_bar[keys[id]]["beerPrice"],
					all_bar[keys[id]]["billiards"],all_bar[keys[id]]["crowd"],
					all_bar[keys[id]]["darts"],all_bar[keys[id]]["football"],
					all_bar[keys[id]]["id"],all_bar[keys[id]]["location"],
					all_bar[keys[id]]["name"],all_bar[keys[id]]["rating"],))
	
for test in bList:
	print(test.beer)
	
'''
###SECTION 3:sort with gradient criteria, mergesort in parallel ###	prices, rating, crowdedness
'''
###SECTION 4:upload to result and tick off the confirmation flag ###
resDict = dict()

for index in range(0, len(keys)):
	resDict[keys[index]] = {"beer": bList[index].beer,"beerPrice": bList[index].beerPrice,
							"billiards": bList[index].billiards,"crowd": bList[index].crowd,
							"darts": bList[index].darts,"football": bList[index].football,
							"id": bList[index].id,"location": bList[index].location,
							"name": bList[index].name,"rating": bList[index].rating}
'''							
db.child("results").child("-LCiGxdHnFR4pMroxKwi").set(all_bar)#change later to key

time.sleep(10)

db.child("results").child("-LCiGxdHnFR4pMroxKwi").remove()#change later to key