//mock database
let messages=[
    {
        id:1,
        text: "Hello welcome the real chat application",
        user: "Yaswanth",
        timestamp: new Date().toISOString(),
    },{
        id: 2,
        text: "hi ,me Sridevi",
        user: "Sridevi",
        timestamp: new Date().toISOString(),
    },
];



//Get all messages
const getMessages=(req,res)=>{
    try {
        res.json({
            success:true,
            count: messages.length,
            data:messages,
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message: 'Server Error',
            error:error.message,
        })
    }
}

//Post the messages
const createMessages=(req,res)=>{
    try{
        const {text,user}=req.body;

        //validation
        if(!text || !user){
            return res.status(400).json({
                success: false,
                message:'Please provide text for the message',
            })
        }
        const newMessage={
            id:messages.length+1,
            text,
            user,
            timestamp: new Date().toISOString(),
        }
        messages.push(newMessage);
        res.status(201).json({
            success:true,
            message:"Message created",
            data:newMessage,
        })
    }catch(error){
        res.status(500).json({
            success:false,
            message:'Server Error',
            error:error.message,
        })
    }
}

//Delete messages
const deleteAllMessages=(req,res)=>{
    try {
        messages=[];
        res.json({
            success:true,
            message:'All messages deleted',
        })
    } catch (error) {
        res.json({
            success:false,
            message:'Server Error',
            error:error.message,
        })
    }
}

module.exports={
    getMessages,
    createMessages,
    deleteAllMessages,
}