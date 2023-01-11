import { Injectable } from '@nestjs/common';
import { Web3Service } from '../web3/web3.service';
import { transactionData } from './address.dto';

@Injectable()
export class AddressService {
  constructor(private web3Service: Web3Service) {}

  async getBalance(address: string): Promise<string> {
    return await this.web3Service.getBalance(address);
  }

  async getTransactionReceipt(id: string) {
    return await this.web3Service.getTransactionReceipt(id);
  }

  async sendTransaction(signedTransactioData: transactionData) {
    return await this.web3Service.sendTransaction(signedTransactioData);
  }
}
