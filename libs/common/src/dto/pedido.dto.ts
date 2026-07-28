import {
  ArrayMinSize,
  IsArray,
  IsInt,
  IsPositive,
  ValidateNested,
} from 'class-validator';
import { PedidoItemDto } from './pedido-item.dto';
import { Type } from 'class-transformer';

export class PedidoDto {
  @IsInt({ message: 'O campo codigoPedido deve ser um número inteiro' })
  @IsPositive({ message: 'O campo codigoPedido deve ser um número positivo' })
  codigoPedido!: number;

  @IsInt({ message: 'O campo codigoCliente deve ser um número inteiro' })
  @IsPositive({ message: 'O campo codigoCliente deve ser um número positivo' })
  codigoCliente!: number;

  @IsArray({ message: 'O campo itens deve ser um array' })
  @ArrayMinSize(1, { message: 'O campo itens deve ter pelo menos um item' })
  @ValidateNested({ each: true })
  @Type(() => PedidoItemDto)
  itens!: PedidoItemDto[];
}
