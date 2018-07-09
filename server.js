const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');
const mongoUri =  process.env.MONGODB_URI || 'mongodb://localhost:27017/musicstore';
const methodOverride = require('method-override');
const Album = require('./models/albums.js');
const albumSeeds = require('./models/seed.js')

app.use(methodOverride('_method'));
app.use(express.urlencoded({extended:true}));

app.get('/albums/new', (req, res)=>{
    res.render('new.ejs');
});

app.post('/albums/', (req, res)=>{
  Album.create(req.body, (error, createdAlbum)=>{
  res.send(createdAlbum);
  });
});

app.get('/albums/:id', (req, res)=>{
  Album.findById(req.params.id, (err, foundAlbum)=>{
        res.render('show.ejs', {
            album:foundAlbum
        });
    });
});


app.get('/albums', (req, res)=>{
    Album.find({}, (error, allAlbums)=>{
        res.render('index.ejs', {
            albums: allAlbums
        });
    });
});

app.listen(PORT, () =>{
  console.log('listening...');
})

mongoose.connect(mongoUri, {useNewUrlParser: true});
mongoose.connection.on('open', () =>{
  console.log('connected to mongoose!!!!!!!')
})
