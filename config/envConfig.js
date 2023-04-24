const config={
    
    "env":"testEnv1",

    "testEnv1":{
        "web":{
            "uiURL":"https://parabank.parasoft.com/"
        },
        "api":{
            "apibaseUrl":"https://reqres.in"
        },
        "gql":{
            "gqlUrl":"https://graphql.anilist.co"
        }
        
        
    },
    "testEnv2":{
        "web":{
            "uiURL":"https://www.parasoft.com/products/"
        },
        "api":{
            "apibaseUrl":"https://reqres.in"
        }
       
    }

}
module.exports={
    config
}