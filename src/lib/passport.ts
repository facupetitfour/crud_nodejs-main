import passport from "passport";
import { Helpers } from "./helpers";
import { CuentaController } from "../controllers/CuentaController";
import { CuentaService } from "../services/CuentaService";
import '../database'
import { CuentasRepository } from "../repositories/CuentasRepository";
import { getCustomRepository, Repository } from "typeorm";
import { Cuenta } from "../entities/Cuenta";
import { Strategy } from "passport";
const LocalStrategy = require('passport-local').Strategy;
const cuentaController = new CuentaController();
const cuentaService = new CuentaService();
const encriptado = new Helpers;



// sing in

passport.use('local.signin', new LocalStrategy ({
  
  usernameField: 'username',
  passwordField: 'contraseña',

  }, async (username, contraseña, done) => {
   
  const cuenta = {
    username,
    contraseña,
  }

  const cuentasRepository = getCustomRepository(CuentasRepository);     
  const cuentaExist = await cuentasRepository.findOne({username})
  console.log("lo que mando:",cuenta)
  console.log("lo que encuentro",cuentaExist)

  if (!!cuentaExist) {
    const validPassword = await encriptado.matchContraseña(contraseña, cuentaExist.contraseña)
    console.log(validPassword)
    if (validPassword) {

      console.log('Sesion iniciada')
      done(null, cuentaExist);

    } else {
      // console.log("ELSE",cuentaExist)
      done(null, false);
    }
  } else {
    console.log('El Usuario no existe')
    return done(null, false);
  }


}));


// registro

passport.use('local.signup',new LocalStrategy({

  usernameField: 'username',
  emailField: 'email',
  passwordField: 'contraseña',
  passReqToCallback: true

}, async (req,username,contraseña, done) =>{
  const { email } = req.body;
  const cuenta = {
    username,
    email,
    contraseña,
  }
  console.log(cuenta)

  const user = await cuentaService.create(cuenta)

  console.log(user)

  return done(null,user)

}));


passport.serializeUser((user: Cuenta,done) =>{
    done(null,user.id)
})

passport.deserializeUser(async (id ,done)=>{
    const user = await cuentaService.getData(id)
    done (null, user)
})