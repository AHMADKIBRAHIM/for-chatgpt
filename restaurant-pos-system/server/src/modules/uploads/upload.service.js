export const uploadFile=async(file)=>({filename:file?.filename,url:`/uploads/${file?.filename}`});
