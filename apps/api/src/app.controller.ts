import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { AppService } from './app.service';
import {
  PedidoResponseDto,
  QuantidadePedidosResponseDto,
  ValorTotalPedidoResponseDto,
} from '@app/common';

@Controller('pedidos')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('clientes/:id/count')
  getQuantidadePedidosByCliente(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<QuantidadePedidosResponseDto> {
    return this.appService.getQuantidadePedidosByCliente(id);
  }

  @Get('clientes/:id')
  getPedidosByCliente(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<PedidoResponseDto[]> {
    return this.appService.getPedidosByCliente(id);
  }

  @Get(':id')
  getValorTotalPedido(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ValorTotalPedidoResponseDto> {
    return this.appService.getValorTotalPedido(id);
  }
}
