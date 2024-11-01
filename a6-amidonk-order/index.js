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
      const likeOption = req.body.likeOption
      const addContent = req.body.addContent

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
    ${htmlBottom}`)});

      app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}...`);
      });