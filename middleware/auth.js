


//Task object constructor
var middleware = function (task) {
    this.task = task.task;
    this.status = task.status;
    this.created_at = new Date();
  };




middleware.isLogin = function(req, res, next){
    if( req.session.isLoggedIn == true){        
        next();
    }else{
        res.redirect('/login')
    }
}






  module.exports = middleware ;