const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const ServiceLayer = require("./service.js");

const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,"../frontend/dist")));

const serviceInstance = ServiceLayer.getInstance();

app.get('/api/generateData',(req,res)=>{
    serviceInstance.generateData().then(resolvedResponse => {
        res.redirect('/api/fetchData');
        //can we add response before??
    }).catch(rejectedResponse => {
        res.json(rejectedResponse);
    });
});

app.get("/api/fetchData",(req,res)=>{
    serviceInstance.fetchData().then(resolvedResponse => {
        res.status(200).json(resolvedResponse);
    }).catch(rejectedResponse => {
        res.status(500).json(rejectedResponse);
    });
});

app.put("/api/updateData",(req,res)=>{
    serviceInstance.updateData(req.body).then(resolvedResponse => {
        res.status(200).json(resolvedResponse);
    }).catch(rejectedResponse =>{
        res.status(500).json(rejectedResponse);
    });
});

app.get("*",(req,res) =>{
    res.sendFile(path.join(__dirname,'../frontend/dist/index.html'));
});

app.listen(3010,()=>{
    console.log(`App starting at localhost:8990`);
});