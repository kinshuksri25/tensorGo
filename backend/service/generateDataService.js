//service to generate and store data in the database

//Dependencies
const https = require("https");
const stringdecoder = require('string_decoder').StringDecoder;
const Data = require("../data");
const {GORESTURL,MSG} = require("../../constants.js");

const decoder = new stringdecoder('utf-8');

class GenerateDataService{

    constructor(){
        this.generateDateServiceInstance = undefined;
        this.dataInstance = Data.getInstance();
    }

    static getInstance(){
        if(!this.generateDateServiceInstance){
            this.generateDateServiceInstance = new GenerateDataService();
        }
        return this.generateDateServiceInstance;
    }
    
    //method to generate the data and store it in database
    generateData = () => new Promise((resolve,reject) => {
        this.dataInstance.read({},{}).then(response => {
            //fetch data
            if(response.length != 0){
                resolve(MSG.DB_FULL);
            }else{
                return this.fetchGORESTData();
            }
        }).then(resolveData => {
            let userData = resolveData.data;
            return this.dataInstance.insert(userData,{});
        }).then(resolvedResult => {
            resolve(MSG.FETCH_SUCCESS);
        }).catch(rejectedData => {
            reject(rejectedData);
        });;
    });

    //method to fetch the data from gorest
    fetchGORESTData = () => new Promise ((resolve,reject) => {
        let goRestRequest = https.request(GORESTURL, function(response) {

            let responseString = '';
        
            response.on('data', function(chunk) {
                responseString += decoder.write(chunk);
            });
        
            response.on('end', function() {
                responseString += decoder.end();
                responseString = JSON.parse(responseString);
                resolve(responseString);
            });
        });
        
        //error checking
        goRestRequest.on('error', (error) => {
            reject(MSG.GO_REST_ERR);
        });
    
        //send request
        goRestRequest.end();
    });
}

module.exports = GenerateDataService;