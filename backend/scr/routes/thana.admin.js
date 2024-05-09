let express = require('express')
let router = express.Router()
const {handleAsyncErrors} = require('../middlewares/errorHandling');
const {handleCreateFir,
       handleToviewFir
                      } = require('../controllers/StationAdmin')

const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({storage: storage})

// create thana admin  pending

router.post('/CreateFirs', upload.fields([{ name: 'Pic', maxCount: 1 }, { name: 'Fir', maxCount: 1 }]),handleCreateFir);
router.get('/ViewFir/:cnic?',handleToviewFir);




module.exports = router