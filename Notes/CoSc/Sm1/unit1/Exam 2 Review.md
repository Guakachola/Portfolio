## 1
Which of the following are correct function definition beginning?
This would be using def to make a function, and which one is correct.
	def myFunction(x, y):
## 2
Which of the following statements correctly passes TWO ARGUEMENTS 
for the call to fnuction justafaunction?
	myFunction(x, y)
	myFunciton('x', 'y')
	myFunction(q1, q2)
	myFunction(1, 'x')
	myFunction('x' + 'y')

## 3
Label True, False, or Undefined.
	(x > z) and (w != y) True * and = both values have to be the true*
	(Z <= y) or (y<= w) True * or = only one needs to be true*
	not(z == w) and (z < x) False
	x == y + z False
	w > 0 and True False
## 4
What does the function do?
	def fun(alist):
		m = 0
		for n in alist:
			if n > m:
				m = n
		return m
this returns the highest number in an array, by making m equal to the number that is greater than the one before. 
## 5
the bottom part does not matter, since the top if true. once the if is true, the elif and else does not run. It breaks at the if. 

## 6 & 7
Even and Odd function. Pretty simple

## 9
	start = 2
	end = 20
	inc = 3
	while start < end:
		if start % 2 == 0:
			print(start)
		start = inc + start
## 10
	def highscore(howmany):
		for x in range(howmany):
			num = int(input("Enter a number:"))
			if num > 7:
				print(num)
	highscore(2)
## 11
	def PrintLine(numblanks, numsyms, sym):
	   print(' '*numblanks + sym*numsyms)

	def PrintTriangle(size, sym):
	   for x in range(1, size + 1):
	      PrintLine(size - x, x, sym)

	def PrintOppTriangle(size, sym):
	   for x in range(size):
	      PrintLine(x, size - x, sym)


	PrintLine(5, 4, '#')
	print()
	PrintTriangle(5, '#')
	PrintOppTriangle(5, '#')