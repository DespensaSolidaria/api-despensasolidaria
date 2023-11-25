import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { DonatePoint } from "@modules/donatePoint/infra/typeorm/entities/DonatePoint";
import { User } from "@modules/users/infra/typeorm/entities/User";

@Entity("logs")
class Log {
  @PrimaryColumn()
  id: string;

  @Column()
  id_usuario: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "id_usuario" })
  usuario: User;

  @Column()
  id_ponto_doacao: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "id_ponto_doacao" })
  ponto_doacao: DonatePoint;

  @Column()
  tipo_log: string;

  @Column()
  descricao: string;

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

export { Log };
