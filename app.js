/*
 GEREKLİ PAKETLER YÜKLENİYOR...
*/
const http = require('http');
const express = require('express');
const path = require('path');

const app = express();

/*
  UYGULAMA AYARLARI
*/
app.set('port', process.env.PORT || 3005); // GİRİŞ PORTU AYARLANDI
app.set('views', path.join(__dirname, 'app', 'server', 'views')); // VIEW KLASÖRÜ TANITILDI
app.set('view engine', 'ejs'); // VIEW ENGINE AYARLANDI
app.use(express.static(path.join(__dirname, 'app', 'public'))); // KULLANICILAR TARAFINDAN ERİŞİLEBİLEN KLASÖR TANIMLANDI

/*
  MIDDLEWARES
*/
app.use(express.json()); // JSON verileri işlemek için
app.use(express.urlencoded({ extended: true })); // Form verilerini işlemek için

/*
  ROUTES TANIMLAMASI
*/
app.get('/', (req, res) => {
    res.send('Hello! Express Server is Running on Port ' + app.get('port'));
});

// Eğer `routes.js` kullanıyorsanız, bunu yükleyin
require('./app/routes')(app);

/*
  HTTP SERVER OLUŞTURULDU VE DİNLEMEYE BAŞLADI
*/
const server = http.createServer(app);
server.listen(app.get('port'), '0.0.0.0', () => {
    console.log(`Sistem ${app.get('port')} Portu Üzerinde Çalışıyor.`);
});
