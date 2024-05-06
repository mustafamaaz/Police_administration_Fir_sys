let express = require('express')
let router = express.Router()
const handleAsyncErrors = require('../middlewares/errorHandling');
const multer = require('multer');
const { handleGetAllEmployeeData,
    handleToFetchDataByEmpId,
    handleUpdateEmployee,
    handleCreateEmployee,
    handleToFetchStationRecord} = require('../controllers/EmployeesOperation')



const storage = multer.memoryStorage();
const upload = multer({storage: storage})



// create employees
router.post('/createemployee', upload.single('image'),handleCreateEmployee);
// update employees data
router.put("/updateEmployees" , handleUpdateEmployee)
// retrieve employee data using id
router.get("/employeedata/:employee_Id?",handleToFetchDataByEmpId);

//  search station record 

router.get("/record/:empId?",handleToFetchStationRecord);


// retrieve all employee data
router.get('/getemployeedata', handleGetAllEmployeeData);


module.exports = router