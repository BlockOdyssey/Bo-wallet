import { IsNumber, IsString } from 'class-validator';

export class transactionData {
  @IsString()
  readonly to: string;

  @IsString()
  readonly from: string;

  @IsString()
  readonly value: string;

  @IsNumber()
  readonly gas: string | number;

  @IsString()
  readonly fromKey: string;

  readonly nonce?: string | number;
}
