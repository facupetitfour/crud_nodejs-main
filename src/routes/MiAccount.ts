import { Router } from "express";
import { CuentaController } from "../controllers/CuentaController";
import { Helpers } from "../lib/helpers";
const protect = new Helpers;

export const routerMiAccount = Router();

const cuentaController = new CuentaController();

routerMiAccount.get('/me',cuentaController.getdatahandleMiAccount)
routerMiAccount.post('/meUpdate/:id',cuentaController.updatehandle)
routerMiAccount.get('/delete',cuentaController.getdatahandleMiAccountDelete)
routerMiAccount.post('/delete/:id',cuentaController.deletehandleMiAccount)

