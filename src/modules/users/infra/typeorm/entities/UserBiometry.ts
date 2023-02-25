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

import { User } from "./User";

@Entity("biometrias_usuarios")
class UserBiometry {
  @PrimaryColumn()
  id: string;

  @Column()
  id_usuario: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "id_usuario" })
  usuario: User;

  @Column()
  codigo_biometria: string;

  @Column()
  status: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { UserBiometry };
