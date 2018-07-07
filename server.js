const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');
const mongoUri =  process.env.MONGODB_URI || 'mongodb://localhost:27017/grocery_app_dev';
const methodOverride = require('method-override');

app.use(methodOverride('_method'));
app.use(express.urlencoded({extended:true}));

app.get('/albums/new', (req, res)=>{
    res.render('new.ejs');
});

app.post('/albums/', (req, res)=>{
    res.send('received');
});

app.get('/', (req, res) =>{
  res.send('this works');
})

app.listen(PORT, () =>{
  console.log('listening...');
})

mongoose.connect(mongoUri, {useNewUrlParser: true});
mongoose.connection.on('open', () =>{
  console.log('connected to mongoose!!!!!!!')
})
