import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({example: 'suan001', description: 'unic login of user'})
  readonly login: string;

  @ApiProperty({example: '7777', description: 'password of user'})
  readonly password: string;

  @ApiProperty({example: 'suan', description: 'name user'})
  readonly name: string;

  @ApiProperty({example: 'https', description: 'picture of user'})
  readonly picture: string;

  @ApiProperty({example: 2, description: 'family space id of user'})
  readonly family_space_id: number;
}