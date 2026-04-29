import { Article } from "src/modules/article/entities/article.entity";
import { Auth } from "src/modules/auth/entities/auth.entity";
import { 
  BaseEntity, 
  Column, 
  Entity, 
  JoinColumn, 
  ManyToMany, 
  ManyToOne, 
  PrimaryGeneratedColumn 
  
} from "typeorm";

@Entity({name: "tag"})
export class Tag extends BaseEntity {
    @PrimaryGeneratedColumn() 
    id!: number;

    @Column({unique: true})
    name!: string;

    @ManyToOne(() => Auth, (user) => user.tags, {nullable: false})
    @JoinColumn({ name: "user_id" })
    createdBy!: Auth;

    @ManyToMany(() => Article, (article) => article.tags)
    articles!: Article[];
}