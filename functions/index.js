const functions = require('firebase-functions');
const express = require('express')
const cors = require('cors')
const stripe = require('stripe')('sk_test_51JWycCJtC6l2yFH8oYR3ppzqwKGS1wZ90J29jCqLSVCSNlT6BKF6XnqNGtiw8L5R2s73JULPWIsy4E2zqOEOnCIE006xdvq0HR')
 
// API 

// App config
const app = express()

// Middlewares
app.use(cors({origin: true}))
app.use(express.json())

// API routes
app.get('/', (request, response) => response.status(200).send('Hello world'))

app.post('/payments/create', async(request, response) => {
  
  const total = request.query.total
  
  console.log('payment Request Recieved BOOM!!! for this amount >>>>', total)

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: 'usd',
  })

  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  })
})

// Listen command
exports.api = functions.https.onRequest(app)