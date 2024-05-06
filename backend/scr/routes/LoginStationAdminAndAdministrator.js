let express = require('express')
let router = express.Router()
const {handleStationLogin} = require('../controllers/StationAdmin')
const { handleLoginAdmin} = require('../controllers/DatabaseAdmin');



// login thana admin
router.post('/stationAdmin', handleStationLogin);
// login administrator
router.post('/loginAdmin', handleLoginAdmin);


module.exports = router