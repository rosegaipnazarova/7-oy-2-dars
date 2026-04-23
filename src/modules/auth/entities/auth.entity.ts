

import { RoleUser } from "src/shared/enums/role.enum";
import { BaseEntity, Column, Entity} from "typeorm";


@Entity({name: "auth"})
export class Auth extends BaseEntity{
    
      @Column({nullable: true})
    username!:string;

    @Column()
    email!:string;
    
    @Column()
    password!:string;

    @Column({type:'enum', enum: RoleUser, default: RoleUser.USER})
    role!: RoleUser;

    @Column({nullable: true})
    otp!:string;

  @Column({type: "bigint", nullable: true})
  otpTime!: number;
  id: string | number | FindOptionsWhere<Auth> | FindOptionsWhere<Auth>[] | Date | ObjectId | number[] | string[] | Date[] | ObjectId[];


    // @HasMany(()=> Article)
    // articles?:Article[]

    // @BeforeCreate
    // static async hashPassword(user: Auth){
    //     user.password = await bcrypt.hash(user.password, 12)
    // }
}
