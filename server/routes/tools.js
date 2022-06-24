module.exports = {
    EmailValidator: function(email) {
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        const validate = email.match(regex);
        return validate;
    },
    HolCodeValidator: function(holcode){
        if(holcode[0]=='#'&&holcode[1]=='G') return true;
        return false;
    },
    PasswordValidator: function(password){
        if(password!=null) return true;
        return false;
    }
}