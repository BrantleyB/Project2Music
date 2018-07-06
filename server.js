const express = require('express');
const app = express();

app.get('/', (req, res) =>{
  res.send('this works');
})

app.listen(3000, () =>{
  console.log('listening...');
})
