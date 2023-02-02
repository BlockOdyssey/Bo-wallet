import { Injectable } from '@nestjs/common';
import { Web3Service } from 'src/web3/web3.service';
import { tokenData } from './token.dto';

@Injectable()
export class TokenService {
  constructor(private web3Service: Web3Service) {}

  async transfer(transferConfig: tokenData) {
    return await this.web3Service.transfer(transferConfig);
  }
  async balanceOf(address: string, ca: string) {
    return await this.web3Service.balanceOf(address, ca);
  }
}
