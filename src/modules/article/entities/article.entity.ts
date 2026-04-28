import { ApiProperty } from "@nestjs/swagger";
import { BaseEntity } from "src/database/entities/base.entity";
import { Column, Entity } from "typeorm";



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

  @Column()
  @ApiProperty()
  imageUrl!: string;

  @Column()
  @ApiProperty()
  content!: string;

  @Column()
  @ApiProperty()
  ispublished!: boolean;

  // @ForeignKey(()=> Auth)
  // @Column({
  //     type:DataType.INTEGER,
  //     allowNull:false
  // })
  // userId!: number

  // @BelongsTo(()=>Auth)
  // user_id!: number

}
