# KEA GO!
KEA Go! is a URL shortener with the quirk that the endpoints generated are easily rememberable and short english words.
Instead of a URL like "https://acesse.one/zfiGd", KEA Go! would generate something like "https://keago.link/speed".
This was the final project for my Bachelor Degree in Software Development at Københavns Erhvervsakademi (KEA).

# Tech stack
- Frontend: Vue.js
- AWS Lambda Functions
- AWS Route 53
- AWS API Gateway
- AWS S3 Buckets
- AWS DynamoDB

# Functional walkthrough
![Screenshot 1](img/01.png)
Put in your redirection URL and click on Generate!
![Screenshot 2](img/02.png)
If you travel to the generated URL you'll be redirected to your original URL.
If you travel to an unknown URL, you'll be greeted with a 404 page.
![Screenshot 3](img/03.png)
