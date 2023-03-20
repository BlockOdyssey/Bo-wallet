import { transactionData } from './../src/address/address.dto';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Web3Module } from './../src/web3/web3.module';
import { Web3Service } from './../src/web3/web3.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('web3Service', () => {
  let web3Service: Web3Service;
  let configService: ConfigService;
  const BLOCK_NUMBER = 8685679;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        Web3Module,
        ConfigModule.forRoot({
          isGlobal: true,
        }),
      ],
      providers: [Web3Service],
    }).compile();

    web3Service = module.get<Web3Service>(Web3Service);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('getBlockNumber', async () => {
    const blockNumber = await web3Service.getBlockNumber();

    expect(blockNumber).toBeGreaterThan(BLOCK_NUMBER);
  });
  it('getBlock', async () => {
    const block = await web3Service.getBlock(BLOCK_NUMBER);

    expect(block).toBeTruthy();
  });
  it('getBalance', async () => {
    const TO = await configService.get('TO');

    const balance = await web3Service.getBalance(TO);

    expect(balance).toBeTruthy();
  });
  it('getTransactionReceipt', async () => {
    const TRANSACTION_HASH =
      '0x7c03635159bbad67145912e2282fc4a23909c4eef860c5b3c0409f88e58b1d14';

    const transactionReceipt = await web3Service.getTransactionReceipt(
      TRANSACTION_HASH,
    );

    expect(transactionReceipt).toBeTruthy();
  });
  it('sendTransaction', async () => {
    const VALUE = '0.001';
    const GAS = '2000000';
    const TO = await configService.get('TO');
    const FROM = await configService.get('FROM');
    const PRIVATE_KEY = await configService.get('PRIVATE_KEY');

    const transactionData: transactionData = {
      to: TO,
      from: FROM,
      value: VALUE,
      gas: GAS,
      fromKey: PRIVATE_KEY,
    };

    const receipt = await web3Service.sendTransaction(transactionData);

    expect(receipt).toBeTruthy();
  }, 20000);
});
