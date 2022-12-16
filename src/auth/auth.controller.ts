import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { AuthService } from "./services/auth.service";
import { JwtAuthGuard, UserRequestType } from "./jwt-auth.guard";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { User } from "./models/users.model";

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
    ) {
    }


    @ApiOperation({summary: 'Login to back'})
    @ApiResponse({status: 200, type: User, description: JSON.stringify({user: "UserType", token: 'string'})})
    @Post("/login")
    login(@Body() userDto: CreateUserDto) {
        return this.authService.login(userDto);
    }

    @ApiOperation({summary: 'Registration to back'})
    @ApiResponse({status: 200, type: User})
    @Post("/registration")
    registration(@Body() userDto: CreateUserDto) {
        return this.authService.registration(userDto);
    }

    @ApiOperation({summary: 'get is logged stiil to back'})
    @ApiResponse({status: 200, type: User, description: JSON.stringify({user: "UserType", token: 'string'})})
    @Get("/me")
    @UseGuards(JwtAuthGuard)
    me(@Req() req: UserRequestType) {
        return this.authService.me(req.user.id);
    }
}
