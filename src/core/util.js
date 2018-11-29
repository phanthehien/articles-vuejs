const util = {
    guid: function () {
      const s4 = () => Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);

      return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
    },

    getSubString: function (text, length = 30) {
      if (text) {
        return `${text.slice(0, length)}...`;
      }
      return text;
    },

    formatDate: function (date) {
      const dd = date.getDate();
      const mm = date.getMonth() + 1;
      const yy = date.getFullYear();

      return `${yy}-${mm}-${dd}`;
    },

    validateEmail: function (email) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },

    encode: function(content) {
      return encodeURI(content);
    },

    decode: function(content) {
      return decodeURI(content);
    },

    getHash: function(hashUrl) {
      let hash = null;

      if (hashUrl && hashUrl.length > 1 && hashUrl[0]) {
        const hashState = hashUrl.substr(1);

        if (hashState) {
          hash = hashState;
        }
      }

      return hash;
    },

    setByDot: function set(obj, path, value, doNotReplace){
      const getKey = function (key){
        var intKey = parseInt(key);
        if (intKey.toString() === key) {
          return intKey;
        }
        return key;
      };

      const getShallowProperty = function (obj, prop) {
        if (hasShallowProperty(obj, prop)) {
          return obj[prop];
        }
      };

      const hasShallowProperty = function (obj, prop) {
        return ((typeof prop === 'number' && Array.isArray(obj)) || hasOwnProperty(obj, prop))
      };

      const hasOwnProperty = function (obj, prop) {
        if(obj == null) {
          return false
        }
        //to handle objects with null prototypes (too edge case?)
        return Object.prototype.hasOwnProperty.call(obj, prop)
      };


      if (typeof path === 'number') {
        path = [path];
      }
      if (!path || path.length === 0) {
        return obj;
      }
      if (typeof path === 'string') {
        return set(obj, path.split('.').map(getKey), value, doNotReplace);
      }

      var currentPath = path[0];
      var currentValue = getShallowProperty(obj, currentPath);
      if (path.length === 1) {
        if (currentValue === void 0 || !doNotReplace) {
          obj[currentPath] = value;
        }
        return currentValue;
      }

      if (currentValue === void 0) {
        //check if we assume an array
        if(typeof path[1] === 'number') {
          obj[currentPath] = [];
        } else {
          obj[currentPath] = {};
        }
      }

      return set(obj[currentPath], path.slice(1), value, doNotReplace);
    }
};
