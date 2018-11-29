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
        const hashState = this.decode(hashUrl.substr(1));

        if (hashState) {
          hash = hashState;
        }
      }

      return hash;
    }
};
