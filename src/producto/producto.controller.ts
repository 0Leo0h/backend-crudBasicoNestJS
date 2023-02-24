import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { productoDto } from './dto/producto.dto';
import { ProductoService } from './producto.service';

@Controller('producto')
export class ProductoController {

    constructor(private readonly productoService: ProductoService) { }

    @Get()
    async getAll() {
        return await this.productoService.getAll();
    }

    @Get(':id')
    async getOne(@Param('id', ParseIntPipe) id: number) {
        return await this.productoService.findById(id);
    }

    @UsePipes(new ValidationPipe({whitelist: true}))
    @Post()
    async create(@Body() dto: productoDto){
        return await this.productoService.create(dto);
    }

    @UsePipes(new ValidationPipe({whitelist: true}))
    @Put(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() dto: productoDto){
        return await this.productoService.update(id,dto);
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number){
        return await this.productoService.delete(id);
    }
}
