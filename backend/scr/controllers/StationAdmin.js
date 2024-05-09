
const connectToDatabase = require('../../connection_db');
const { S3Client, PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");
const  getCurrentDateNewFunction  = require('../helperFunction/Current_Time')

let dotenv = require('dotenv')

dotenv.config()


const BUCKET_NAME = process.env.BUCKET_NAME;
const folderName = process.env.folderName;
const BUCKET_REGION = process.env.BUCKET_REGION;
const ACCESS_KEY = process.env.ACCESS_KEY;
const SECRET_ACCESS_KEY = process.env.SECRET_ACCESS_KEY;
const FOLDER = process.env.FOLDER_FOR_FILER_PIC
const Fir_Folder = process.env.FOLDER_FOR_FIR_UPLOAD


const s3 = new S3Client({
    credentials: {
        accessKeyId: ACCESS_KEY,
        secretAccessKey: SECRET_ACCESS_KEY
    },
    region: BUCKET_REGION
});



async function handleStationLogin(req, res) {
    const { emp_id, station_no, password } = req.body;

    console.log("  data transfer station admin server side", emp_id, station_no, password)
    try {
        const connection = await connectToDatabase();

        const query = "SELECT * FROM STATION_ADMIN WHERE EMP_ID = ? AND STATION_NO = ? AND PASSWORD = ?";
        const values = [emp_id, station_no, password];

        const [rows] = await connection.execute(query, values);
        console.log("query execute", rows);


        if (rows.length === 0) {
            return res.status(404).json({ success: false, errors: "admin not found" });
        }

        const ThanaAdmin = rows[0]

        if (ThanaAdmin.EMP_ID === emp_id && ThanaAdmin.STATION_NO === station_no && ThanaAdmin.PASSWORD === password) {
            res.status(200).json({ success: true });
        } else {
            res.status(401).json({ success: false, errors: "Invalid credentials" });
        }

        await connection.end();
    } catch (err) {
        console.log("query not executing");
        res.status(500).json(err);
    }

}



async function handleCreateFir(req, res) {
    const currentDate = getCurrentDateNewFunction();
    const picFile = req.files['Pic'][0];
    const firFile = req.files['Fir'][0];
    const profileName = `FILER_${req.body.cnic}`;

    console.log("files  :: ",req.files);
    console.log("files 0  :: ",picFile);
    console.log("files 1 :: ",picFile);

    console.log("body :: ",req.body);
    let randomNumber = Math.random();
    randomNumber *= 10000;
    randomNumber = Math.round(randomNumber);


    const FIR_NAME = `FIR_${req.body.cnic}_${randomNumber}`;
    const fir_no = `FIR_${req.body.name}_RN_${randomNumber} `;
    const regestrar = "N/A "


    const params2 = {
        Bucket: BUCKET_NAME,
        Key: `${Fir_Folder}/${FIR_NAME}`,
        Body: firFile.buffer,
        ContentType: firFile.mimetype,
    }
    const params = {
        Bucket: BUCKET_NAME,
        Key: `${FOLDER}/${profileName}`,
        Body: picFile.buffer,
        ContentType: picFile.mimetype,FOLDER
    }
    const PostCmd2 = new PutObjectCommand(params2);
    const PostCmd = new PutObjectCommand(params);



    try {
        const connection = await connectToDatabase();
        await s3.send(PostCmd2)
        await s3.send(PostCmd)

        const query = "INSERT INTO FIR (FIR_NO,CNIC ,FIR_DATE ,REGISTERER_NAME ,MISHAPE_AREA  ,PIC_1 ,EVIDENCE_1 , STATION_NO , EMP_ID ,PHONE_NO  ) VALUES (?, ?, ?, ?, ? ,? ,?,?,?,?)";
        const values = [fir_no, req.body.cnic, currentDate, regestrar, req.body.mishap_area, profileName, FIR_NAME, req.body.STATION_NO, req.body.EMP_ID, req.body.phone_no];
        await connection.execute(query, values);
        await connection.end();

        return res.status(200).json({ success: true , message : " Fir Created" });

    } catch (err) {
        console.log("query not executing");
        res.status(500).json(err);
    }

}


module.exports = {
    handleStationLogin,
    handleCreateFir
}