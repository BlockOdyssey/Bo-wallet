import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TokenService } from './token.service';
import { AddressValidationPipe } from 'src/address/address-validation.pipe';
import { tokenData } from './token.dto';

@Controller('token')
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @Get('/:address/:ca')
  async balanceOf(
    @Param('address', AddressValidationPipe) address: string,
    @Param('ca') ca: string,
  ): Promise<string> {
    return await this.tokenService.balanceOf(address, ca);
  }

  @Post()
  async transfer(@Body() transferconfig: tokenData) {
    return this.tokenService.transfer(transferconfig);
  }
}
