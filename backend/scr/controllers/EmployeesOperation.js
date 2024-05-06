const connectToDatabase = require('../../connection_db');
const getCurrentDate = require('../helperFunction/Current_Time')
const sharp = require('sharp')
const { S3Client, PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");
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



async function handleCreateEmployee(req, res) {
// we must add logic for waiting reponse of s3 bucket in front end if pic is uploading to s3 then wainting cycle disapear  

    try {
        const connection = await connectToDatabase();

        const profileName = `Profile_Pic_${req.body.emp_id}`;

        const buffer = await sharp(req.file.buffer).resize({
            height: 1920,
            width: 1080,
            fit: "contain"
        }).toBuffer()

        const params = {
            Bucket: BUCKET_NAME,
            Key: `${folderName}/${profileName}`,
            Body: buffer,
            ContentType: req.file.minetype,
        }
        const PostCmd = new PutObjectCommand(params);
        await s3.send(PostCmd)

        const currentDate = getCurrentDate();
        const query = "INSERT INTO EMPLOYEES (EMP_ID,EMP_NAME , EMP_RANK ,PHONE_NO , ADDRESS ,START_DATE , CNIC , IMAGE) VALUES (?, ?, ?, ?, ? ,? ,?,?)";
        const values = [req.body.emp_id, req.body.emp_name, req.body.emp_rank, req.body.emp_phone_no, req.body.emp_address, currentDate, req.body.emp_cnic, profileName];
        await connection.execute(query, values);
        return res.status(200).json({ success: true });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ success: false });
    }
}



async function handleUpdateEmployee(req, res) {

    try {
        const connection = await connectToDatabase();

        const query = "UPDATE EMPLOYEES SET EMP_NAME = ?, EMP_RANK = ?, PHONE_NO = ?, ADDRESS = ?, CNIC = ? WHERE EMP_ID = ?";
        const values = [req.body.emp_name, req.body.emp_rank, req.body.emp_phone_no, req.body.emp_address, req.body.emp_cnic, req.body.emp_id];
        await connection.execute(query, values);

        return res.status(200).json({ success: true });
    } catch (err) {
        console.log("error in server side")
        return res.status(500).json({ success: false });
    }

}


async function handleToFetchDataByEmpId(req, res) {


    if (!req.params.employee_Id) {
        return res.status(500).json({ success: false, error: 'query is empty' });

    }


    try {
        connectToDatabase()
            .then(async (connection) => {
                const employeeId = req.params.employee_Id; // Extract employee_id from request parameters
                console.log(employeeId);

                const [rows, fields] = await connection.execute('SELECT * FROM EMPLOYEES WHERE EMP_ID = ?', [employeeId]);

                if (rows.length > 0) {
                    console.log('Data for employee with ID ' + employeeId + ':');

                    await connection.end();
                    return res.json({ success: true, rows: rows });
                } else {

                    await connection.end();
                    return res.status(404).json({ success: false, error: 'NOT FOUND' });
                }


            })
            .catch((error) => {
                console.error("Failed to connect to MySQL:", error);
                return res.status(500).json({ error: 'Failed to fetch employee data' });
            });

    } catch (error) {
        // If an error occurs, send an error response
        return res.status(500).json({ error: 'Failed to fetch employee data' });
    }
}




async function handleToFetchStationRecord(req,res){


    if (!req.params.empId) {
        return res.status(500).json({ success: false, error: 'query is empty' });

    }

    console.log("query is : " ,req.params.empId);

    try {
        connectToDatabase()
            .then(async (connection) => {
                const employeeId = req.params.empId; 
                console.log(employeeId);

                const [rows, fields] = await connection.execute('SELECT * FROM STATION_RECORD WHERE EMP_ID = ?', [employeeId]);

                const query4 = " SELECT STATION_NO FROM  STATION_BASE_DUTY_ALLOCATION  WHERE EMP_ID = ?"
                const value4 = [employeeId]
                const [station] = await connection.execute(query4, value4);
        
                
const current_station = station[0];

console.log("current station is   " , current_station);


                if (rows.length > 0) {
                
                    await connection.end();
                    return res.json({ success: true, history: rows , current_station : current_station });
                } else {

                    await connection.end();
                    return res.status(404).json({ success: false, error: 'NOT FOUND' , current_station:current_station });
                }


            })
            .catch((error) => {
                console.error("Failed to connect to MySQL:", error);
                return res.status(500).json({ error: 'Failed to fetch employee data' });
            });

    } catch (error) {
        // If an error occurs, send an error response
        return res.status(500).json({ error: 'Failed to fetch employee data' });
    }



}











async function handleGetAllEmployeeData(req, res) {
    try {

        connectToDatabase()
            .then(async (connection) => {

                const [rows, fields] = await connection.execute('SELECT * FROM EMPLOYEES');

                if (rows.length === 0) {
                    return res.status(404).json({ errors: "employees not found" });
                }

                const EmployeeData = rows.reverse();
                await connection.end();
                return res.status(200).json({ success: true, EmployeeData: EmployeeData });

            })
            .catch((error) => {
                console.error("Failed to connect to MySQL:", error);
            });

    } catch (error) {
        // If an error occurs, send an error response
        res.status(500).json({ success: false, error: "Failed to fetch employee data" });
    }
}





module.exports = {
    handleGetAllEmployeeData,
    handleToFetchDataByEmpId,
    handleUpdateEmployee,
    handleCreateEmployee,
    handleToFetchStationRecord
}