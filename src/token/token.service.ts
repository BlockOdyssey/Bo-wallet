import { Injectable } from '@nestjs/common';
import { transactionData } from 'src/address/address.dto';

import { Web3Service } from 'src/web3/web3.service';

@Injectable()
export class TokenService {
  constructor(private web3Service: Web3Service) {}

  async transfer(transferConfig: transactionData) {
    return await this.web3Service.transfer(transferConfig);
  }
  async balanceOf(id: string) {
    return await this.web3Service.balanceOf(id);
  }
}
