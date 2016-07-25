var User = require('../model/User');

module.exports = function(app,passport){
// local routes

app.get('/', function (req, res) {
            if(req.isAuthenticated()){
                 res.render('home',{
                     homeClass:'class="active"',
                 displayName:req.user.name
                });
    
            }
            else{
                res.render('home',{homeClass:'class="active"'});

            }
           
});

app.get(
  '/check',
  function( req, res ) {
    res.send( req.isAuthenticated() );
    // res.send(req.user);
  }
);

app.get('/logout',function(req,res){
     req.logout();
    res.redirect('/');
});



app.get('/register',function(req,res){
            if(req.isAuthenticated()){
        res.render('register',{
            errors: errors , 
            registerClass:'class="active"' ,
            displayName:req.user.name
            });

            }
            else{
    res.render('register',{errors: errors , registerClass:'class="active"'});

            }
    var errors = req.flash('signupMessage');


});

// app.get('/test',passport.authenticate('local'));
app.post('/register', passport.authenticate('local-signup', {
         successRedirect : '/myinfo', // redirect to the secure profile section
         failureRedirect : '/register', // redirect back to the signup page if there is an error
         failureFlash : 'Invalid username or password.' // allow flash messages
     }));

app.get('/login',function(req,res){

    var errors = req.flash('signinMessage');

    if(req.isAuthenticated()){
    res.render('login',{
        errors: errors,
        loginClass:'class="active"',
        displayName:req.user.name
     });

    }
    else{
    res.render('login',{errors: errors,loginClass:'class="active"' });

    }

});

app.post('/login', passport.authenticate('local-signin', {
         successRedirect : '/myinfo', // redirect to the secure profile section
         failureRedirect : '/login', // redirect back to the signup page if there is an error
         failureFlash : 'Invalid username or password.' // allow flash messages
     }));


app.get('/myinfo',function(req,res){
        if(req.isAuthenticated()){
            res.render('myinfo',{
                myinfoClass:'class="active"',
                displayName:req.user.name

            });

        }
        else{
             res.render('myinfo',{myinfoClass:'class="active"'});

        }
});
 
 







// end local routes

//// github route
app.get('/auth/github',passport.authenticate('github',{scope:['user']}));

app.get('/auth/github/callback',passport.authenticate('github',{
    successRedirect: '/myinfo',
    failureRedirect : '/login'
}));
//// end github route


//// google route
app.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));

app.get('/auth/google/callback',passport.authenticate('google',{
    successRedirect: '/myinfo',
    failureRedirect : '/login'
}));
//// end google route

//// facebook route
app.get('/auth/facebook',passport.authenticate('facebook'));

app.get('/auth/facebook/callback',passport.authenticate('facebook',{
    successRedirect: '/myinfo',
    failureRedirect : '/login'
}));

//// end  facebook route
}
