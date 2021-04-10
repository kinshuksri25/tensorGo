const constants = {}

constants.DBCONST = {
    DB_NAME :"TensorGo",
    COLLECTION_NAME : "userss"
}

constants.GORESTURL = "https://gorest.co.in/public-api/users";

//message structure --> server/client_location(DAO/controller)_errormsg
constants.MSG = {
    //server side message      
        //DAO
        "SVR_DAO_CONNERR" : "Unable to connect to the Database, please try again",
        "SVR_DAO_RDERR" : "Unable to read data from the Database, please try again",
        "SVR_DAO_WRERR" : "Unable to write to the Database, please try again",
        "SVR_DAO_UPERR" : "Unable update the Database, please try again",
        "SVR_DAO_DLERR" : "Unable to delete data from the Database, please try again",
        "FETCH_DATA_SUCCESS" : "",
        "ID_UNAVAIL" : "",
        "UPT_SUCCESS" : "",
        "DB_FULL" : "",

        //GORESTERROR
        "GO_REST_ERR" : "",




}

module.exports = {...constants};