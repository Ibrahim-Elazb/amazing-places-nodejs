// @ts-nocheck
const validation = (validationSchema) => {
    return (request, response, next) => {
        const dataSources = ["body", "params", "query"];
        const validationErrors = [];
        dataSources.forEach(dataSource => {
            if (validationSchema[dataSource]) {
                const validationResult=validationSchema[dataSource].validate(request[dataSource],{abortEarly:false});
                if(validationResult.error?.details){
                    validationResult.error.details.forEach(item=>{
                        validationErrors.push(item.message)
                    })
                }
                // if(validationResult.error)
                //     validationErrors.push(validationResult.error);
            }
        })
        if(validationErrors.length>0){
            const customError=new Error("Invalid Input");
            customError.statusCode=400;
            customError.message=validationErrors;
            next(customError);
        }else{
            next();
        }
    }
}


module.exports = validation;