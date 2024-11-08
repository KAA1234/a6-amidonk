'use strict';


const express = require('express');
const app = express();
const PORT = 3000;

let htmlTop = `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta name="robots" content="noindex">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kevin Amidon</title>
    <link rel='stylesheet' type='text/css' media='screen' href='main.css'>
    <script src='main.js'></script>
    <link rel="apple-touch-icon" sizes="180x180" href="apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="512x512" href="android-chrome-512x512.png">
    <link rel="icon" type="image/png" sizes="192x192" href="android-chrome-192x192.png">
    <link rel="icon" type="image/png" sizes="32x32" href="favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="favicon-16x16.png">
    <link rel="manifest" href="site.webmanifest">

</head>

<body>

    <header>
        <h1>
            <image src="./android-chrome-192x192.png" alt="favicon KA" width="30px" height="30px"></image>
            Kevin Amidon
        </h1>
    </header>
    <nav>
        <a href="./index.html">Home</a>
        <a href="./gallery.html">Gallery</a>
        <a href="./order.html">Order</a>
        <a href="./contact.html">Contact</a>
    </nav>
    <main>`

let htmlBottom = `
   </main>
</body>
<footer>
    <p>&copy; 2024 Kevin Amidon</p>
</footer>

</html>`

app.use(express.urlencoded({
  extended: true
}));

app.use(express.static('public'));

app.get("/", (req, res) => {
  res.send("This app is using express.");
});

app.post("/results", (req, res) => {
  const name = req.body.name
  const email = req.body.email
  const about = req.body.about
  const reasonForVisit = req.body.reasonForVisit
  const prodOrder = req.body.prodOrder
  const addContent = req.body.addContent
  const likeOption = req.body.likeOption


  res.send(`
    ${htmlTop} 
    <section>
      <h2>Response</h2>
        <article>

          <h3>Hello, ${name} : ${email} </h3>
          <p>You let us know that your reason for visiting was ${about} </p>
          <p>Your reason for visit was <strong>${reasonForVisit}</strong> </p>
          <p>Your response to if you liked the website was <strong>${likeOption}</strong></p>
          <p>Content that you would like to see more of is content about <strong>${addContent}</strong></p>    
          
        </article>  
    </section>
    ${htmlBottom}`)
});

const cart = require('./products.js').products

function CompProdData(prodOrder) {
  for (const oneItem of cart) {
    if (oneItem.product === prodOrder) {
      return oneItem;
    }
  }
}

function CalculateTotal(price, quantity) {
  let total = price * quantity;
  const totalCurrency = total.toLocaleString('en-us', 
    {style: 'currency', currency: 'USD', minimumFractionDigits: 2});
    return totalCurrency;
}

app.post("/order", (req, res) => {
  const name = req.body.name
  const email = req.body.email
  const address = req.body.address
  const itemSelected = CompProdData(req.body.prodOrder)
  const quant = req.body.quant
  const unitPrice = req.body.itemSelected
  const totalPrice = CalculateTotal(req.body.quant,itemSelected.price)
  const delivery = req.body.delivery
  const itemPrice = itemSelected.price.toLocaleString('en-us', 
    {style: 'currency', currency: 'USD', minimumFractionDigits: 2});


  const likeOption = req.body.likeOption
  const addContent = req.body.addContent



  res.send(`
    
    ${htmlTop} 
    <section>
      <h2 id=confirmation>Confirmation of Purchase</h2>
        <article>

          <h3>Congratulations ${name}</h3>
          <p>You have completed your order for <strong>${quant} ${itemSelected.product}</strong> made by <strong>${itemSelected.company}</strong>.</p>
          <p>Your price per unit is <strong>${itemPrice}</strong> and your total cost is <strong>${totalPrice}</strong>.</p>
          <p>Your order will be delivered to: <strong>${address}</strong>.</p>
          <p>Your ordered instructions are <strong>${delivery}</strong>. </p>

          
        </article>  
    </section>
    ${htmlBottom}`)
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});