Ally
====

A little node app to check how many times requested URL(s) has been shared on Twitter and Facebook. 

##Installation

1. Clone or download it
2. sudo npm install 
3. node index.js

##HTTP Usage
###Single Request
	/shared/<url>
	Method : Get
	Parameter : url
	
###Batch Request
	/batch/
	Method : Post
	Parameters : url (x-www-form-urlencoded) (Array)

##Database and Mechanism
One thing to note about this app is it doesn't use any relational database nor NoSQL but using a flat file database, called [LowDB](https://github.com/typicode/lowdb). For the first time query for the URL, it will return zero result while performing a query to respective social media platform in the background.

##Author
[@donnieprakoso
](https://twitter.com/donnieprakoso)

##License
Sak karep mu
	