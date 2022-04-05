# twitter-bot-
This bot can block up to 50 users per call every 15 minutes. Two APIS are used to make it work, twitter-api-v2 and twit. This bot first searchs for tweets given a query (I.E. NFT Cryptos #NFT) and then get the users from whose the retrieved tweets belong. Then another API call is made to twitter-api-v2 to block the given users.
In some cases the user may not exist or be inactive. 
Trying to perform a call to block/unblock users in less than the time span mentioned above will result in an undefined response.

According to Twitter Api rate limit, in a 15 minute period only	180	request can be made per user, and 450 per app to the endpoint (*GET search/tweets*).
For the block request only 50 users can be block in the same span of time.
