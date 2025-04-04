import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tbl_aprehenser_pagina_web')
export class AprehenserPaginaWeb {
  @PrimaryGeneratedColumn({ name: 'PAG_ID' })
  id: number;

  @Column({ name: 'PAG_LOGO', nullable: true })
  logo: string;

  @Column({ name: 'PAG_LOGO_PUCE', nullable: true })
  logoPuce: string;

  @Column({ name: 'PAG_TEXTO', nullable: true })
  texto: string;
}
