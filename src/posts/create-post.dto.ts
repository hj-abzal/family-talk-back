import { ApiProperty } from "@nestjs/swagger";

export class CreatePostDto {
  @ApiProperty({example: 'Hot to...?', description: 'title of the post'})
  readonly title: string;

  @ApiProperty({example: 'React is ...', description: 'main text of post'})
  readonly content: string;

  @ApiProperty({example: 'https', description: 'picture of post'})
  readonly picture: string

  @ApiProperty({example: '1', description: 'id of user'})
  readonly user_id: number
}