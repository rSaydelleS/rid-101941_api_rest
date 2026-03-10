import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import User from "src/db/entities/users/user.entity";
import { UserInterface, Createuser, UpdateUserInterface } from "src/types/UserInterface";
import { Repository } from "typeorm";
import {compare, hashSync} from "bcrypt";

@Injectable()
export default class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ){}

  async getAllUsers():Promise<UserInterface[]> {
    const findAll = await this.userRepository.find();
    return findAll;
  };

  async getOneUser(id:number):Promise<UserInterface | null> {
      const founded = await this.userRepository.findOneBy({ id });
      if (founded?.id) {
        return founded;
      };
      return null;
  };

  async create({name, email, password}: Createuser):Promise<string|undefined> {
    try {
      const hashedPassword = await hashSync(password, 10)
      const createUser = await this.userRepository.create({
        name: name,
        email: email,
        password: hashedPassword
      });
      await this.userRepository.save(createUser);
      return 'Usuário criado com sucesso!'
    } catch (error) {
      console.error('erro na criação do usuário', error)
    };
  }

  async updateUser({id, name, email, password}: UpdateUserInterface):Promise<string | undefined > {
    const founded = await this.userRepository.findOneBy({id});
    if (founded?.id) {
      let newHashedPassword: string | undefined = undefined;
      if (typeof password === 'string' && password.length) {
        newHashedPassword = hashSync(password, 10);
      };
      if (typeof name === 'string' && name.length > 0) {
        founded.name = name;
      }
      if (typeof email === 'string' && email.length > 0) {
        founded.email = email;
      }
      if (typeof newHashedPassword === 'string' && newHashedPassword.length > 0) {
        founded.password = newHashedPassword;
      }
      await this.userRepository.save(founded);
      return "Usuário atualizado com sucesso";
    };
    return "Usuário não encontrado"
  };

  async deleteUser(id: number):Promise<string> {
    const founded = await this.userRepository.findOneBy({id});
    if(founded?.id) {
      this.userRepository.delete(id);
      return `Usuário de id (${id}) deletado com sucesso`
    };
    return `O usuário de id (${id}) não existe na base de dados`
  };
}
