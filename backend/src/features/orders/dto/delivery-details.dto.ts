import {
  IsAlpha,
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class DeliveryDetailsDto {
  @IsNotEmpty()
  @IsAlpha()
  @MaxLength(20)
  firstName: string;

  @IsNotEmpty()
  @IsAlpha()
  @MaxLength(20)
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  @MaxLength(255)
  email: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  addressLine1: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  addressLine2: string;

  @IsNotEmpty()
  @IsAlpha()
  @MaxLength(20)
  suburb: string;

  @IsNotEmpty()
  @IsNumberString()
  @MinLength(4)
  @MaxLength(4)
  postcode: string;

  @IsNotEmpty()
  @IsAlpha()
  @MaxLength(10)
  state: string;
}
