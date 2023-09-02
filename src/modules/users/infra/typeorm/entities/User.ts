import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("usuarios")
class User {
  @PrimaryColumn()
  id: string;

  @Column()
  nome: string;

  @Column()
  nome_preferencial: string;

  @Column()
  documento: string;

  @Column({ type: "date" })
  data_nascimento: Date;

  @Column()
  email: string;

  @Column()
  senha: string;

  @Column()
  escopo: string;

  @Column()
  nivel: number;

  @Column()
  status: number;

  @CreateDateColumn()
  criado_em: Date;

  @UpdateDateColumn()
  atualizado_em: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { User };
