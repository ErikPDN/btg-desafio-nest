export class PedidoItemResponseDto {
  produto!: string;
  quantidade!: number;
  precoUnitario!: string;
}

export class PedidoResponseDto {
  codigoPedido!: number;
  codigoCliente!: number;
  createdAt!: Date;
  itens!: PedidoItemResponseDto[];
}
