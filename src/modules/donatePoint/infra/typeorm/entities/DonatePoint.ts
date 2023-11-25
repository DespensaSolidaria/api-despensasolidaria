import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { UserBiometry } from "@modules/users/infra/typeorm/entities/UserBiometry";

@Entity("pontos_doacao")
class DonatePoint {
  @PrimaryColumn()
  id: string;

  @Column()
  tipo_ponto_doacao: string;

  @Column()
  logradouro: string;

  @Column()
  numero: string;

  @Column()
  complemento: string;

  @Column()
  bairro: string;

  @Column()
  cidade: string;

  @Column()
  uf: string;

  @Column()
  cep: string;

  @Column()
  referencia_endereco: string;

  @Column()
  descricao: string;

  @Column({ select: false })
  token_acesso: string;

  @Column()
  status: number;

  @CreateDateColumn()
  criado_em: Date;

  @UpdateDateColumn()
  atualizado_em: Date;

  @OneToMany(() => UserBiometry, (biometria) => biometria.ponto_doacao)
  @JoinColumn({ name: "id_ponto_doacao", referencedColumnName: "id" })
  biometrias: UserBiometry[];

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { DonatePoint };
