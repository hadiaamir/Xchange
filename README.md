# XChange

Full-Stack web application that provides users the ability to calculate currency exchanges live fast and easy using the best currency exchange API's. Leverging off CurrencyLayerAPI & CurrencyConvertAPI, created an REST API that compares both services and calculates amount based on the lowest conversion rate. To lower requests to the external API's the platform checks if the current exchange request has been made within the past hour. If so it uses the recent lowest currency rate from the database and perfoms the calculation.


![alt text](https://user-images.githubusercontent.com/35180405/146933069-ead75335-d081-4acd-9045-509c16408a0d.png)


### STACK
React, Redux, Node.js, MongoDB, SCSS, Sketch.
