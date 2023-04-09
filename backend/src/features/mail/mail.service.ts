import { DeliveryDetailsDto, PlaceOrderDto } from '@/features/orders';
import { UpdateProductQuantityDto } from '@/features/products';
import { DatetimeFormatter } from '@/utils';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createTransport } from 'nodemailer';

@Injectable()
export class MailService {
  constructor(private configService: ConfigService) {}

  async sendOrderConfirmationMail(placeOrderDto: PlaceOrderDto) {
    await this.getClient().sendMail({
      from: 'Moolmorths <noreply@moolmorths.com.au>',
      to: placeOrderDto.deliveryDetails.email,
      subject: '[Moolmorths] Thank you for your order!',
      html: this.buildOrderConfirmationTemplate(placeOrderDto),
    });
  }

  private getClient() {
    return createTransport({
      service: 'Gmail',
      auth: {
        user: this.configService.get<string>('SMTP_AUTH_USER'),
        pass: this.configService.get<string>('SMTP_AUTH_PASS'),
      },
    });
  }

  private buildOrderConfirmationTemplate(placeOrderDto: PlaceOrderDto) {
    const productTemplates = placeOrderDto.products
      .map((product) => this.buildOrderConfirmationTemplateProduct(product))
      .join('');

    return (
      this.buildOrderConfirmationTemplateHeader() +
      productTemplates +
      this.buildOrderConfirmationTemplateTotal(
        placeOrderDto.totalQuantity,
        placeOrderDto.totalPrice,
      ) +
      this.buildOrderConfirmationTemplateDeliveryAddress(
        placeOrderDto.deliveryDetails,
      )
    );
  }

  private buildOrderConfirmationTemplateHeader() {
    return `
    <!DOCTYPE html><html><head><title></title><meta http-equiv="Content-Type" content="text/html; charset=utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1"><meta http-equiv="X-UA-Compatible" content="IE=edge" /><style type="text/css">body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }img { -ms-interpolation-mode: bicubic; }img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
table { border-collapse: collapse !important; }body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; }a[x-apple-data-detectors] {
    color: inherit !important;
    text-decoration: none !important;
    font-size: inherit !important;
    font-family: inherit !important;
    font-weight: inherit !important;
    line-height: inherit !important;
}
@media screen and (max-width: 480px) {
    .mobile-hide {
        display: none !important;
    }
    .mobile-center {
        text-align: center !important;
    }
}
div[style*="margin: 16px 0;"] { margin: 0 !important; }
</style>
<body style="margin: 0 !important; padding: 0 !important; background-color: #eeeeee;" bgcolor="#eeeeee">
<table border="0" cellpadding="0" cellspacing="0" width="100%">
    <tr>
        <td align="center" style="background-color: #eeeeee;" bgcolor="#eeeeee">
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;">
            <tr>
                <td align="center" valign="top" style="font-size:0; padding: 0px;" bgcolor="#2688FF">
                <div style="display:inline-block; max-width:50%; min-width:100px; vertical-align:top; width:100%;">
                    <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:300px;">
                        <tr>
                            <td align="left" valign="top" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 36px; font-weight: 800; line-height: 48px; padding: 60px 32px" class="mobile-center">
                                <h1 style="font-size: 36px; font-weight: 800; margin: 0; color: #ffffff;">Moolmorths</h1>
                            </td>
                        </tr>
                    </table>
                </div>
            </tr>
            <tr>
                <td align="center" style="padding: 35px 35px 20px 35px; background-color: #ffffff;" bgcolor="#ffffff">
                <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;">
                    <tr>
                        <td align="center" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding-top: 25px;">
                            <img src="https://img.icons8.com/carbon-copy/100/000000/checked-checkbox.png" width="125" height="120" style="display: block; border: 0px;" /><br>
                            <h2 style="font-size: 30px; font-weight: 800; line-height: 36px; color: #333333; margin: 0;">
                                Thank You For Your Order!
                            </h2>
                        </td>
                    </tr>
                    <tr>
                        <td align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding-top: 10px;">
                            <p style="font-size: 16px; font-weight: 400; line-height: 24px; color: #777777;">
                            We've received your order and will contact you as soon as your package is shipped. You can find your purchase information below.
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td align="left" style="padding-top: 20px;">
                            <table cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td width="75%" align="left" bgcolor="#eeeeee" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px;">
                                        Order Confirmation #
                                    </td>
                                    <td width="25%" align="left" bgcolor="#eeeeee" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 600; line-height: 24px; padding: 10px;">
                                        ${DatetimeFormatter.toDateString(
                                          new Date(),
                                        )} ${DatetimeFormatter.toTimeString(
      new Date(),
    )}
                                    </td>
                                </tr>
    `;
  }

  private buildOrderConfirmationTemplateProduct(
    product: UpdateProductQuantityDto,
  ) {
    return `
    <tr>
      <td width="75%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 15px 10px 5px 10px;">
        ${product.name} (${product.quantity})
      </td>
      <td width="25%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 15px 10px 5px 10px;">
          $${product.price.toFixed(2)}
      </td>
    </tr>
    `;
  }

  private buildOrderConfirmationTemplateTotal(
    totalQuantity: number,
    totalPrice: number,
  ) {
    return `
        </table>
        </td>
        </tr>
        <tr>
            <td align="left" style="padding-top: 20px;">
                <table cellspacing="0" cellpadding="0" border="0" width="100%">
                    <tr>
                        <td width="75%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 600; line-height: 24px; padding: 10px 10px 0; border-top: 3px solid #eeeeee;">
                            TOTAL QUANTITY
                        </td>
                        <td width="25%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 600; line-height: 24px; padding: 10px 10px 0; border-top: 3px solid #eeeeee;">
                            QTY. ${totalQuantity}
                        </td>
                    </tr>
                    <tr>
                        <td width="75%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px; border-bottom: 3px solid #eeeeee;">
                            TOTAL
                        </td>
                        <td width="25%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px; border-bottom: 3px solid #eeeeee;">
                            $${totalPrice.toFixed(2)}
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>

    </td>
    </tr>
    `;
  }

  private buildOrderConfirmationTemplateDeliveryAddress(
    deliveryDetails: DeliveryDetailsDto,
  ) {
    return `
        <tr>
          <td align="center" height="100%" valign="top" width="100%" style="padding: 0 35px 35px 35px; background-color: #ffffff;" bgcolor="#ffffff">
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:660px;">
              <tr>
                <td align="left" valign="top" style="font-size:0;">
                  <div style="display:inline-block; max-width:100%; min-width:240px; vertical-align:top; width:100%;">
                      <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" >
                          <tr>
                              <td align="left" valign="top" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px;">
                                  <p style="font-weight: 800;">Delivery Address</p>
                                  <p>
                                  ${deliveryDetails.addressLine1},<br>
                                  ${deliveryDetails.addressLine2},<br>
                                  ${deliveryDetails.suburb}, ${deliveryDetails.state} ${deliveryDetails.postcode}
                                  </p>
                              </td>
                          </tr>
                      </table>
                  </div>
                </td>
                  </tr>
              </table>
              </td>
                </tr>
            </table>
            </td>
        </tr>
    </table>
        
    </body>
    </html>
    `;
  }
}
