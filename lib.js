'use strict';

var User = (function() {

  // module private member
  var isOnLine = true;

  // User constructor
  function User(config) {
    if(typeof config === 'object') {
      for (var key in config) {
        if(config.hasOwnProperty(key)) {
          this[key] = config[key];
        }
      }
    }
  }

  // User prototype
  User.prototype = {
    toJSONString: function() {
      return JSON.stringify(this);
    },
    readFromJSONString: function(str) {
      var obj = JSON.parse(str);

      for(var key in obj) {
        if(obj.hasOwnProperty(key)) {
          this[key] = obj[key];
        }
      }
    },
    isPhoneNumberFormatValid: function() {
      var phoneRegex = /^\(?\d{3}\)?\d{3}-?\d{4}$/;
      return phoneRegex.test(this.phone);

    },
    isValidEmail: function() {
      var emailRegex = /^[^@]+@([^@\.]+\.)+[^@\.]+$/;
      return emailRegex.test(this.email);
    }
  };
  User.prototype.constructor = User;

  // User static members
  User.saveToLocalStorage = function(user) {
    localStorage.setItem('user', user.toJSONString());
  };
  User.saveToSessionStorage = function(user) {
    if(!isOnLine) {
      User.saveToLocalStorage(user);
    }
    sessionStorage.setItem('user', user.toJSONString());
  };
  User.readFromLocalStorage = function() {
    var user = new User(),
        jsonStr = localStorage.getItem('user');
    user.readFromJSONString(jsonStr);
    return user;
  };
  User.readFromSessionStorage = function() {
    if(!isOnLine) {
      return User.readFromLocalStorage();
    }
    var user = new User(),
        jsonStr = sessionStorage.getItem('user');
    user.readFromJSONString(jsonStr);
    return user;
  };
  User.onNetworkChange = function() {
    isOnLine = !!navigator.onLine;
  };

  return User;
})();