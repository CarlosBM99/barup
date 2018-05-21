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
   

	def __init__(self,beer, beerPrice, billiards, crowd, darts, football, id, location,name, rating):
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
      
   
def binSort(str, dict, keys):
	delList = []
	for index in range(0,len(keys)):
		if dict[keys[index]][str] == 0:
			delList.append(index)
		
	keys2 = keys
	#print(len(delList))
		

	for dIndex in sorted(delList, reverse=True):		
		del dict[keys2[dIndex]]
		keys.remove(keys2[dIndex])
	

   
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
#print(all_bar)


if sortInfo["it"]["badgets"]["billiards"] == 1:
	binSort("darts",all_bar,keys)
if sortInfo["it"]["badgets"]["darts"] == 1:
	binSort("darts",all_bar,keys)
if sortInfo["it"]["badgets"]["table_football"] == 1:
	binSort("football",all_bar,keys)

#need to get key from input

###SECTION 2:get the database in a list of objects for sorting###


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
	

###SECTION 3:sort with gradient criteria, mergesort in parallel ###	

###SECTION 4:upload to result and tick off the confirmation flag ###
resDict = dict()

for index in range(0, len(keys)):
	resDict[keys[index]] = {"beer": bList[index].beer,"beerPrice": bList[index].beerPrice,
							"billiards": bList[index].billiards,"crowd": bList[index].crowd,
							"darts": bList[index].darts,"football": bList[index].football,
							"id": bList[index].id,"location": bList[index].location,
							"name": bList[index].name,"rating": bList[index].rating}
							
db.child("results").child("-LCiGxdHnFR4pMroxKwi").set(resDict)#change later o key

time.sleep(10)

db.child("results").child("-LCiGxdHnFR4pMroxKwi").remove()#change later to key