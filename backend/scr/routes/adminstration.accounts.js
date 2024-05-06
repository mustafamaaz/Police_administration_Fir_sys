let express = require('express')
let router = express.Router()
const handleAsyncErrors = require('../middlewares/errorHandling');
const {handleToCreateStationAdmin,
       handleToAssignEmployeeDuty,
       handleToReceiveStationData,
       handleEmployeesPicture,
       handleToGetEmpDetailForTransfer,
       handleToTransferEmployee,
       handleToGetProfilePic } = require('../controllers/DatabaseAdmin');
const bcrypt = require('bcryptjs');
const connectToDatabase = require('../../connection_db');



// Creating administrator
router.post('/createAdmin', handleAsyncErrors(async (req, res) => {
    if (!req.body) {
        return res.status(400).send("For creation of admin, please provide all fields");
    }

    console.log("api hit")

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    try {
        const connection = await connectToDatabase(); // Assuming connectToDatabase function returns a MySQL connection

        const query = "INSERT INTO DATABASE_ADMIN (EMP_ID,EMP_NAME, PASSWORD, CNIC , IMAGE ) VALUES (?,?,?,?,?)";
        const values = [req.body.emp_id, req.body.emp_name, hashedPassword, req.body.cnic , req.body.image]; // Assuming 'admin' is the default role

        await connection.execute(query, values);

        const admin = {
            emp_id: req.body.emp_id,
            emp_name: req.body.emp_name,
            password: hashedPassword,
            role: req.body.role
        };

        res.status(201).json(admin);
    } catch (err) {
        res.status(500).json(err);
    }

}));



// get profile pic 
router.get('/upload/:path?',handleToGetProfilePic )

// retrieve all station data
router.get('/getpoliceStation', handleToReceiveStationData);
// duty assign 
router.post('/assignduties', handleToAssignEmployeeDuty);
// create station admin
router.post('/createStaionAdmin', handleToCreateStationAdmin);
// search Employee for transfer
router.get('/EmpId/:employee_Id?', handleToGetEmpDetailForTransfer);
// Transfer occur and send prevoius data to record table and new to assign table
router.post('/TransferData', handleToTransferEmployee);


module.exports = router