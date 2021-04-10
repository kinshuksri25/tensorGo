//Data layer for communicating with the database

//Dependencies
let mongoDB = require('mongodb').MongoClient;
let {DBCONST,MSG} = require("../constants.js");
let GenerateDataService = require("./service/generateDataService");

//Class definition
class Data {

    constructor(){
        this.dataInstance = undefined;
        this.dbUrl = "mongodb+srv://admin:8658Vokun8658@atlas-cloud-yrwic.mongodb.net/test?retryWrites=true&w=majority";
    }

    static getInstance(){
        if(!this.dataInstance){
            this.dataInstance = new Data();
        }
        return this.dataInstance;
    }

    //method to connect to the database
    openConnection = () => new Promise((resolve,reject) =>{
        mongoDB.connect(this.dbUrl)
        .then(db => {
            resolve(db);
        }).catch(err => {
            reject(MSG.SVR_DAO_CONNERR);
        });
    });

    read = (query, options) =>  new Promise((resolve,reject) => {
        this.openConnection().then(db => {
            let resultArr = [];
            let dbinstance = db.db(DBCONST.DB_NAME);
            let col = dbinstance.collection(DBCONST.COLLECTION_NAME);
            let cursor = col.find(query, options);
            cursor.each(function(err, doc) {
                if(err)
                {
                    db.close();
                    throw MSG.ERR_RD_DB;   
                }else{
                    if(doc != null)
                    {
                        resultArr.push(doc);
                    }else{
    
                        db.close();
                        resolve(resultArr);
                    }
                }
            });
        }).catch(err => {
            reject(err);
        });
    });

    //method for inserting data into the database
    insert = (payload, options) =>  new Promise((resolve,reject) => {
        this.openConnection().then(db => {
            let dbinstance = db.db(DBCONST.DB_NAME);
            let col = dbinstance.collection(DBCONST.COLLECTION_NAME);
    
            col.insertMany(payload, options).then(result => {
                db.close();
                resolve(result);
            }).catch(err => {
                db.close();
                throw MSG.SVR_DAO_WRERR;
            });
        }).catch(err => {
            reject(err);
        });
    });

    update = (query, updatedPayload, options) =>  new Promise((resolve,reject) => {
        this.openConnection().then(db => {
            let dbinstance = db.db(DBCONST.DB_NAME);
            let col = dbinstance.collection(DBCONST.COLLECTION_NAME);
            col.findOneAndUpdate(query, updatedPayload, options).then(result => {
                db.close();
                resolve(result);
            }).catch(err => {
                db.close();
                throw EMSG.SVR_DAO_UPERR;
            });
        }).catch(err => {
            reject(err);
        });
    });
}

module.exports = Data;