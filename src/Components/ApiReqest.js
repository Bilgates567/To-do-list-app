

const ApiReqest =async (url='',optionObj=null,errMsg=null) => {
   try{
    const response= await fetch(url,optionObj);
    if(!response.ok) throw Error("Please reload the App ")
   }catch(err){
        errMsg=err.Message
    }finally{
        return errMsg
    }
}

export default ApiReqest