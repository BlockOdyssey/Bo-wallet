import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressValidationPipe } from './address-validation.pipe';
import { transactionData } from './address.dto';

@Controller('/address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get(':address')
  async getBalance(
    @Param('address', AddressValidationPipe) address: string,
  ): Promise<string> {
    return await this.addressService.getBalance(address);
  }

  @Get('tx/:id')
  async getTransactionReceipt(@Param('id') id: string) {
    return await this.addressService.getTransactionReceipt(id);
  }

  @Post('tx')
  async sendTransaction(@Body() signedTransactioDetail: transactionData) {
    return this.addressService.sendTransaction(signedTransactioDetail);
  }
}
