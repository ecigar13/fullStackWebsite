const express = require('express');
const app= express();
const port = 3000;

app.get('/', (requrest, response)=>{
  response.send('Hello from Express!');
})

app.listen(port, (err) => {
  if (err) {
    return console.log("err: ", err);
  }

  console.log(`Server is listening on port ${port}`);
})

https://blog.risingstack.com/your-first-node-js-http-server/