var Client = require('castv2-client').Client;
var DefaultMediaReceiver = require('castv2-client').DefaultMediaReceiver;
var googletts = require('google-tts-api');

var deviceAddress;
var language;

var device = function(ip, lang = 'en') {
  deviceAddress = ip;
  language = lang;
  return this;
};


var notify = function(message, callback = function() {}) {
  getSpeechUrl(message, deviceAddress, function(res) {
    callback(res);
  });
};

var play = function(mp3_url, callback = function() {}) {
  getPlayUrl(mp3_url, deviceAddress, function(res) {
    callback(res);
  });
};

var getSpeechUrl = function(text, host, callback) {
  googletts(text, language, 1).then(function (url) {
    onDeviceUp(host, url, function(res){
      callback(res);
    });
  }).catch(function (err) {
    console.error(err.stack);
  });
};

var getPlayUrl = function(url, host, callback) {
  onDeviceUp(host, url, function(res){
    callback(res);
  });
};

var onDeviceUp = function(host, url, callback) {
  var client = new Client();
  client.connect(host, function() {
    client.launch(DefaultMediaReceiver, function(err, player) {
      if (!err) {
        var media = {
          contentId: url,
          contentType: 'audio/mp3',
          streamType: 'BUFFERED' // or LIVE
        };
        player.load(media, { autoplay: true }, function(err, status) {
          client.close();
          if (!err) {
            callback('Device notified');
          } else {
            callback('Device notification failed!');
          }
        });
      }
    });
  });

  client.on('error', function(err) {
    console.log('Error: %s', err.message);
    client.close();
    callback('error');
  });
};

exports.device = device;
exports.notify = notify;
exports.play = play;
