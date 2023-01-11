import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Web3Module } from './web3/web3.module';
import { BlockModule } from './block/block.module';
import { AddressModule } from './address/address.module';
import { AddressController } from './address/address.controller';
import { BlockController } from './block/block.controller';

@Module({
  imports: [
    Web3Module,
    AddressModule,
    BlockModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AddressController, BlockController],
  providers: [],
})
export class AppModule {}
