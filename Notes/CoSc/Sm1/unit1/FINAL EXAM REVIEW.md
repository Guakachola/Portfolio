## 1
four different types will be given. int, string, list, and a dictionary. these will have specific values in them. they will all have a value, none will be empty. {prob fresh up on dicts [Dictionary](https://runestone.academy/ns/books/published/COSC1336-UH-F24/Dictionaries/toctree.html)}
```
x = alist[0]
```
if there is nothing, index list is out of range, which is an error. but no matter how many items there are, there will always be an item at index 0.
## 2
you can multiply ints by Ints, Strings, Floats. **but not Dicts** 
you can not add ints to strings or lists also.

## 3
```
	aString[0] = ?
```
if a string has a value, it has a character at index 0

```
	astring[0] = int?
```
A string is not an int, only when it is type converted with int() can it become and int. and only numbers can do that. So if my string is equal to 119 ,aString[0] will be equal to '1', not 1. 
this being said, the string is immutable, it can not change after it is declared. you can restate the string, but changing the value is not possible, therefore, running aString[0] = '...' will not work, no matter what value you declare
this works tho

```
	aString = anInt
```
## 4
Dictionary is ordered or unordered.... its ordered (as of python 3.7)

## 5
**Do not use the with() or realexpression()**

```
	supplements = {"Multivitamin": 200, "Calcium": 500, "Antioxidant": 70}
```

In order to list each item one line at a time, you would do this

```
	for i in supplements:
		print(i, supplements[i])

	for i in supplements:
		if i == "Multivitamin"
			print(supplement[i])

	for i in supplements:
		if supplement[i] < 150:
			print(i)
```

## 6
too easy...

## 7
given txt file, SSN.txt

```
	Ashley 222330000
	Jonathan 444367265
	George 882710926
	Brilie 0291847290
```
	
using the given code on the problem, how does it interact with the 

```
	f = open("SSN.txt", r)
	aList = f.readlines()
	f.close()
	print(aList)
	## this will be a list, that is because the method readlines()
	## each line is a list
	for s in aList:
		ssn = s.split()
		print(ssn)
		 ## this splits the list form ['Ashley 2223330000', '......', '...'] into ['Ashley', '222330000']
```

## 8
given a txt file, that being the 'bill of rights'...

```
	import string ## ?
	f = open("billofrights.txt", 'r')
	content = f.read().replace(',','').replace('.','').split() 
	## this seperates each word, replacing the puncuation with ''
	## it is a list
	myList = []
	for word in content:
		if word[0] in string.ascii_lowercase:
			myList.append(word) ##they will all be lowercase words
	for item in myList:
	if len(item) > 5 and len(item) < 8
		print(item)
		## the word 'display' was the only word that fit
```
## 9
```
	l = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
	total = 10
	for i in l[0:-1:3]:
	total += l[i]
```
this looks weird, but what is i? 'i' is..

```
	total = total + l[0] + l[3] + l[6] + l[9]
	## l[-1] is the end of the list, in this case it is l[10]
```
## 10
matrices or something like that
```python	
matrix = {(0, 3): 1, (2, 1): 20, (4, 3): 300}
for i in range(5):
	for j in range(5):
		print(matrix.get((i,j),0), end=" ")
	print()
##proper alignment
d = len(str(max(list(matrix.values()))))
	## this finds the largest number and the digit length of it
for i in range(5):
	for j in range(5):
		print(f"{matrix.get((i,j),0):{d}}", end=" ")
	print()
```

## 11
```python
	333:44:5555
	777 88 9999
	1 2 3 4 5 6 7 8 9
	987654321
```
these are ssns, all written differently. the goal is to combine them read all of them
i would open the file using readlines(), then i would replace and remove all spaces then split them down the middle, sepearating each number in a list:

```python
	ssn = [1, 2, 3, 4, 5, 6, 7, 8, 9]
	ssn2 = [3, 3, 3, 4, 4, 5, 5, 5]
```

the original ssn file name will be 'ssn_original.txt' and the new one will be 'ssn_revised.txt'

```python
def clear_ssn_number(inputfile, outputfile):
	r = open(inputfile, 'r')
	w = open(outputfile, 'w')
	for num in r:
		ssn=''
		for i in num:
			if i.isdigit():
				ssn += i
			if len(ssn) == or len(ssn) == 6:
				ssn += '-'
			if len(ssn) == 11
				ssn += '/n'
		w.write(ssn)
	r.close()
	w.close()
```
## 12

this one will be like the bill of rights question. len of the paragraph, however it will ask for the basic information of the paragraph. similar to the 'mypara' homework question. 
this means it will ask for the average word, what is the longest word, count the number of certain words, how many characters has been used to form a specific word. any word that consists of three characters, how many times has that character been used?
then make a graph out of it, using the str funciton

```
 9 [10]: 00000000
10 [02]: 00
11 [ 0]:
12 [ 1]: 0
```

this will need to be returned to the terminal and then written to a file.
