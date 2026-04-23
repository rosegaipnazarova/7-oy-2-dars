import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Auth } from './entities/auth.entity';
import * as bcrypt from "bcrypt"
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as nodemailer from "nodemailer"
import { from } from 'rxjs';


@Injectable()
export class AuthService {
  private nodemailer: nodemailer.Trasporter

  constructor (@InjectRepository(Auth) private authRepo: Repository <Auth>) {
    this.nodemailer = nodemailer.createTranport({
      service: "gmail",
      auth: {
        user: "rosegaipnazarova@gmail.com",
        pass: process.env.APP_KEY
      }
    })

  }
  async register(createAuthDto: CreateAuthDto) {
    const {username, email, password} = createAuthDto
    const foundedUser = await this.authRepo.findOne({where: {email}})

    if(foundedUser) throw new BadRequestException("User already exsist")

      const hashPassword = await bcrypt.hash(password, 10)

      const otp = Array.from({length: 6}, () => Math.floor(Math.random() * 9)).join("")

      const time = Date.now()+12000

      await this.nodemailer.sendMail({
        from: "rosegaipnazarova@gmail.com",
        to: email,
        subject: "lesson",
        text: "test content",
        html: `<b>${otp}</b>`
      })

      const user = this.authRepo.create({username, email, password : hashPassword, otp: otp, otpTime: time})
      await this.authRepo.save(user)
    return {message:"Registered"} ;
  }

  // async findAll() {
  //   return await this.authModel.findAll({
  //     attributes: {exclude: ['password']},
  //     include:[{model: Article}]
  //   })
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} auth`;
  // }

  // update(id: number, updateAuthDto: UpdateAuthDto) {
  //   return `This action updates a #${id} auth`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} auth`;
  // }
}
