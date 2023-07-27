const { getDataFromDBService, createUserDBService, updateUserDBService, removeUserDBService } = require("./userService");
const userModel = require('./userModel');

const getDataControllerfn = async (req, res) => {
  try {
    const employee = await getDataFromDBService();
    res.send({ status: true, data: employee });
  } catch (error) {
    res.status(500).send({ status: false, message: "Error getting data", error });
  }
};
const updateUserController = async (req, res) => {
  try {
    await updateUserDBService(req.params.id, req.body);
    res.send({ status: true, message: "User Updated" });
  } catch (error) {
    res.status(500).send({ status: false, message: "User Update Failed", error });
  }
};

const deleteUserController = async (req, res) => {
  try {
    await removeUserDBService(req.params.id);
    res.send({ status: true, message: "User Deleted" });
  } catch (error) {
    res.status(500).send({ status: false, message: "User Deletion Failed", error });
  }
};

// const createUserControllerFn = async (req, res) => {
//   console.log("im here")
//   try {
//     console.log('Received data:', req.body); // Log the received data

//     await createUserDBService(req.body);
//     res.send({ status: true, message: "User created successfully" });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({ status: false, message: "Error creating user", error: error });
//   }
// };

const createUserControllerFn = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    // ... (existing code for validation)

    // Create a new user document using the Mongoose model and save it to the database
    const isUserCreated = await createUserDBService(req.body);
    if (isUserCreated) {
      return res.status(201).json({ status: true, message: 'Kullanıcı kaydı başarıyla oluşturuldu.' });
    } else {
      throw new Error('Error creating user');
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, message: error.message || 'Error creating user' });
  }
};

const userLoginControllerFn = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log('Received login request for user:', username);

    // ... (existing code for validation and password comparison)

    // Log the result of the login attempt
    console.log('Login attempt result:', user ? 'Success' : 'Failure');

    // ... (existing code for response handling)
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, message: 'Error during login', error: error.message || 'Unknown error' });
  }
};








module.exports = {
  getDataControllerfn,
  createUserControllerFn,
  updateUserController,
  deleteUserController,
  userLoginControllerFn
};