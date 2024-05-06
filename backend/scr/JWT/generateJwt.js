const jwt = require('jsonwebtoken');


function generateToken (adminData){
    const { emp_id, cnic } = adminData;
    const payload = {
      emp_id,
      cnic,
    };
    const secretKey = 'maazmustafa032'; // Replace with your secret key
    const expiresIn = '10h';
    const token = jwt.sign(payload, secretKey, { expiresIn });
  
    return token;
  };


  module.exports  = { generateToken }