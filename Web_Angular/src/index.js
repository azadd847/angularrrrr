const express = require("express");
const server = express();
const routes = require("./routes/routes");
const cors = require("cors");
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/dbcustomerr', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');
});

server.use(cors());
server.use(express.json());

// Kullanıcıları saklayacak basit bir dizi
const users = [];

// Signup Rota
server.post('/signup', (req, res) => {
  const { username, password, email } = req.body;
  if (!username || !password || !email) {
    return res.status(400).json({ message: 'Tüm alanları doldurunuz.' });
  }

  // Yeni kullanıcıyı oluşturun ve veritabanına ekleyin.
  const newUser = { username, password, email };
  users.push(newUser);

  return res.status(201).json({ message: 'Kullanıcı kaydı başarıyla oluşturuldu.' });
});

// Login Rota
server.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Kullanıcı adı ve şifre giriniz.' });
  }

  // Veritabanında kullanıcıyı arayın ve kimlik doğrulamasını yapın.
  const user = users.find((u) => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Kullanıcı adı veya şifre yanlış.' });
  }

  return res.status(200).json({ message: 'Giriş başarılı.' });
});

// Use the routes defined in separate files
server.use(routes);

const port = 8000;
server.listen(port, (error) => {
  console.log(`Server is running on http://localhost:${port}`);

  if (error) {
    console.log("errorr");
  } else {
    console.log("startedddddd");
  }
});
