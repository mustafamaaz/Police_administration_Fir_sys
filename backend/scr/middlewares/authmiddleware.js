// authMiddleware.js     this need to be integrated
const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next){
    const secretKey = 'maazmustafa032';
    const token = req.headers['authorization'];
    // console.log("Token is : ",token);
    if (token === null) return res.status(401).json({ Position:false});

   
        const Token = token.split("Bearer ")[1]; 
        console.log("in bearer funtion token correct" , Token);
        jwt.verify(Token,secretKey, (err, user) => {
            if (err) return res.status(403).json({ Position:false});
            // console.log("user data is " , user);
            req.user = user;
            next();
        });

    console.log("out side of jwt.verify function");

    // return res.status(401).json({ Position:false});

  
};

module.exports = authenticateToken