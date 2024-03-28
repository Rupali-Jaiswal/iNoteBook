const errorHandling=(err,req,res,next)=>{
    const status=err.status||400
    const msg=err.message|| 'Backend error'
    return res.status(status).json({msg})
}
module.exports=errorHandling