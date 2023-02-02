import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { transactionData } from 'src/address/address.dto';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import Abi from '../../contract/BOToken.json';
import { tokenData } from 'src/token/token.dto';

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
        transactionConfig.from, //public key
        'latest',
      );
      const GasPrice = await this.web3Instance.eth.getGasPrice();
      const data = await this.web3Instance.utils.stringToHex('test');
      const getValue = await this.web3Instance.utils.toWei(
        transactionConfig.value,
        'ether',
      );

      const signTransactionConfig = {
        to: transactionConfig.to,
        from: transactionConfig.from,
        gas: transactionConfig.gas,
        value: getValue,
        nonce: nonce,
        gasPrice: GasPrice,
        data: data,
      };

      const signedTransaction =
        await this.web3Instance.eth.accounts.signTransaction(
          signTransactionConfig,
          transactionConfig.fromKey, //private key
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
      return 'Error occurred in the requst transaction';
    }
  }

  async transfer(transferConfig: tokenData) {
    const contract = new this.web3Instance.eth.Contract(
      Abi.abi as AbiItem[],
      transferConfig.contractAddress,
      { from: transferConfig.from },
    );
    const GasPrice = await this.web3Instance.eth.getGasPrice();
    const getValue = await this.web3Instance.utils.toWei(
      transferConfig.value,
      'ether',
    );

    const nonce = await this.web3Instance.eth.getTransactionCount(
      transferConfig.from,
      'latest',
    );

    const signTxConfig = {
      to: transferConfig.contractAddress,
      from: transferConfig.from,
      gas: transferConfig.gas,
      value: '0x0',
      nonce: nonce,
      gasPrice: GasPrice,
      data: contract.methods
        .transfer(transferConfig.to, this.web3Instance.utils.toHex(getValue))
        .encodeABI(),
    };

    const signedTransaction =
      await this.web3Instance.eth.accounts.signTransaction(
        signTxConfig,
        transferConfig.fromKey,
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
  }

  async balanceOf(address: string, ca: string) {
    const contract = new this.web3Instance.eth.Contract(
      Abi.abi as AbiItem[],
      ca,
    );
    const result = await contract.methods.balanceOf(address).call();
    return result;
  }
}
