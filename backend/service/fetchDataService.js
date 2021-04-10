//service to fetch the data from the database

//Dependencies
const Data = require("../data");

class FetchDataService{

    constructor(){
        this.fetchDataServiceInstance = undefined;
        this.dataInstance = Data.getInstance();
    }

    static getInstance = () =>{
        if(!this.fetchDataServiceInstance){
            this.fetchDataServiceInstance = new FetchDataService();
        }
        return this.fetchDataServiceInstance;
    }

    //method to fetch the user data from database
    fetchData = () => new Promise ((resolve,reject) => {
        this.dataInstance.read({},{}).then(resolvedResult => {
            resolve(resolvedResult);
        }).catch(rejectedResult => {
            reject(rejectedResult);
        });
    });
}

module.exports = FetchDataService;