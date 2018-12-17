import axios from 'axios';
const url = 'http://localhost:3007/graphql';

class data {
    constructor(method, data, api, headers) {
        this.api = api;
        this.data = data;
        this.headers = headers || {};
        this.method =  method.toUpperCase();
        var self = this;
        this.q = data;
        return new Promise((resolve, reject) => {
            self.doConnect((res,err) => {
                if(err) {
                    reject(err);
                }
                resolve(res);
            });
        });
    }

    doConnect(cb){
      this.headers['Accept'] = 'application/json';
      this.headers['Content-Type'] = 'application/json';
      this.headers['Access-Control-Allow-Origin'] = url;
      
      axios({
        method: 'post' ,
        url: url,
        headers: this.headers,
        data: { query: this.q }
      }).then(function (response) {
            console.log(response,'response');
            return cb(response,null);
          })
          .catch(function (error) {
            console.log(error);
            return cb(null,error);
          });
    }

}

export default data;