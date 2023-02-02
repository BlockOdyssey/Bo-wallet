import { IsNumber, IsString } from 'class-validator';

export class tokenData {
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

  @IsString()
  readonly contractAddress: string;

  readonly nonce?: string | number;
}
