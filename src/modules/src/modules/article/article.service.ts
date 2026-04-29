import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Article } from './entities/article.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Tag } from '../tag/entities/tag.entity';

@Injectable()
export class ArticleService {
  constructor (@InjectRepository(Article) private articleRepo : Repository<Article>,
  @InjectRepository(Tag) private tagRepo: Repository<Tag>
) {}
  async create(createArticleDto: CreateArticleDto, file: Express.Multer.File, userId) {
    const foundedTags = await this.tagRepo.findBy({id: In(createArticleDto.tags)})
    if(!foundedTags) throw new BadRequestException
    const article = this.articleRepo.create({
      ...createArticleDto,
      author: userId,
      tags: foundedTags
  })
    article.backgroundImage = `http://localhost:4001/uploads/${file.filename}`

    return await this.articleRepo.save(article)
  }

  async findAll(): Promise<Article[]> {
    return await this.articleRepo.find()
  }

  async findOne(id: number) : Promise<Article>  {
    const foundedArticle = await this.articleRepo.findOne({
     where: {id},
      relations: []
    })
    if(!foundedArticle) throw new NotFoundException("Article not found")


    return foundedArticle
  }

  async update(id: number, updateArticleDto: UpdateArticleDto) : Promise<{message: "Updated"}>  {

    const foundedArticle = await this.articleRepo.findOne({where: {id}})
    if(!foundedArticle) throw new NotFoundException("Article not found")
    await this.articleRepo.update(foundedArticle.id, updateArticleDto)

    return {message: "Updated"}
  }

 async remove(id: number): Promise<{message: string }>  {
       const foundedArticle = await this.articleRepo.findOne({where: {id}})
    if(!foundedArticle) throw new NotFoundException("Article not found")
    await this.articleRepo.delete({id})

    return {message: "Deleted"}
  }
}
