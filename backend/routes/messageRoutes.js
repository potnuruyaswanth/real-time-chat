const express=require('express');

const router=express.Router();


const {
    getMessages,
    createMessages,
    deleteAllMessages,
}=require('../controllers/messageControllers');

//GET all messages
router.get('/',getMessages);

//POST the message
router.post('/',createMessages);

//Delete the All messages
router.delete('/',deleteAllMessages);

module.exports=router;