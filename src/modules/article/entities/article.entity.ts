import { ApiProperty } from "@nestjs/swagger";
import { BaseEntity } from "src/database/entities/base.entity";
import { Auth } from "src/modules/auth/entities/auth.entity";
import { Tag } from "src/modules/tag/entities/tag.entity";
import { Column, DeleteDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne } from "typeorm";



@Entity({ name: 'articles' })
export class Article extends BaseEntity {

  @Column()
  @ApiProperty()
  title!: string;

  @Column()
  @ApiProperty()
  description!: string;

  @Column()
  backgroundImage!: string;

  @DeleteDateColumn({nullable: true})
  declare deletedAt: Date;


  @Column()
  @ApiProperty()
  imageUrl!: string;

  @Column()
  @ApiProperty()
  content!: string;

  @Column()
  @ApiProperty()
  ispublished!: boolean;

  @ManyToOne(() => Auth, (user) => user.articles )
  @JoinColumn({ name: "user_id" })
  author!: Auth;

    @ManyToMany(() => Tag, (tag) => tag.articles, {nullable: false})
  @JoinTable({ name: "tag_id" })
  tags!: Tag[];

  // @ForeignKey(()=> Auth)
  // @Column({
  //     type:DataType.INTEGER,
  //     allowNull:false
  // })
  // userId!: number

  // @BelongsTo(()=>Auth)
  // user_id!: number

}
