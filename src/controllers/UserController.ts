import { Request, Response } from "express";
import { UserService } from "../services/UserService";


class UserController{

  async createhandle(request: Request, response: Response) {
    const { username, email, telefono, ciudad, estado } = request.body;

    const createUserService = new UserService();

    try {
      await createUserService.create({
        username,
        email,
        telefono,
        ciudad,
        estado
      }).then(() => {
        response.render("message", {
          message: "Usuário creado correctamente"
        });
      });
    } catch (err) {
      response.render("message", {
        message: `Error al crear usuario: ${err.message}`
      });
    }

  }

  async deletehandle(request: Request, response: Response) {
    const { id } = request.body;

    const deleteUserService = new UserService();

    try {
      await deleteUserService.delete(id).then(() => {
        response.render("message", {
          message: "Usuário eliminado correctamente"
        });
      });
    } catch (err) {
      response.render("message", {
        message: `Error al eliminaar usuário: ${err.message}`
      });
    }
  }
  async getdatahandle(request: Request, response: Response) {
    let { id } = request.query;
    id = id.toString();

    const getUserDataService = new UserService();

    const user = await getUserDataService.getData(id);

    return response.render("1_miAccount", {
      user: user
    });
  }

  async listhandle(request: Request, response: Response) {
    const listUsersService = new UserService();

    const users = await listUsersService.list();

    return response.render("usuarios", {
      users: users
    });
  }
  async searchhandle(request: Request, response: Response) {
    let { search } = request.query;
    search = search.toString();

    const searchUserService = new UserService();

    try {
      const users = await searchUserService.search(search);
      response.render("search", {
        users: users,
        search: search
      });
    } catch (err) {
      response.render("message", {
        message: ` buscar usuário: ${err.message}`
      });
    }
  }
  async updatehandle(request: Request, response: Response) {
    const { id, username, email, telefono, ciudad, estado } = request.body;

    const updateUserService = new UserService();

    try {
      await updateUserService.update({ id, username, email, telefono, ciudad, estado }).then(() => {
        response.render("message", {
          message: "Usuário actualizado correctamente"
        });
      });
    } catch (err) {
      response.render("message", {
        message: `Error al actualizar usuario: ${err.message}`
      });
    }

  }
}


export { UserController };
