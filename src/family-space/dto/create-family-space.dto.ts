import { ApiProperty } from "@nestjs/swagger";

export class CreateFamilySpaceDto {
  @ApiProperty({example: 'auyl.go', description: 'login of the space'})
  readonly login: string;

  @ApiProperty({example: 'Family', description: 'title of the family'})
  readonly title: string;
  @ApiProperty({example: '234', description: 'status of space'})
  readonly status: string

  @ApiProperty({example: '1234', description: 'pass of the family'})
  readonly password: string

  @ApiProperty({example: 'https://post-picture.com', description: 'picture of space'})
  readonly picture: string
}