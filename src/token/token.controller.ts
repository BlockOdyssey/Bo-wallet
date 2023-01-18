import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TokenService } from './token.service';
import { AddressValidationPipe } from 'src/address/address-validation.pipe';
import { transactionData } from 'src/address/address.dto';

@Controller('token')
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @Get(':id')
  async balanceOf(
    @Param('id', AddressValidationPipe) id: string,
  ): Promise<string> {
    return await this.tokenService.balanceOf(id);
  }
  @Post()
  async transfer(@Body() transferconfig: transactionData) {
    return this.tokenService.transfer(transferconfig);
  }
}
