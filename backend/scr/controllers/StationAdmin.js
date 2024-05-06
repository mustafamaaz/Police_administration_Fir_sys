
const connectToDatabase = require('../../connection_db');


async function handleStationLogin(req,res){
    const { emp_id, station_no, password } = req.body;

    console.log("  data transfer station admin server side",emp_id , station_no,password )
    try {
        const connection = await connectToDatabase();

        const query = "SELECT * FROM STATION_ADMIN WHERE EMP_ID = ? AND STATION_NO = ? AND PASSWORD = ?";
        const values = [emp_id, station_no, password];
        console.log("query assemble");

        const [rows] = await connection.execute(query, values);
        console.log("query execute" , rows);


        if (rows.length === 0) {
            return res.status(404).json({ success:false, errors: "admin not found" });
        }

        const administrator = rows[0]
        console.log("administrator");

        if (administrator.EMP_ID === emp_id && administrator.STATION_NO === station_no && administrator.PASSWORD === password){
            res.status(200).json({success:true});
        } else {
            res.status(401).json({ success:false, errors: "Invalid credentials" });
        }

        await connection.end();
    } catch (err) {
        console.log("query not executing");
        res.status(500).json(err);
    }

}



module.exports = {
    handleStationLogin
}