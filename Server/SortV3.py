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
		
	for index in sorted(range(0,len(bars)),reverse=True):
		if bars[index]["atmosphere"] != cmp:
			del bars[index]
			
def Sort(list,criteria):
	
	l = len(list)
    
	print ('List length : ', l)

	# create an unsorted list with random numbers 
	#start_time = time.time()
	#a = [ random.randint(0, n*100) for n in range(0, l) ]
	#print ('Random list generated in ', time.time() - start_time)
	# start timing the single-core procedure 
	#start_time = time.time()
	#single = merge_sort(a)
	#single_core_time = time.time() - start_time
	#a_sorted = a[:]
	#a_sorted.sort()
	''' comparison with Python list's "sort" method, validation of the algorithm 
	(it has to work right, doesn't it??) '''
	#print ('Verification of sorting algorithm', a_sorted == single)
	#print ('Single Core: %4.6f sec'%( single_core_time ))
	if cores > 1:
		''' we collect the list element count and the time taken 
		for each of the procedures in a file '''
		#f = open('mergesort-'+str(cores)+'.dat', 'a')
		print ('Starting %d-core process'%cores)
		start_time = time.time()
		# divide the list in "cores" parts
		step = int( math.floor( l / cores ) )
		offset = 0
		p = []
		for n in range(0, cores):
			''' we create a new Process object and assign the "merge_sort_multi" function to it,
			using as input a sublist '''
			if n < cores - 1:
				proc = Process( target=merge_sort_multi, args=( list[n*step:(n+1)*step],criteria ) )
			else:
				# get the remaining elements in the list
				proc = Process( target=merge_sort_multi, args=( list[n*step:],criteria ) )
			p.append(proc)

		''' http://docs.python.org/library/multiprocessing.html#multiprocessing.Process.start & 
		http://docs.python.org/library/multiprocessing.html#multiprocessing.Process.join each Process '''    
		for proc in p:
			proc.start()
		''' Corrected! '''
		for proc in p:
			proc.join()
		print ('Performing final merge...')
		start_time_final_merge = time.time()
		p = []
		''' For a core count greater than 2, we can use multiprocessing 
		again to merge sublists in parallel '''
		if len(responses) > 2:
			while len(responses) > 0:
				''' we remove sublists from the "responses" list and pass it as input to the 
				"merge_multi" wrapper function of "merge" '''
				proc = Process( target=merge_multi, args=(responses.pop(0),responses.pop(0), criteria) )
				p.append( proc )
			# again starting and joining ( this seems like a pattern, doesn't it ... ? )
			for proc in p:
				proc.start()
			for proc in p:
				proc.join()
		# finally we have 2 sublists which need to be merged 
		a = merge(responses[0], responses[1], criteria)
		
		final_merge_time = time.time() - start_time_final_merge
		print ('Final merge duration : ', final_merge_time)
		multi_core_time = time.time() - start_time
		print ('%d-Core ended: %4.6f sec'%(cores, multi_core_time))
		return a
		
# a wrapper function which appends the result of "merge_sort" to the "responses" list
def merge_sort_multi( list_part, criteria ):
	
	responses.append( merge_sort( list_part,criteria ) )

# a wrapper function which appends the result of "merge" to the "responses" list
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

# ... also explained earlier
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
keys = list(all_bar)

sortInfo = db.child("status_search").child("-LDTUfnsyoRn2-532OBG").get().val()#child(id gotten from app)
if all_bar[0] == None:
	del all_bar[0]
#print(all_bar[1]["id"])

'''
if sortInfo["it"]["badgets"]["billards"] == 1:
	badgeFilter("billards",all_bar)
if sortInfo["it"]["badgets"]["darts"] == 1:
	badgeFilter("darts",all_bar)
if sortInfo["it"]["badgets"]["table_football"] == 1:
	badgeFilter("football",all_bar)
#crowdedness
	
if sortInfo["it"]["atmosphere"] != 0:
	styleFilter(sortInfo["it"]["atmosphere"],all_bar)
print(all_bar)

#need to get key from input
''''''
###SECTION 2:get the database in a list of objects for sorting### perhaps not needed


#print(all_bar[keys[0]]["beer"])

bList = []

for id in range(0, len(keys)):
    
	bList.append(Bar(all_bar[keys[id]]["beer"],all_bar[keys[id]]["beerPrice"],
					all_bar[keys[id]]["billards"],all_bar[keys[id]]["crowd"],
					all_bar[keys[id]]["darts"],all_bar[keys[id]]["football"],
					all_bar[keys[id]]["id"],all_bar[keys[id]]["location"],
					all_bar[keys[id]]["name"],all_bar[keys[id]]["rating"],))
	
for test in bList:
	print(test.beer)
	
'''
###SECTION 3:sort with gradient criteria, mergesort in parallel ###	prices, rating, crowdedness
temp = list(all_bar[5:10])
print(len(temp))

all_bar = Sort(all_bar, "beerPrice")

print(len(temp))
for index in all_bar:
	print(index["beerPrice"])
	



'''instantiate a multiprocessing.Manager object to store the output of each process, 
see example here http://docs.python.org/library/multiprocessing.html#sharing-state-between-processes '''

'''
###SECTION 4:upload to result and tick off the confirmation flag ###
resDict = dict()

for index in range(0, len(keys)):
	resDict[keys[index]] = {"beer": bList[index].beer,"beerPrice": bList[index].beerPrice,
							"billards": bList[index].billards,"crowd": bList[index].crowd,
							"darts": bList[index].darts,"football": bList[index].football,
							"id": bList[index].id,"location": bList[index].location,
							"name": bList[index].name,"rating": bList[index].rating}
'''							
db.child("results").child("test_eric").set(all_bar)#change later to key

time.sleep(30)

#db.child("results").child("-LDTUfnsyoRn2-532OBG").remove()#change later to key