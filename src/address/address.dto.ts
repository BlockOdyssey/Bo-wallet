import { IsString } from 'class-validator';

export class transactionData {
  @IsString()
  readonly to: string;

  @IsString()
  readonly from: string;

  readonly value: number | string;

  gas: string | number;
}
