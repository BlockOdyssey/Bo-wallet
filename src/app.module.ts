import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Web3Module } from './web3/web3.module';
import { BlockModule } from './block/block.module';
import { AddressModule } from './address/address.module';
import { AddressController } from './address/address.controller';
import { BlockController } from './block/block.controller';
import { TokenController } from './token/token.controller';
import { TokenModule } from './token/token.module';

@Module({
  imports: [
    Web3Module,
    AddressModule,
    BlockModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TokenModule,
  ],
  controllers: [AddressController, BlockController, TokenController],
  providers: [],
})
export class AppModule {}
