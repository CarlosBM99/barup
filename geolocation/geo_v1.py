import googlemaps
import json

gmaps = googlemaps.Client(key='AIzaSyAWOG03GylQLc2J8fKA_v5rVjRW1KlRPU8')

with open('barData.json') as f:
    data = json.load(f)

for i in range (1,21):
	latitude = data["bars"][i]["latitude"]
	longitude = data["bars"][i]["longitude"]

	full_data = gmaps.reverse_geocode((latitude, longitude))
	place = full_data[0]
	address = place['formatted_address']
	street = place['address_components'][1]['long_name']

	data["bars"][i]["address"] = address
	print(address)
	print(street)

	with open("data.json",'w') as outfile:
		json.dump(data,outfile)