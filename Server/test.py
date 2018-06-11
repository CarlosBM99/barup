from random import randint
import os
from pyrebase import pyrebase



config = {
	"apiKey": "AIzaSyASl36A_6t0BQkhrZ22bu0Gu7v1xWj5jlM",
	"authDomain": "barup-ca0f9.firebaseapp.com",
	"databaseURL": "https://barup-ca0f9.firebaseio.com",
	"storageBucket": "barup-ca0f9.appspot.com"
}

firebase = pyrebase.initialize_app(config)

db = firebase.database()

size = 1
data = {}

for i in range(size):
	data[i] = {}
	data[i]["id"] = i
	data[i]["it"] = {}

	data[i]["it"]["atmosphere"] = {}
	data[i]["it"]["atmosphere"]["familiar"] = randint(0,1)
	data[i]["it"]["atmosphere"]["luxurious"] = randint(0,1)
	data[i]["it"]["atmosphere"]["sport"] = randint(0,1)
	data[i]["it"]["atmosphere"]["youthful"] = randint(0,1)

	data[i]["it"]["badgets"] = {}
	data[i]["it"]["badgets"]["billards"] = randint(0,1)
	data[i]["it"]["badgets"]["darts"] = randint(0,1)
	data[i]["it"]["badgets"]["table_football"] = randint(0,1)
	
	data[i]["it"]["location"] = {}
	data[i]["it"]["location"]["latitude"] = 28.9898988
	data[i]["it"]["location"]["longitude"] = 74.5656565

	data[i]["it"]["order"] = {}
	data[i]["it"]["order"]["beer_price"] = randint(0,1)
	data[i]["it"]["order"]["crowdness"] = randint(0,1)
	data[i]["it"]["order"]["rating"] = randint(0,1)
	
	data[i]["state"] = 1
	
	


print(data)

dummy = {}
dummy["dummy"] = "dummy"
db.child("results").child("test").child("search").push(data)
#db.child("test").set(data)

#CREATE TEST INSIDE RESULTS
# MODIFY SORT TO ADD INSIDE TEST WITH KEY
#this inside sort
# empty= {}
#db.child("results").child("test").child(key).
string = "python3 testSort.py "
for j in range(size):
	
	name = string + str(j)
	print(name)
	os.system(name)

# sleep just in case



#

#db.child("test").remove()
