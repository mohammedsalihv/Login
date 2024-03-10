const express = require('express')
const router = express.Router();

const username = 'admin';
const password =  'admin@123';

router.get('/', (req,res) =>{

    if(req.session.user){
        res.redirect('/home');

    }else{
      
        if(req.session.passwordwrong){
            res.render('login',{msgerror:'Incorrect username or password'})
            req.session.passwordwrong=false;
        }else{
            res.render('login')
        }
    }
});


router.post('/verify',(req,res) =>{

    if(req.body.username ===  username && req.body.password === password){
  
      req.session.user = req.body.username
      res.redirect('/home');
 
    }else{
    
      req.session.passwordwrong = true
      res.redirect('/');
    }
 })

router.get('/home',(req,res) =>{

     if(req.session.user){
        res.render('home')
    }else{
        
        if(req.session.passwordwrong){
            res.session.passwordwrong=false;
            res.render('login',{msgerror:'Incorrect username or password'})
          
        }else{
            res.render('login')
        }
    }
 
})
router.get('/signout',(req,res)=>{

    req.session.destroy();
    res.render('login',{msgout: 'Signout Successfully'})
 })

 router.use((req, res, next) => {
    res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    next();
});



 module.exports = router;