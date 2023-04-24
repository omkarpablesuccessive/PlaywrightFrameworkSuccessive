
const { test, expect } = require('@playwright/test')
const gqlQuery = require("../Gql/gqlQuery")
//const baseURLgql='https://graphql.anilist.co'
const {config} =require('../../../config/envConfig')
const{gqlUrl}=config[config.env].gql 

test.describe('GQL testing in Playwright',()=>{
  test('GraphQL Query for List of Animes', async ({ request }) => {

    let response = await request.post(gqlUrl, {
        data: {
            query: gqlQuery.films
        }
    })
    expect(response.ok()).toBeTruthy();

    
    let responseBody = JSON.parse(await response.text())
    let mediaCount = await responseBody.data.Page.media
    for(let i=0; i<mediaCount.length; i++)
    {
        let titles = mediaCount[i].title.english;
    }
})
})



