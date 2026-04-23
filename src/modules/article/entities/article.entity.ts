import { BaseEntity } from "src/database/entities/base.entity";
import { Column, Entity } from "typeorm";



@Entity({name: 'articles'})
export class Article extends BaseEntity{
    
      @Column()
    title!:string;

    @Column()
    description!:string;
    
    @Column()
    imageUrl!:string;

    @Column()
    content!:boolean;

    @Column()
    ispublished!:boolean;

    // @ForeignKey(()=> Auth)
    // @Column({
    //     type:DataType.INTEGER,
    //     allowNull:false
    // })
    // userId!: number

    // @BelongsTo(()=>Auth)
    // user_id!: number

}
