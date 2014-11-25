Ally
====

A little node app to check how many times URL has been shared on Twitter, Pinterest, LinkedIn, Google+ and Facebook. 

##Installation

1. Clone or download it
2. sudo npm install 
3. node index.js

##HTTP Usage
###Single Request
	/shared/<url>
	Method : Get
	Parameter : url
	
**Example**

	http://localhost:3001/shared/http%3A%2F%2Fmalesbanget.com
	
**Response**  
   
		{
		  "url": "http://malesbanget.com",
		  "facebook": {
		    "share_count": 3736,
		    "like_count": 4623,
		    "comment_count": 2100,
		    "total_count": 10459
		  },
		  "twitter": {
		    "count": 15035
		  },
		  "pinterest": {
		    "count": 0
		  },
		  "linkedin": {
		    "count": 81
		  },
		  "google+": {
		    "count": 210075
		  }
		}
	
###Batch Request
	/batch/
	Method : Post
	Parameters : url (x-www-form-urlencoded) (Array)

**Example**

	POST /batch/ HTTP/1.1
	Host: localhost:3001
	Cache-Control: no-cache
	Content-Type: application/x-www-form-urlencoded
	
	url=http%3A%2F%2Fmalesbanget.com%2F2012%2F09%2Fpolling-kamu-paling-suka-browsing-pake-apa%2F
	&url=http%3A%2F%2Fmalesbanget.com%2F2013%2F12%2Fkompilasi-bintang-jav-paling-kondang

**Response**

		[
		    {
		        "url": "http://malesbanget.com/2012/09/polling-kamu-paling-suka-browsing-pake-apa/",
		        "twitter": {
		            "count": 68
		        },
		        "facebook": {
		            "share_count": 7,
		            "like_count": 6,
		            "comment_count": 8,
		            "total_count": 21
		        },
		        "pinterest": {
		            "count": 0
		        },
		        "google+": {
		            "count": 1
		        },
		        "linkedin": {
		            "count": 0
		        }
		    },
		    {
		        "url": "http://malesbanget.com/2013/12/kompilasi-bintang-jav-paling-kondang",
		        "twitter": {
		            "count": 152
		        },
		        "facebook": {
		            "share_count": 17,
		            "like_count": 7,
		            "comment_count": 4,
		            "total_count": 28
		        },
		        "pinterest": {
		            "count": 0
		        },
		        "google+": {
		            "count": 0
		        },
		        "linkedin": {
		            "count": 0
		        }
		    }
		]


##Database and Mechanism
One thing to note about this app is it doesn't use any relational database nor NoSQL but using a flat file database, called [LowDB](https://github.com/typicode/lowdb). For the first time query for the URL, it will return zero result while performing a query to respective social media platform in the background.

##Author
[@donnieprakoso
](https://twitter.com/donnieprakoso)

##Known Bugs  

- URL with # will failed
- Bug on unencoded string 


##License
Sak karep mu
	