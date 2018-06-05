from pyrebase import pyrebase
import random
import json
#uploads a random sample to the database as a separate child, mainly for testing

file = open('BarData.JSON')
 
data = json.loads(file.read())

config = {
	"apiKey": "AIzaSyASl36A_6t0BQkhrZ22bu0Gu7v1xWj5jlM",
	"authDomain": "barup-ca0f9.firebaseapp.com",
	"databaseURL": "https://barup-ca0f9.firebaseio.com",
	"storageBucket": "barup-ca0f9.appspot.com"
}


sample = {}

for j in range(0, 20):

	index = random.randint(0,7399)
	sample[data[j]['id']] = data[j];


firebase = pyrebase.initialize_app(config)

db = firebase.database()

db.child("sample_bars").update(sample)

print(data)
