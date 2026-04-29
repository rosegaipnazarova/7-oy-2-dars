import { Article } from "src/modules/article/entities/article.entity";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm";

@Entity({ name: "article_image" })
export class ArticleImage extends BaseEntity {

  @Column({ type: "varchar", length: 500 })
  url!: string;

  @Column({ type: "integer", default: 0 })
  sortorder!: number;

  @ManyToOne(() => Article, (article) => article.images, { onDelete: 'CASCADE' })
  @JoinColumn({ name: "article_id" })
  article!: Article;
}