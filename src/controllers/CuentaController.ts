import { Request, Response } from "express";
import { CuentaService } from "../services/CuentaService";
import { Helpers } from "../lib/helpers";
import passport from "passport";
const encriptado = new Helpers;

class CuentaController {

  async createhandle(request: Request, response: Response) {
    const { username, email, contraseña } = request.body;

    const createCuentaService = new CuentaService();

    try {
      await createCuentaService.create({
        username,
        email,
        contraseña,
      }).then(() => {
        response.render("message", {
          message: "Regristrado creado correctamente"
        });
      });
    } catch (err) {
      response.render("message", {
        message: `Error al Regristrarse ${err.message}`
      });
    }

  }
  // async createhandle(cuenta) {
  //   const { username, email, contraseña} = cuenta

  //   const createCuentaService = new CuentaService();

  //   createCuentaService.create({
  //     username,
  //     email,
  //     contraseña,
  //   })


  // }
  async devolverCuentahandle(request: Request) {
    const { username, email, contraseña } = request.body;
    const devolverCuenta = new CuentaService();

    devolverCuenta.devolverCuenta({ username, email, contraseña })

    return devolverCuenta
  }
  
  async deletehandle(request: Request, response: Response) {
    const { id } = request.body;

    const deleteCuentaService = new CuentaService();

    try {
      await deleteCuentaService.delete(id).then(() => {
        response.render("message", {
          message: "Cuenta eliminado correctamente"
        });
      });
    } catch (err) {
      response.render("message", {
        message: `Error al eliminar Cuenta: ${err.message}`
      });
    }
  }
  async deletehandleMiAccount(request: Request, response: Response, next) {
    const id  = request.params.id;

    const deleteCuentaService = new CuentaService();

    try {
      await deleteCuentaService.delete(id).then(() => {
        request.logout(function(err) {
          if (err) { return next(err); }
          response.redirect('/login');
        });
        response.render("message", {
          message: "Cuenta eliminada correctamente"
        });
      });
    } catch (err) {
      response.render("message", {
        message: `Error al eliminar Cuenta: ${err.message}`
      });
    }
  }

  // async getdatahandle(request: Request, response: Response) {
  //   let { id } = request.query;
  //   id = id.toString();

  //   const getCuentaDataService = new CuentaService();

  //   const user = await getCuentaDataService.getData(id);

  //   return response.render("edit", {
  //     user: user
  //   });
  // }
  async getdatahandle(cuenta) {
    let { username } = cuenta;
    username = username.toString();

    const getCuentaDataService = new CuentaService();

    const user = await getCuentaDataService.getData(username);

    return { user: user }
  };
  async getdatahandleMiAccount(req, res) {
    try {
      let username = req.user.id;
      const getCuentaDataService = new CuentaService();

      const user = await getCuentaDataService.getDataAccount(username);
      return res.render("1_miAccount", {
        user: user
      })
    } catch (error) {
      console.log(error)
      return res.json({ error: error })
    }

  };
  async getdatahandleMiAccountDelete(req, res) {
    try {
      let username = req.user.id;
      const getCuentaDataService = new CuentaService();

      const user = await getCuentaDataService.getDataAccount(username);
      return res.render("2_deleteAccount", {
        user: user
      })
    } catch (error) {
      console.log(error)
      return res.json({ error: error })
    }

  };


  async updatehandle(request: Request, response: Response, next) {
    let { username, email, contraseña } = request.body;
    // console.log(request.params.id)
    const id = request.params.id
    contraseña = await encriptado.encryptContraseña(contraseña)
    const updateCuentaService = new CuentaService();

    try {
      await updateCuentaService.update({id,username, email, contraseña }).then(() => {
        request.logout(function(err) {
          if (err) { return next(err); }
          response.redirect('/login');
        });
        response.redirect('/login');
      });
    } catch (err) {
      response.render("message", {
        message: `Error al actualizar Cuenta: ${err.message}`
      });
    }

  }

  async loginautentication(cuenta) {
    const { username, contraseña } = cuenta
    const loginCuentaAutenticacion = new CuentaService;

    return await loginCuentaAutenticacion.autentication({
      username,
      contraseña

    });
  }

}



export { CuentaController };
