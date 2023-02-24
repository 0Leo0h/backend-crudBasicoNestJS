import { Injectable } from '@nestjs/common';
import { BadRequestException, NotFoundException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageDto } from 'src/common/message.dto';
import { productoDto } from './dto/producto.dto';
import { ProductoEntity } from './producto.entity';
import { ProductoRepository } from './producto.repository';

@Injectable()
export class ProductoService {

    constructor(
        @InjectRepository(ProductoEntity)
        private productoRepository: ProductoRepository
    ) { }

    async getAll(): Promise<ProductoEntity[]> {
        const list = await this.productoRepository.find();
        if (!list.length) {
            throw new NotFoundException(new MessageDto('La lista está vacia'));
        }
        return list;
    }

    async findById(id: number): Promise<ProductoEntity> {
        const producto = await this.productoRepository.findOneBy({ id: id });
        if (!producto) {
            throw new NotFoundException(new MessageDto('No existe'));
        }
        return producto;
    }

    async findByNombre(nombre: string): Promise<ProductoEntity> {
        const producto = await this.productoRepository.findOneBy({ nombre: nombre });
        return producto ? producto : null;
    }

    async create(dto: productoDto): Promise<any> {
        const exist = await this.findByNombre(dto.nombre);
        if (exist) throw new BadRequestException(new MessageDto('Ese nombre ya existe'));
        const producto = this.productoRepository.create(dto);
        await this.productoRepository.save(producto);
        return new MessageDto(`Producto ${producto.nombre} creado`);
    }

    async update(id: number, dto: productoDto): Promise<any> {
        const producto = await this.findById(id);
        if (!producto) throw new BadRequestException(new MessageDto('Ese producto no exite'));
        const exist = await this.findByNombre(dto.nombre);
        if (exist) throw new BadRequestException(new MessageDto('Ese nombre ya existe'));
        dto.nombre ? producto.nombre = dto.nombre : producto.nombre = producto.nombre;
        dto.precio ? producto.precio = dto.precio : producto.precio = producto.precio;
        await this.productoRepository.save(producto);
        return new MessageDto(`Producto ${producto.nombre} actualizado`);
    }

    async delete(id: number): Promise<any> {
        const producto = await this.findById(id);
        await this.productoRepository.delete(producto);
        return new MessageDto(`Producto ${producto.nombre} eliminado`);
    }
}
