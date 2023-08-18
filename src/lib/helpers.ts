import bcryptjs from 'bcryptjs'

export class Helpers {

    async encryptContraseña(contraseña) {
        const salt = await bcryptjs.genSalt(10);
        const hash = await bcryptjs.hash(contraseña,salt);
        return hash;
    };

    async matchContraseña(contraseña, contraseñaGuardada){
        return await bcryptjs.compare(contraseña, contraseñaGuardada)
    }

    isLoggedIn (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }else{
            return res.redirect('/login');
        }
    }

    isNotLoggedIn (req,res,next){
        if(!req.isAuthenticated()){
            return next();
        }else{
            return res.redirect('/')
        }
        
    }
}

