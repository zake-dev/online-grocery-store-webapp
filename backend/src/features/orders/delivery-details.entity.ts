import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { DeliveryDetailsDto } from './dto/delivery-details.dto';

@Entity('DELIVERY_DETAILS')
export class DeliveryDetails {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'first_name', type: 'varchar', length: 20 })
  firstName: string;

  @Column({ name: 'last_name', type: 'varchar', length: 20 })
  lastName: string;

  @Column('varchar', { length: 255 })
  email: string;

  @Column({ name: 'address_line_1', type: 'varchar', length: 100 })
  addressLine1: string;

  @Column({ name: 'address_line_2', type: 'varchar', length: 100 })
  addressLine2: string;

  @Column('varchar', { length: 20 })
  suburb: string;

  @Column('int')
  postcode: number;

  @Column('varchar', { length: 10 })
  state: string;

  static from(deliveryDetailsDto: DeliveryDetailsDto) {
    const deliveryDetails = new DeliveryDetails();
    deliveryDetails.firstName = deliveryDetailsDto.firstName;
    deliveryDetails.lastName = deliveryDetailsDto.lastName;
    deliveryDetails.email = deliveryDetailsDto.email;
    deliveryDetails.addressLine1 = deliveryDetailsDto.addressLine1;
    deliveryDetails.addressLine2 = deliveryDetailsDto.addressLine2;
    deliveryDetails.suburb = deliveryDetailsDto.suburb;
    deliveryDetails.postcode = deliveryDetailsDto.postcode;
    deliveryDetails.state = deliveryDetailsDto.state;

    return deliveryDetails;
  }
}
