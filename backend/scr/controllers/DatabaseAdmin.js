const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtsecret = "mynameismaazmustafafromrawalpind";
const connectToDatabase = require('../../connection_db');
const { generateToken } = require("../JWT/generateJwt")
const getCurrentDate = require('../helperFunction/Current_Time')



const { S3Client,GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
let dotenv = require('dotenv')

dotenv.config() 


const BUCKET_NAME = process.env.BUCKET_NAME;
const folderName = process.env.folderName;
const BUCKET_REGION = process.env.BUCKET_REGION;
const ACCESS_KEY = process.env.ACCESS_KEY;
const SECRET_ACCESS_KEY = process.env.SECRET_ACCESS_KEY;



const s3 = new S3Client({
    credentials: {
        accessKeyId: ACCESS_KEY,
        secretAccessKey: SECRET_ACCESS_KEY
    },
    region: BUCKET_REGION
});







async function handleLoginAdmin(req, res) {
    let { database_cnic, database_id, database_name, password } = req.body

    if (!req.body) {
        return res.status(400).send("For login of admin, please provide all fields");
    }
    try {
        const connection = await connectToDatabase()
        const query = " SELECT * FROM DATABASE_ADMIN WHERE EMP_ID = ?"
        const value = [database_id]
        const [rows] = await connection.execute(query, value)

        if (rows.length === 0) {
            return res.status(404).json({ errors: "administrator not found" });
        }

        // console.log("rowwwww", rows);

        const administrator = rows[0];
        const isMatch = await bcrypt.compare(password, administrator.PASSWORD);

        if (administrator.EMP_ID === database_id && isMatch === true && administrator.EMP_NAME === database_name && administrator.CNIC === database_cnic) {


            const admin = {
                emp_id: administrator.EMP_ID,
                emp_name: administrator.EMP_NAME,
                password: administrator.PASSWORD,
                cnic: administrator.CNIC
            };

            const authToken = generateToken(admin)


            await connection.end();
            return res.status(200).json({ success: true, authToken: authToken });
        } else {
            await connection.end();
            return res.status(401).json({ success: false });
        }

    } catch (err) {
        return res.status(500).json(err);
    }


}

async function  handleToGetProfilePic (req, res){

    if (!req.params.path) {
        return res.status(500).json({ success: false, error: 'not valid path' });
    }

    try {        
        const posts = req.params.path
        const GetObjectParams = {
            Bucket : BUCKET_NAME,
            Key: `${folderName}/${posts}`,
        }
        
        const getCmd = new GetObjectCommand(GetObjectParams);
        const url =  await  getSignedUrl(s3,getCmd,{expiresIn:3600})
        const imageUrl = url
        
        
      return res.status(200).json({ success : true ,  imageUrl : imageUrl} );
    } catch (error) {
        return res.status(500).json({ success : false ,   error : error} );
    }
} 



async function handleToReceiveStationData(req, res) {

    console.log("getpolicestation");

    try {

        connectToDatabase()
            .then(async (connection) => {
                const [rows, fields] = await connection.execute('SELECT * FROM  POLICE_STATION');

                if (rows.length === 0) {
                    return res.status(404).json({ errors: "station not found" });
                }

                const stations = rows.reverse();
                await connection.end();
                return res.status(200).json({ success: true, stations: stations });

            })
            .catch((error) => {
                console.error("Failed to connect to MySQL:", error);
            });

    } catch (error) {
        res.status(500).json({ success: false, error: "Failed to fetch station data" });
    }
}


async function handleToAssignEmployeeDuty(req, res) {
    if (!req.body) {
        return res.status(400).send(" please provide all fields");
    }

    function getCurrentDate() {
        const today = new Date();
        const year = today.getFullYear();
        let month = (today.getMonth() + 1).toString().padStart(2, '0');
        let day = today.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }


    const currentDate = getCurrentDate();


    try {
        const connection = await connectToDatabase(); // Assuming connectToDatabase function returns a MySQL connection

        const query = " SELECT * FROM EMPLOYEES WHERE EMP_ID = ?"
        const value = [req.body.emp_id]

        const query2 = " SELECT EMP_ID , STATION_NO FROM STATION_BASE_DUTY_ALLOCATION WHERE EMP_ID = ?"
        const check = [req.body.emp_id]

        const [rows] = await connection.execute(query, value)
        const [Ispresnt] = await connection.execute(query2, check)
        console.log(req.body.emp_id);
        console.log(req.body.thana_no);

        const thana = Ispresnt[0];


        if (rows.length === 0) {
            return res.status(404).json({ errors: "employees not found for duty assign" });
        }
        else {

            if (Ispresnt.length === 0) {

                const query = "INSERT INTO STATION_BASE_DUTY_ALLOCATION (EMP_ID,STATION_NO ,START_DATE ) VALUES (?,?,?)";
                const values = [req.body.emp_id, req.body.thana_no, currentDate];
                await connection.execute(query, values)
                return res.status(200).json({ success: true });


                // assign duty
            } else {
                return res.status(404).json({ success: false, errors: "employees is already doing duty" });

                // already doing their duty
            }
        }
    } catch (err) {
        return res.status(500).json({ success: false, errors: err });
    }
}






async function handleToGetEmpDetailForTransfer(req, res) {


    if (!req.params.employee_Id) {
        return res.status(500).json({ success: false, error: 'query is empty' });

    }


    try {
        connectToDatabase()
            .then(async (connection) => {
                const employeeId = req.params.employee_Id;
                console.log(employeeId);

                const [rows, fields] = await connection.execute('SELECT EMP_ID FROM EMPLOYEES WHERE EMP_ID = ?', [employeeId]);

                if (rows.length > 0) {

                    const [checkDuty, fields1] = await connection.execute('SELECT STATION_BASE_DUTY_ALLOCATION.EMP_ID , STATION_BASE_DUTY_ALLOCATION.STATION_NO , STATION_BASE_DUTY_ALLOCATION.START_DATE , EMPLOYEES.EMP_NAME ,EMPLOYEES.EMP_RANK    FROM STATION_BASE_DUTY_ALLOCATION , EMPLOYEES WHERE EMPLOYEES.EMP_ID = ? && STATION_BASE_DUTY_ALLOCATION.EMP_ID = ?  ', [employeeId, employeeId]);
                    await connection.end();
                    if (checkDuty.length > 0) {
                        // employee is working in any station so it could tranfer into other station
                        console.log("date is ::  ", checkDuty);

                        return res.status(200).json({ success: true, Message: 'this Emp is able to transfer', WorkingDetails: checkDuty });

                    } else {
                        // first assign duty this emp is not working yet in any station
                        return res.status(403).json({ success: false, Message: 'this Emp is not working in any station' });
                    }


                } else {

                    await connection.end();
                    return res.status(404).json({ success: false, Message: 'This emp is not found' });
                }


            })
            .catch((error) => {
                console.error("Failed to connect to MySQL:", error);
                return res.status(500).json({ error: 'Failed to fetch  data' });
            });

    } catch (error) {
        // If an error occurs, send an error response
        return res.status(500).json({ error: 'Failed to fetch employee data' });
    }
}









async function handleToTransferEmployee(req, res) {
    if (!req.body) {
        return res.status(400).send(" please provide all fields");
    }

    let { emp_id, station } = req.body

    const firstThreeChars = emp_id.substring(0, 3);
    const modifiedEmpId = firstThreeChars.toUpperCase() + emp_id.substring(3);


    try {
        const connection = await connectToDatabase();
        const currentDate = getCurrentDate();

        console.log("Date is :" , currentDate );

        console.log(" " ,emp_id );



        // at this stage we also make a check that if previous date is equal to current date then dont make transfer it means dont execute below all queries

        const query = " SELECT * FROM STATION_BASE_DUTY_ALLOCATION WHERE EMP_ID = ?"
        const value = [emp_id]
        const [PreviousRecord] = await connection.execute(query, value)

        const query1 = `INSERT INTO STATION_RECORD (STATION_NO, EMP_ID, START_DATE, END_DATE) VALUES (?, ?, ?, ?)`;
        const value1 = [PreviousRecord[0].STATION_NO, modifiedEmpId, PreviousRecord[0].START_DATE, currentDate];
        const [InsertIntoRecord] = await connection.execute(query1, value1);

        const query2 = "UPDATE STATION_BASE_DUTY_ALLOCATION SET EMP_ID = ?, STATION_NO = ? , START_DATE = ? WHERE EMP_ID = ?";
        const value2 = [modifiedEmpId , station ,  currentDate ,  emp_id   ];
        const [UpdateAssignDuty] = await connection.execute(query2, value2);


        return res.status(200).json({ success : true });


    } catch (err) {
        console.error("Error in transfer employee :", err);
        return res.status(500).json({ error: err });
    }
}














async function handleToCreateStationAdmin(req, res) {
    if (!req.body) {
        return res.status(400).send(" please provide all fields");
    }

    try {
        const connection = await connectToDatabase();

        const queryEmp_id = " SELECT EMP_ID,STATION_NO FROM STATION_ADMIN WHERE EMP_ID = ?"
        const value = [req.body.emp_id]
        const queryStation_no = " SELECT EMP_ID , STATION_NO FROM STATION_ADMIN WHERE STATION_NO = ?"
        const value1 = [req.body.station_no]
        const query = "SELECT * FROM STATION_ADMIN WHERE STATION_NO = ? AND EMP_ID = ?";
        const values2 = [req.body.station_no, req.body.emp_id];

        const [DataEmp_id] = await connection.execute(queryEmp_id, value)
        const [DataStation_no] = await connection.execute(queryStation_no, value1)
        const [DataStationAdmin] = await connection.execute(query, values2)


        if (DataStationAdmin.length === 0) {

            if (DataEmp_id.length === 0 && DataStation_no.length === 0) {

                const query = "INSERT INTO STATION_ADMIN (EMP_ID,STATION_NO ,PASSWORD ) VALUES (?,?,?)";
                const values = [req.body.emp_id, req.body.station_no, req.body.password];
                await connection.execute(query, values)
                console.log("only when new admin created ");

                return res.status(200).json({ success: true });
            } else {
                console.log("else of .dataEmp length ===0 ");

                return res.status(200).json({ success: false, DataStation_no, DataEmp_id });
            }
        }
        else {
            console.log("else of .length ===0 ");
            return res.status(200).json({ success: false, DataStationAdmin });
        }


    } catch (err) {
        console.error("Error in create station admin route :", err);
        return res.status(500).json({ err });
    }
}



module.exports = {
    handleToCreateStationAdmin,
    handleToAssignEmployeeDuty,
    handleToReceiveStationData,
    handleLoginAdmin,
    handleToGetEmpDetailForTransfer,
    handleToTransferEmployee,
    handleToGetProfilePic
}