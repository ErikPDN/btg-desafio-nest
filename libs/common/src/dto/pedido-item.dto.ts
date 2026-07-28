import { IsInt, IsNumber, IsPositive, MinLength } from 'class-validator';
import { IsString } from 'class-validator/types/decorator/typechecker/IsString';

export class PedidoItemDto {
  @IsString({ message: 'O campo produto deve ser uma string' })
  @MinLength(1, { message: 'O campo produto não pode estar vazio' })
  produto!: string;

  @IsInt({ message: 'O campo quantidade deve ser um número inteiro' })
  @IsPositive({ message: 'O campo quantidade deve ser um número positivo' })
  quantidade!: number;

  @IsNumber({}, { message: 'O campo preco deve ser um número' })
  @IsPositive({ message: 'O campo preco deve ser um número positivo' })
  precoUnitario!: number;
}
