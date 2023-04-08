import { UpdateProductQuantityDto } from '@/features/products';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsObject,
  IsPositive,
  ValidateNested,
} from 'class-validator';
import { DeliveryDetailsDto } from './delivery-details.dto';

export class PlaceOrderDto {
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateProductQuantityDto)
  products: UpdateProductQuantityDto[];

  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => DeliveryDetailsDto)
  deliveryDetails: DeliveryDetailsDto;

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  totalQuantity: number;

  @IsNotEmpty()
  @IsPositive()
  totalPrice: number;
}
