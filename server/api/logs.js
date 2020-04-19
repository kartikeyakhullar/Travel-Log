const {Router} = require('express');
const router = Router()
const LogEntry = require('../models/LogEntry');

router.get('/',async (req,res,next)=>{
    try{
        
        const entries = await LogEntry.find();
        res.json(entries);

    }catch(error){
        next(error);
    }
});


router.post('/', async (req,res,next)=>{
    try {
        const logEntry = new LogEntry(req.body);
        const createdLogEntry = await logEntry.save();
        res.json(createdLogEntry);
    }catch(error){
        if(error.name === 'ValidationError'){
            res.status(422);
        }
        next(error);
    }
})





module.exports = router;