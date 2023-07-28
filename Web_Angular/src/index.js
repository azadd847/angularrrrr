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
const users = []; // bak bu bos o yuzden undefined cikmis ilk once sana o da gosterim 

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
// Login Rota
server.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log('Received login request for user:', username);

    if (!username || !password) {
      return res.status(400).json({ message: 'Kullanıcı adı ve şifre giriniz.' });
    }

    // Assuming you have the userLoginControllerFn available from the userController module
    const { userLoginControllerFn } = require("./app/components/user/userController");

    // Call the userLoginControllerFn to handle user login and get the response
    const loginResponse = await userLoginControllerFn(req, res);

    // Use the response received from the controller to send the appropriate response to the client
    if (loginResponse.status) {
      return res.status(200).json({ status: true, message: 'Giriş başarılı.', user: loginResponse.user });
    } else {
      return res.status(401).json({ status: false, message: 'Kullanıcı adı veya şifre yanlış.' });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, message: 'Error during login', error: error.message || 'Unknown error' });
  }
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
