import "reflect-metadata";
import "express-async-errors";
import express, { Request, Response, NextFunction } from "express";
import path from "path";
import { routerUser } from "./routes/UsuarioRouter";
import { routerProductos } from "./routes/ProductoRouter";
import { routerCuenta } from "./routes/CuentaRouter";
import { routerCategoria } from "./routes/CategoriaRouter";
import { router } from "./routes/Router";
import "./database"; //Conexion con la base de datos.
import  session  from "express-session";
import passport from "passport";
import './lib/passport';
const flash = require('connect-flash');
var cookieParser = require('cookie-parser')
import { Helpers } from "./lib/helpers";
const protect = new Helpers;

const app = express();
app.use(cookieParser('keyboard cat'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());


//Middleware - rutas


app.use(router);
app.use("/user", protect.isLoggedIn ,routerUser);
app.use("/productos", protect.isLoggedIn,routerProductos);
app.use("/login", routerCuenta);
app.use("/categoria",protect.isLoggedIn ,routerCategoria)

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if (err instanceof Error) {
    return response.status(400).json({
      error: err.message,
    });
  }

  return response.status(500).json({
    status: "error",
    message: "Internal Server Error",
  });
});

app.use(express.static(path.join(__dirname, "..", "/public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "..", "views"));

app.listen(3000, () => {
  console.log("Server is running at port 3000");
});
