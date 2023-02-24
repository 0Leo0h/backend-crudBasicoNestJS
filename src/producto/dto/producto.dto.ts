import { IsNotEmpty, IsNumber, Min } from "class-validator";
import { IsNotBlank } from "src/decorators/is-not-blank.decorator";

export class productoDto {
    
    @IsNotBlank({message:'El nombre no puede estar vacio'})
    nombre?: string;

    @IsNumber()
    @IsNotEmpty()
    @Min(10, {message: 'El precio debe ser al menos de 10'})
    precio?: number;
}