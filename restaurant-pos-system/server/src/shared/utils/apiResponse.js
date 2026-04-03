export const apiResponse=(res,statusCode,message,data=null)=>res.status(statusCode).json({success:true,message,data});
