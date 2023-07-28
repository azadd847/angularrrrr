const userModel = require("./userModel");
const bcrypt = require('bcrypt');

module.exports.getDataFromDBService = () => {
  return userModel.find({}).exec();
};

module.exports.createUserDBService = (userDetails) => {
  const userModelData = new userModel({
    firstName: userDetails.firstName,
    lastName: userDetails.lastName,
    dob: userDetails.dob,
    gender: userDetails.gender,
    address: userDetails.address,
  });

  return userModelData.save();
};

// module.exports.createUserDBService = (userDetails) => {
//   return new Promise(function myFn(resolve, reject) {
//     var userModelData = new userModel();
//     userModelData.firstName = userDetails.firstName;
//     userModelData.lastName = userDetails.lastName;
//     userModelData.dob = userDetails.dob;
//     userModelData.gender = userDetails.gender;
//     userModelData.address = userDetails.address;

//     userModelData
//       .save()
//       .then(() => resolve(true))
//       .catch(() => reject(false));
//   });
// };

module.exports.createUserDBService = async (userDetails) => {
  try {
    const { firstName, lastName, dob, gender, address, username, password, email } = userDetails;
    // Check if the required fields (username, password, and email) are present in the request body
    if (!username || !password || !email) {
      throw new Error('Tüm alanları doldurunuz.');
    }

    // Hash the password before saving it to the database
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user document using the Mongoose model and save it to the database
    const newUser = new userModel({
      firstName,
      lastName,
      dob,
      gender,
      address,
      username,
      password: hashedPassword,
      email,
    });

    await newUser.save();
    return true;
  } catch (error) {
    console.error('Error creating user', error);
    throw error;
  }
};

module.exports.updateUserDBService = (id, userDetails) => {
  return new Promise(function myFn(resolve, reject) {
    userModel
      .findByIdAndUpdate(id, userDetails)
      .then(() => resolve(true))
      .catch(() => reject(false));
  });
};

module.exports.removeUserDBService = (id) => {
  return new Promise(function myFn(resolve, reject) {
    userModel.findByIdAndDelete(id, function returnData(error, result) {
      if (error) {
        reject(false);
      } else {
        resolve(result);
      }
    });
  });
};
module.exports.removeUserDBService = (id) => {
  return new Promise(function myFn(resolve, reject) {
    userModel
      .findByIdAndDelete(id)
      .then((result) => resolve(result))
      .catch(() => reject(false));
  });
};
