import { response, Router } from "express";
import { CuentaController } from "../controllers/CuentaController";
import passport from "passport";
import { Helpers } from "../lib/helpers";
const protect = new Helpers;

export const routerCuenta = Router();
const createCuentaController = new CuentaController();
const updateCuentaController = new CuentaController();
const deleteCuentaController = new CuentaController();
const getCuentaDataController = new CuentaController();
const autenticationController = new CuentaController

//  ------------- Categoria ---------------

routerCuenta.get('/',protect.isNotLoggedIn, function(req,res){
  res.render("login")
})

routerCuenta.post("/",passport.authenticate('local.signin',{
  
  successRedirect:'/',
  failureRedirect:'/login',
  failureFlash: true
}));

routerCuenta.get("/registrarse", (request, response) => {
  response.render("registrarse");
});

routerCuenta.post('/registrarse',passport.authenticate('local.signup',{
  
  successRedirect:'/login',
  failureRedirect:'/login/registrarse',
  failureFlash: true
}));

routerCuenta.get('/logout', (req, res,next) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
  res.redirect("/")
});

// routerCuenta.get("/edit" ,getCuentaDataController.getdatahandle);

// routerCuenta.post("/edit", updateCuentaController.updatehandle);

// routerCuenta.post("/delete", deleteCuentaController.deletehandle);



