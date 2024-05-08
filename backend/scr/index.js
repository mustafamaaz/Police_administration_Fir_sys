let express = require('express')
let path = require('path')
let app = express()
let dotenv = require('dotenv')

const con = require('../connection_db')
const cors = require('cors')

const authenticateToken = require('./middlewares/authmiddleware')
const DatabaseRoutes = require("./routes/adminstration.accounts");
const StaionAdminRoutes = require("./routes/thana.admin");
const EmployeesDataFetchRoutes = require("./routes/employees.account")

// configure dotenv file
dotenv.config() 
app.use('/static', express.static('public'))

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors())

// middlewears 
app.use((req ,res,next) => {
  console.log(`${new Date().toString()} =>  ${req.originalUrl}`)
  next()
})


app.use('/administration' ,authenticateToken, DatabaseRoutes);              // restrick to only administrator only
app.use('/employee' , authenticateToken , EmployeesDataFetchRoutes );                   // resttrict to administrator only   
app.use('/thana', StaionAdminRoutes);                                 // restrict to station admin
app.use('/login' , require("./routes/LoginStationAdminAndAdministrator"))           // not restriction
  


const PORT = process.env.PORT || 3000




  app.listen(PORT, () => console.info(`Server has started on ${PORT}`));


