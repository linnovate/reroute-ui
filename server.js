const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();
const PORT = process.env.PORT || 9000;
const RULES_API = process.env.RULES_API;

app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

const talkToApi = function (options, callback) {
  var objReq = {
    uri: RULES_API + options.cmd_api,
    method: options.method,
    headers: {},
  };

  if (options.form) {
    objReq.form = options.form;
    objReq.headers['Content-Type'] = 'multipart/form-data';
  }

  request(objReq, function (error, response, body) {
    if (!error && response.statusCode === 200 && response.body.length) {
      try {
        return callback(null, JSON.parse(body));
      } catch (e) {
        return callback(null, body);
      }
    }
    return callback(error ? error : body, response);
  });
}


app.route('/api/rules/:id?')
  .all(function (req, res) {
    const options = {
      cmd_api: req.originalUrl,
      method: req.method,
      form: req.body
    };
    talkToApi(options, function (err, data) {
      if (err) return res.status(500).send(err);
      res.send(data);
    });
  });

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT);
console.log(`application is running on port ${PORT}`);