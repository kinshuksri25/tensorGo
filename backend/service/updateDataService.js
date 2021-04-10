//service to update data in the database

//Dependencies
const Data = require("../data");

class UpdateDataService{

    constructor(){
        this.updateDataServiceInstance = undefined;
        this.dataInstance = Data.getInstance();
    }

    static getInstance = () =>{
        if(!this.updateDataServiceInstance){
            this.updateDataServiceInstance = new UpdateDataService();
        }
        return this.updateDataServiceInstance;
    }

    //method to update the user data
    updateData = (data) => new Promise ((resolve,reject) => {
        this.dataInstance.update({id : data.id},{$set : {...data}},{returnOriginal: false}).then(resolvedResult => {
            let updatedUser = resolvedResult.value;
            resolve(updatedUser);
        }).catch(rejectedResult => {
            reject (rejectedResult);
        });
    });
}

module.exports = UpdateDataService;