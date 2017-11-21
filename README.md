# google-home-notifier
Send notifications to Google Home

#### Installation
```sh
$ git clone https://github.com/thunderace/google-home-notifier
$ cd google-home-notifier
$ npm install
$ node test.js
```

#### Usage
```javascript
var googlehome = require('google-home-notifier');

googlehome.device('192.168.1.211', 'us'); 
googlehome.notify('Hey Foo', function(res) {
  console.log(res);
});
```
