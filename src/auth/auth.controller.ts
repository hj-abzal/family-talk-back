import { Body, Controller, Delete, Post, Req, UseGuards } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { AuthService } from "./services/auth.service";
import { JwtAuthGuard, UserRequestType } from "./jwt-auth.guard";
import { UsersService } from "./services/users.service";

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private userService: UsersService
    ) {
    }

    @Post("/login")
    login(@Body() userDto: CreateUserDto) {
        return this.authService.login(userDto);
    }

    @Delete("/login")
    @UseGuards(JwtAuthGuard)
    logout(@Req() req: UserRequestType) {
        return this.authService.logout(req.user);
    }

    @Post("/registration")
    registration(@Body() userDto: CreateUserDto) {
        return this.authService.registration(userDto);
    }


    // @ApiOperation({summary: 'Check if token still works'})
    // @ApiResponse({status: 200})
    // @Get("/me")
    // @UseGuards(JwtAuthGuard)
    // me(@Req() req: UserRequestType) {
    //     return this.userService.getById(req.user.id);
    // }
}
