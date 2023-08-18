import { getCustomRepository } from "typeorm";
import { CuentasRepository } from "../repositories/CuentasRepository";
import { Cuenta } from "../entities/Cuenta";
import { Helpers } from "../lib/helpers";


interface ICuenta {
  id?: string
  username?: string;
  email?: string;
  contraseña?: string;

}
class CuentaService{
  async create({ username, email, contraseña}: ICuenta) {
    if (!username || !email || !contraseña) {
      throw new Error("Por favor rellene todos los campos");
    }

    const cuentasRepository = getCustomRepository(CuentasRepository);
    const encriptado = new Helpers
    const usernameAlreadyExists = await cuentasRepository.findOne({ username });

    if (usernameAlreadyExists) {
      throw new Error("Username ya esta registrado");
    }

    const emailAlreadyExists = await cuentasRepository.findOne({ email });

    if (emailAlreadyExists) {
      throw new Error("El Email ya esta registrado");
    }

    contraseña = await encriptado.encryptContraseña(contraseña)
    const user = cuentasRepository.create({ username, email, contraseña});
    
    await cuentasRepository.save(user);
  
    return user

  }
  
  async devolverCuenta(username ){

    const cuentasRepository = getCustomRepository(CuentasRepository);
    return await cuentasRepository.findOne({ username });
  }
  async delete(id: string) {
    const cuentaRepository = getCustomRepository(CuentasRepository);

    const user = await cuentaRepository
      .createQueryBuilder()
      .delete()
      .from(Cuenta)
      .where("id = :id", { id })
      .execute();

    return user;

  }
  // async delete(username) {
  //   const cuentaRepository = getCustomRepository(CuentasRepository);

  //   const user = await cuentaRepository
  //     .createQueryBuilder()
  //     .select()
  //     .from(Cuenta,username)
  //     .where({ username })

  //   return user;

  // }
  
  async getData(username) {
    const cuentasRepository = getCustomRepository(CuentasRepository);

    const user = await cuentasRepository.findOne(username);

    return user;
  }
  async getDataAccount(username) {
    const cuentasRepository = getCustomRepository(CuentasRepository);

    const user = await cuentasRepository.findByIds(username);
    // console.log("SERVICE: ",user[0].)
    return user[0];
  }

  async update({ id,username,email,contraseña}: ICuenta) {
    const cuentasRepository = getCustomRepository(CuentasRepository);
    // console.log(id,username,email,contraseña)
    const user = await cuentasRepository
      .createQueryBuilder()
      .update(Cuenta)
      .set({username,email,contraseña})
      .where("id = :id", { id })
      .execute();
    console.log(user)
    return user;

  }

  async autentication({ username, contraseña}: ICuenta) {
    if (!username || !contraseña) {
      throw new Error("Por favor rellene todos los campos");
    }

    const desencriptado = new Helpers
    const cuentasRepository = getCustomRepository(CuentasRepository);
    const cuentaAlreadyExists = await cuentasRepository.findOne({ username });

    if(!cuentaAlreadyExists){
      const contraseña_desencriptado = desencriptado.matchContraseña(contraseña, cuentaAlreadyExists.contraseña )
      console.log("CONTRASEÑA cuenta service autenticacion:",contraseña_desencriptado)
      if (contraseña_desencriptado) {
      return true
      }else{
        return false
      }  
    }else{
      return false
    }
  }

}


export { CuentaService };
