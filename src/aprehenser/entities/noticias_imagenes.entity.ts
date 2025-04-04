// src/aprehenser/entities/noticias_imagenes.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tbl_aprehenser_pagina_web_noticias_imagenes')
export class NoticiasImagenes {
  @PrimaryGeneratedColumn()
  PGNI_ID: number;

  @Column()
  PAGN_ID: number;

  @Column()
  PGNI_IMAGEN: string;

  @Column({ nullable: true })
  PGNI_VIDEO: string;

  @Column({ nullable: true })
  PGNI_PORTADA: boolean;

  @Column()
  PAGNI_ESTADO: number;
}
