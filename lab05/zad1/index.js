
// Your Vue code here....


var app = new Vue({
    el: '#app',
    data: {
      message: ''
    },
    methods: {
      has_uppercase: function () {
        var re = /(?=.*[A-Z])/
          return re.test(this.message)
      },
      has_lowercase: function () {
        var re = /(?=.*[a-z])/
          return re.test(this.message)
      },
      has_number: function () {
        var re = /(?=.*\d)/
          return re.test(this.message)
      },
      has_special: function () {
        var re = /(?=.*[-+_!@#$%^&*.,?])/
        return re.test(this.message)
      }
    }
  })