import { AllowNull, BelongsTo, Column, DataType, ForeignKey, Model,Table} from "sequelize-typescript";
import { Auth } from "src/auth/model/auth.entity";



@Table({tableName: 'articles', timestamps: true})
export class Article extends Model{
    
      @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    title!:string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    description!:string;
    
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    imageUrl!:string;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
    })
    content!:boolean;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
    })
    ispublished!:boolean;

    @ForeignKey(()=> Auth)
    @Column({
        type:DataType.INTEGER,
        allowNull:false
    })
    userId!: number

    @BelongsTo(()=>Auth)
    user_id!: number

}
