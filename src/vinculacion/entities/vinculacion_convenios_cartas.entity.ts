import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tbl_vinculacion_convenios_cartas')
export class VinculacionConveniosCartas {
  @PrimaryGeneratedColumn({ name: 'VINCC_ID' })
  id: number;

  @Column({ name: 'VINE_ID' })
  vineId: number;

  @Column({ name: 'VINCC_LINK' })
  link: string;

  @Column({ name: 'VINCC_ESTADO' })
  estado: number;
}
