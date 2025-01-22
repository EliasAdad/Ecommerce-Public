import { PartialType } from "@nestjs/swagger";
import { ProductsDto } from "./products.dto";

export class UpdateProductsDto extends PartialType(ProductsDto) { }