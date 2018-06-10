from pyrebase import pyrebase
import time
import os, sys
import math, random
from multiprocessing import Process, Manager, cpu_count


config = {
	"apiKey": "AIzaSyASl36A_6t0BQkhrZ22bu0Gu7v1xWj5jlM",
	"authDomain": "barup-ca0f9.firebaseapp.com",
	"databaseURL": "https://barup-ca0f9.firebaseio.com",
	"storageBucket": "barup-ca0f9.appspot.com"
}


   
def badgeFilter(str, bars):

	for index in sorted(range(0,len(bars)),reverse=True):
		if bars[index][str] == 0:
			del bars[index]
	#print(bars)
			
def styleFilter(cmp, bars):
	'''
	for index in sorted(range(0,len(bars)),reverse=True):
		if bars[index]["atmosphere"] != cmp:
			del bars[index]
	'''
	for index in sorted(range(0,len(bars)),reverse=True):
		if bars[index]["atmosphere"] == cmp:
			del bars[index]
			
def Sort(list,criteria):
	
	l = len(list)
    
	print ('List length : ', l)
	if cores > 1:
		print ('Starting %d-core process'%cores)
		start_time = time.time()
		# divide the list in "cores" parts
		step = int( math.floor( l / cores ) )
		offset = 0
		p = []
		for n in range(0, cores):
			#we create a process and call merge_sort_multi with the necessary parameters
			if n < cores - 1:
				proc = Process( target=merge_sort_multi, args=( list[n*step:(n+1)*step],criteria ) )
			else:
				# get rest of elements in the last process
				proc = Process( target=merge_sort_multi, args=( list[n*step:],criteria ) )
			p.append(proc)
  
		for proc in p:
			proc.start()
			
		for proc in p:
			proc.join()
		print ('Performing final merge...')
		start_time_final_merge = time.time()
		p = []
		
		if len(responses) > 2:
			while len(responses) > 0:
				# merge the sublists that come from each process
				proc = Process( target=merge_multi, args=(responses.pop(0),responses.pop(0), criteria) )
				p.append( proc )
			
			for proc in p:
				proc.start()
			for proc in p:
				proc.join()
		# final sublists 
		a = merge(responses[0], responses[1], criteria)
		
		final_merge_time = time.time() - start_time_final_merge
		print ('Final merge duration : ', final_merge_time)
		multi_core_time = time.time() - start_time
		print ('%d-Core ended: %4.6f sec'%(cores, multi_core_time))
		return a
		

def merge_sort_multi( list_part, criteria ):
	
	responses.append( merge_sort( list_part,criteria ) )


def merge_multi( list_part_left, list_part_right, criteria ):
  responses.append( merge(list_part_left, list_part_right, criteria ) )

# single core
def merge_sort(a, criteria):
  length_a = len(a)
  if length_a <= 1: return a
  m = int(math.floor(length_a / 2))
  a_left = a[0:m]
  a_right = a[m:]
  a_left = merge_sort(a_left,criteria)
  a_right = merge_sort(a_right, criteria)
  return merge(a_left, a_right, criteria)

'''
def merge(left, right, criteria):
  a = []
  while len(left) > 0 or len(right) > 0:
    if len(left) > 0 and len(right) > 0:
      if left[0][criteria] <= right[0][criteria]:
        a.append(left.pop(0))
      else:
        a.append(right.pop(0))
    elif len(left) > 0:
      a.extend(left)
      break
    elif len(right) > 0:
      a.extend(right)
      break
  return a
'''
def merge(left, right, criteria):
  a = []
  while len(left) > 0 or len(right) > 0:
    if len(left) > 0 and len(right) > 0:
      if left[0][criteria] >= right[0][criteria]:
      	if criteria == "beerPrice":
      		a.append(right.pop(0))
      	else:
        	a.append(left.pop(0))
      else:
      	if criteria == "beerPrice":
      		a.append(left.pop(0))
      	else:
        	a.append(right.pop(0))
    elif len(left) > 0:
      a.extend(left)
      break
    elif len(right) > 0:
      a.extend(right)
      break
  return a

if __name__ == '__main__':
  try:
    cores = cpu_count() #get the number of cores
    if cores > 1:
      if cores % 2 != 0:  # restrict core count to even numbers
        cores -= 1
    print ('Using %d cores'%cores)
  except:
    cores = 1
  
   
firebase = pyrebase.initialize_app(config)

db = firebase.database()
###SECTION 1:sort with binary criteria badges and style ###
manager = Manager() 
responses = manager.list()
all_bar = db.child("bars").get().val()

if len(sys.argv) > 1: 
	key = sys.argv[1]
else:
	db.child("results").push(all_bar)
	sys.exit()





sortInfo = db.child("status_search").child(key).get().val()

if all_bar[0] == None:
	del all_bar[0]
#print(all_bar[1]["id"])



if sortInfo["it"]["badgets"]["billards"] == 1:
	badgeFilter("billiards",all_bar)
if sortInfo["it"]["badgets"]["darts"] == 1:
	badgeFilter("darts",all_bar)
if sortInfo["it"]["badgets"]["table_football"] == 1:
	badgeFilter("football",all_bar)
	
#Bar Type
if sortInfo["it"]["atmosphere"]["youthful"] == 0:
	styleFilter(0,all_bar)
if sortInfo["it"]["atmosphere"]["sport"] == 0:
	styleFilter(1,all_bar)
if sortInfo["it"]["atmosphere"]["luxurious"] == 0:
	styleFilter(2,all_bar)
if sortInfo["it"]["atmosphere"]["familiar"] == 0:
	styleFilter(3,all_bar)

for index in all_bar:
	print(index["atmosphere"])


###SECTION 2:sort with gradient criteria, mergesort in parallel ###	prices, rating, crowdedness
#multiple sort - not tested on app#
if sortInfo["it"]["order"]["beer_price"] == 1:
	if sortInfo["it"]["order"]["crowdness"] == 1:
		if sortInfo["it"]["order"]["rating"] == 1:
			all_bar = Sort(all_bar, "beerPrice_prediction_rating")
		else:
			all_bar = Sort(all_bar, "beerPrice_prediction")
	elif sortInfo["it"]["order"]["rating"] == 1:
		all_bar = Sort(all_bar, "beerPrice_rating")
	else:
		all_bar = Sort(all_bar, "beerPrice")

elif sortInfo["it"]["order"]["crowdness"] == 1:
	if sortInfo["it"]["order"]["rating"] == 1:
		all_bar = Sort(all_bar, "prediction_rating")
	else:
		all_bar = Sort(all_bar, "prediction")

elif sortInfo["it"]["order"]["rating"] == 1:
	all_bar = Sort(all_bar, "rating")

else:
	all_bar = Sort(all_bar, "beerPrice_prediction_rating")


for index in all_bar:
	print(index["rating"])


###SECTION 3:upload to result and tick off the confirmation flag ###
					
db.child("results").child(key).set(all_bar)

time.sleep(2)

db.child("status_search").child(key).update({"state": 1})

#time.sleep(30)

#db.child("results").child(key).remove()
