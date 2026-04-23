

import { BaseEntity, Column, Entity} from "typeorm";


@Entity({name: "auth"})
export class Auth extends BaseEntity{
    
      @Column({nullable: true})
    username!:string;

    @Column()
    email!:string;
    
    @Column()
    password!:string;

    @Column({type:'enum'})
    role!: string;

    @Column()
    otp!:string;

  @Column({type: "bigint"})
  otpTime!: number;


    // @HasMany(()=> Article)
    // articles?:Article[]

    // @BeforeCreate
    // static async hashPassword(user: Auth){
    //     user.password = await bcrypt.hash(user.password, 12)
    // }
}
