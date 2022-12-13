import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { AuthService } from "./services/auth.service";
import { JwtAuthGuard, UserRequestType } from "./jwt-auth.guard";

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
    ) {
    }

    @Post("/login")
    login(@Body() userDto: CreateUserDto) {
        return this.authService.login(userDto);
    }

    @Post("/registration")
    registration(@Body() userDto: CreateUserDto) {
        return this.authService.registration(userDto);
    }

    @Get("/me")
    @UseGuards(JwtAuthGuard)
    me(@Req() req: UserRequestType) {
        return this.authService.me(req.user.id);
    }
}
