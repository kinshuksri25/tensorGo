//Service layer for the microservices

//Dependencies
const GenerateDataService = require("./service/generateDataService");
const FetchDataService = require("./service/fetchDataService");
const UpdateDataService = require("./service/updateDataService");
const ResponseModel = require("./response.model.js");
const {MSG} = require("../constants.js");


class ServiceLayer{

    constructor(){
        this.serviceInstance = undefined;
        this.updateDataInstance = UpdateDataService.getInstance();
        this.fetchDataInstance = FetchDataService.getInstance();
        this.generateDataInstance = GenerateDataService.getInstance();
    }

    static getInstance = () =>{
        if(!this.serviceInstance){
            this.serviceInstance = new ServiceLayer();
        }
        return this.serviceInstance;
    }

    generateData = () => new Promise((resolve,reject) => {
        let response = new ResponseModel();
        this.generateDataInstance.generateData().then(resolvedMsg => {
            response.setMsg(resolvedMsg);
            resolve(response);
        }).catch(rejectedMsg => {
            response.setMsg(rejectedMsg);
            reject(response);
        });
    });

    fetchData = () => new Promise ((resolve,reject) => {
        let response = new ResponseModel();
        this.fetchDataInstance.fetchData().then(resolvedResult =>{
            response.setData([...resolvedResult]);
            response.setMsg(MSG.FETCH_DATA_SUCCESS);
            resolve(response);
        }).catch(rejectedMsg => {
            response.setMsg(rejectedMsg);
            resolve(response);
        });
    });

    updateData = (requestData) => new Promise((resolve,reject) => {
        let response = new ResponseModel();
        if(requestData.hasOwnProperty("id")){
            let updateUserData = {};
            if(requestData.hasOwnProperty("name")){
                updateUserData.name = requestData.name;
            }if(requestData.hasOwnProperty("email")){
                updateUserData.email = requestData.email;
            }if(requestData.hasOwnProperty("gender")){
                updateUserData.gender = requestData.gender;
            }if(requestData.hasOwnProperty("status")){
                updateUserData.status = requestData.status;
            }
            if(JSON.stringify(updateUserData) !== '{}'){
                updateUserData.id = requestData.id;
                updateUserData.updated_at = new Date();
                this.updateDataInstance.updateData(updateUserData).then(resolvedResult => {
                    response.setData(resolvedResult);
                    response.setMsg(MSG.UPT_SUCCESS);
                    resolve(response);
                }).catch(rejectedResult =>{
                    response.setMsg(rejectedResult);
                    reject(response); 
                });
            }else{
                response.setMsg(MSG.REQ_EMPTY);
                reject(response);
            }
        }else{
            response.setMsg(MSG.ID_UNAVAIL);
            reject(response);
        }
    });
}

module.exports = ServiceLayer;