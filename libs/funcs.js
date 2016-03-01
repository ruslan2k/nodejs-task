var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
var possible_length = possible.length;
var DEF_L = 6;

module.exports = {
  getRandomString: function (l)
  {
    var text = "";
    l = typeof l !== 'undefined' ? l : DEF_L;
  
    for (var i = 0; i < l; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible_length));
    }
  
    return text;
  },
  
  genUid: function (l)
  {
    var int_uid = 0;
    var str_uid = "";
    l = typeof l !== 'undefined' ? l : DEF_L;

    for (var i = 0; i < l; i++) {
      var r = Math.floor(Math.random() * possible_length);
      var c = possible.charAt(r);
      str_uid += c;
      int_uid = int_uid * 100 + c.charCodeAt() - 64;
    }
    return {"int_uid": int_uid, "str_uid": str_uid};
  },

  strUidtoInt: function (str_uid)
  {
    var int_uid = 0;
    var l = str_uid.length;

    for (var i = 0; i < l; i++) {
      int_uid = int_uid * 100 + str_uid.charAt(i).charCodeAt() - 64;
    }
    return int_uid;
  }
};
