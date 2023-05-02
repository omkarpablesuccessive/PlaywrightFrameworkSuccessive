import{test} from '@playwright/test'
let randomString=''
const testVariables= {
    loginSuccessfulMessage : '',
    loginErrorMessage:'',
    nativeTitle:'',
    listOfElements:[],
    userName:''
    
}
module.exports={
    testVariables,
    randomString
}