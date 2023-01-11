import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { resolve } from 'path';
import { transactionData } from 'src/address/address.dto';
import Web3 from 'web3';

@Injectable()
export class Web3Service {
  private web3Instance: Web3;
  constructor(private configService: ConfigService) {
    this.web3Instance = new Web3(
      new Web3.providers.HttpProvider(
        this.configService.get<string>('WEB3_RPC_ENDPOINT'),
      ),
    );
  }

  async getBlockNumber(): Promise<number> {
    return await this.web3Instance.eth.getBlockNumber();
  }

  async getBlock(id: number) {
    return await this.web3Instance.eth.getBlock(id);
  }

  async getBalance(address: string): Promise<string> {
    return await this.web3Instance.eth.getBalance(address);
  }

  async getTransactionReceipt(transactionHash: string) {
    return await this.web3Instance.eth.getTransactionReceipt(transactionHash);
  }

  async sendTransaction(transactionConfig: transactionData) {
    try {
      const nonce = await this.web3Instance.eth.getTransactionCount(
        '0x48b953825862375a31821723ba847b3861fee8e0',
        'latest',
      );
      const GasPrice = await this.web3Instance.eth.getGasPrice();
      const data = await this.web3Instance.utils.stringToHex('test');
      // const getValue = await this.web3Instance.utils.toWei(
      //   transactionConfig.value,
      //   'ether',
      // );
      // console.log(getValue);
      const signTransactionConfig = {
        to: transactionConfig.to,
        from: transactionConfig.from,
        value: transactionConfig.value,
        gas: transactionConfig.gas,
        nonce: nonce,
        gasPrice: GasPrice,
        data: data,
      };

      const signedTransaction =
        await this.web3Instance.eth.accounts.signTransaction(
          signTransactionConfig,
          'd526d129957af4616b9c45e5d3c9ed085c0dec92f665f19359cb6bfc90117f24',
        );
      let txReceipt: string;
      await this.web3Instance.eth
        .sendSignedTransaction(signedTransaction.rawTransaction)
        .once('transactionHash', (hash) => {
          console.log(hash);
        })
        .then((receipt) => {
          txReceipt = JSON.stringify(receipt);
        });
      return `${txReceipt}`;
    } catch (e) {
      return 'an error occurred in the requst transaction';
    }
  }
}