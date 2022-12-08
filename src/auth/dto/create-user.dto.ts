export class CreateUserDto {
  readonly login: string;

  readonly password: string;

  readonly name: string;

  readonly picture: string;

  readonly family_space_id: number;
}