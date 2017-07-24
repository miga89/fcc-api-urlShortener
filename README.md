## URL Shortener Microservice
_A Freecodecamp.com Backend Challenge._

This API URL Shortener microservice does the following:


1. I can pass a URL as a parameter and I will receive a shortened URL in the JSON response.
2. If I pass an invalid URL that doesn't follow the valid http://www.example.com format, the JSON response will contain an error instead.
3, When I visit that shortened URL, it will redirect me to my original link.


### Example creation usage:
https://url-mg.herokuapp.com/new/https://www.google.com<
https://url-mg.herokuapp.com/new/http://foo.com:80

### Example creation output:

{ "original_url":"http://foo.com:80", "short_url":"https://url-mg.herokuapp.com/8170" }

### Usage:
https://url-mg.herokuapp.com/2871

Will redirect to:
https://www.google.com/


---
* The app is deployed on Heroku. Test it here: https://url-mg.herokuapp.com/
* The freecodecamp challenge can be found here: https://www.freecodecamp.com/challenges/url-shortener-microservice
