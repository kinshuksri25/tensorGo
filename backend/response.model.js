//Response Payload model class

class ResponseModel{    

    constructor(msg = "",data = {}){
        this.msg = msg;
        this.data = data;
    }

    setMsg = (msg) =>{
        this.msg = msg;
    }

    setData = (data) => {
        this.data = data;
    }

    getResponse = () =>{
        return {
            msg : this.msg,
            data : this.data
        }
    }
}

module.exports = ResponseModel;