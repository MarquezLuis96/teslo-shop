import {
  Body,
  Controller,
  Get,
  Headers,
  Post,
  Req,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './decorators/get-user.decorator';
import { User } from './entities/user.entity';
import { RawHeaders } from './decorators/raw-headers.decorator';
import * as http from 'http';
import { UserRoleGuardGuard } from './guards/user-role-guard/user-role-guard.guard';
import { Auth, RoleProtected } from './decorators';
import { ValidRoles } from './interfaces';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('private')
  @UseGuards(AuthGuard())
  testingPrivateRoute(
    // @Req() request: Express.Request,
    // @GetUser(['email', 'role', 'fullName']) user: User,
    @GetUser() user: User,
    @GetUser('email') userEmail: string,
    @RawHeaders() rawHeaders: string[],
    @Headers() headers: http.IncomingHttpHeaders,
  ) {
    // console.log('REQUEST: ', request);
    // console.log('User: ', user);
    console.log('User: ', userEmail);
    console.log('rawHeaders: ', rawHeaders);
    console.log('headers: ', headers);
    return {
      ok: true,
      message: 'Hola mundo private.',
      user: user,
      userEmail: userEmail,
      rawHeaders: rawHeaders,
    };
  }

  @Get('private2')
  @SetMetadata('roles', ['admin', 'superuser'])
  @UseGuards(AuthGuard(), UserRoleGuardGuard)
  privateRoute2(@GetUser() user: User) {
    return {
      ok: true,
      user: user,
    };
  }

  @Get('private3')
  @RoleProtected(ValidRoles.superUser, ValidRoles.admin, ValidRoles.user)
  @UseGuards(AuthGuard(), UserRoleGuardGuard)
  privateRoute3(@GetUser() user: User) {
    return {
      ok: true,
      user: user,
    };
  }

  @Get('private4')
  @Auth(ValidRoles.admin)
  privateRoute4(@GetUser() user: User) {
    return {
      ok: true,
      user: user,
    };
  }

  @Get('check-status')
  @Auth()
  checkAuthStatus(@GetUser() user: User) {
    //
    return this.authService.checkAuthStatus();
  }
}
