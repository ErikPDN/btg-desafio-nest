import {
  IsInt,
  IsNumber,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class PedidoItemDto {
  @IsString({ message: 'O campo produto deve ser uma string' })
  @MinLength(1, { message: 'O campo produto não pode estar vazio' })
  produto!: string;

  @IsInt({ message: 'O campo quantidade deve ser um número inteiro' })
  @IsPositive({ message: 'O campo quantidade deve ser um número positivo' })
  quantidade!: number;

  @IsNumber({}, { message: 'O campo preco deve ser um número' })
  @IsPositive({ message: 'O campo preco deve ser um número positivo' })
  preco!: number;
}
