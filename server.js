const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');
const mongoUri =  process.env.MONGODB_URI || 'mongodb://localhost:27017/musicstore';
const methodOverride = require('method-override');
const Album = require('./models/albums.js');

app.use(methodOverride('_method'));
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'))

//Seed Route
app.get('/seed', (req, res)=>{
    Album.create(
        [
            {
              title:'Noble Beast',
              artist:'Andrew Bird',
              genre:'Baroque Pop',
              year: 2009,
              price: 18,
              quantity: 37,
              img: 'https://upload.wikimedia.org/wikipedia/en/a/a1/Noble_Beast_%28Front_Cover%29.png'
            },
            {
              title:'Long Live Asap',
              artist:'Asap Rocky',
              genre:'Hip Hop',
              year: 2013,
              price: 15,
              quantity: 109,
              img: 'https://upload.wikimedia.org/wikipedia/en/9/93/Long-live-asap.jpg'
            },
            {
              title:'Abraxas',
              artist:'Carlos Santana',
              genre:'Latin Rock',
              year: 1970,
              price: 200,
              quantity: 5,
              img: 'https://upload.wikimedia.org/wikipedia/en/c/c4/SantanaAbraxas.jpg'
            }
        ],
        (err, data)=>{
            res.redirect('/albums');
        }
    )
});

//Delete Route
app.delete('/albums/:id', (req, res)=>{
    Album.findByIdAndRemove(req.params.id, (err, data)=>{
        res.redirect('/albums');
    });
});

//New Route
app.get('/albums/new', (req, res)=>{
    res.render('new.ejs');
});

//Create Route
app.post('/albums/', (req, res)=>{
  Album.create(req.body, (error, createdAlbum)=>{
  res.redirect('/albums')
  });
});

//Edit Route
app.get('/albums/:id/edit', (req, res) => {
  Album.findById(req.params.id, (err, foundAlbum) =>{
      res.render(
        'edit.ejs',
        {
          album: foundAlbum
        }
      );
  })
});

app.get('/', (req, res)=>{
  res.render('intro.ejs');
});


//Update Route
app.put('/albums/:id', (req, res)=>{
    Album.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedModel)=>{
        res.redirect('/albums');
    });
});

//Show Route
app.get('/albums/:id', (req, res)=>{
  Album.findById(req.params.id, (err, foundAlbum)=>{
        res.render('show.ejs', {
            album:foundAlbum
        });
    });
});

//Index Route
app.get('/albums', (req, res)=>{
    Album.find({}, (error, allAlbums)=>{
        res.render('index.ejs', {
            albums: allAlbums
        });
    });
});

app.put('/albums/:id/buy', (req, res) => {
  Album.findByIdAndUpdate(req.params.id, {$inc: { quantity: -1 }}, (err) => {
    if (err) {
      res.send(err.message)
    } else {
      res.redirect('back')
    }
  })
})

app.listen(PORT, () =>{
  console.log('listening...');
})

mongoose.connect(mongoUri, {useNewUrlParser: true});
mongoose.connection.on('open', () =>{
  console.log('connected to mongoose!!!!!!!')
})
