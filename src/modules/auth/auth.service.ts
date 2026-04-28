import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Auth } from './entities/auth.entity';
import * as bcrypt from "bcrypt"
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as nodemailer from "nodemailer"
import { VerifyDto } from './dto/verify.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';


@Injectable()
export class AuthService {
  private nodemailer: nodemailer.Trasnporter;

  constructor(
    @InjectRepository(Auth) private authRepo: Repository<Auth>,
    private jwtService: JwtService
  ) {
    this.nodemailer = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "rosegaipnazarova@gmail.com",
        pass: process.env.APP_KEY
      }
    })

  }
  async register(createAuthDto: CreateAuthDto) {
    const { username, email, password } = createAuthDto
    const foundedUser = await this.authRepo.findOne({ where: { email } })

    if (foundedUser) throw new BadRequestException("User already exsist")

    const hashPassword = await bcrypt.hash(password, 10)

    const otp = Array.from({ length: 6 }, () => Math.floor(Math.random() * 9)).join("")

    const time = Date.now() + 12000

    await this.nodemailer.sendMail({
      from: "rosegaipnazarova@gmail.com",
      to: email,
      subject: "lesson",
      text: "test content",
      html: `<b>${otp}</b>`
    })

    const user = this.authRepo.create({ username, email, password: hashPassword, otp: otp, otpTime: time })
    await this.authRepo.save(user)
    return { message: "Registered" };
  }

  async verify(dto: VerifyDto) {
    const { email, otp } = dto

    const foundedUser = await this.authRepo.findOne({ where: { email } })

    const otpValidation = /^\s{6}$/.test(otp)

    if (otpValidation) throw new BadRequestException("Invalid otp")

    if (!foundedUser) throw new UnauthorizedException("Email not found")

    if (foundedUser.otp !== otp) throw new BadRequestException("Wrong otp")

    const now = Date.now()
    if (foundedUser.otpTime && foundedUser.otpTime < now) throw new BadRequestException("Otp expired")
    await this.authRepo.update(foundedUser.id!, { otp: "", otpTime: 0 })

    const payload = { username: foundedUser.username, role: foundedUser.role };
    return {
      access_token: await this.jwtService.signAsync(payload)
    }

  }


  async login(LoginDto: LoginDto) {
    const { email, password } = LoginDto
    const foundedUser = await this.authRepo.findOne({ where: { email } })

    if (!foundedUser) throw new BadRequestException("User not found")

    const checkPassword = await bcrypt.compare(password, foundedUser.password)

    if (checkPassword) {

      const otp = Array.from({ length: 6 }, () => Math.floor(Math.random() * 9)).join("")

      const time = Date.now() + 12000

      await this.nodemailer.sendMail({
        from: "rosegaipnazarova@gmail.com",
        to: email,
        subject: "lesson",
        text: "test content",
        html: `<b>${otp}</b>`
      })

      await this.authRepo.update(foundedUser.id,{otp, otpTime: time})

       return { message: "Please chech your email!" };
    } else {
      throw new BadRequestException("Wrong password!")
    }

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
