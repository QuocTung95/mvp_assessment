import { IsEnum, IsNotEmpty, IsOptional, Max, Min } from 'class-validator';
import { DeclarationSymptoms } from '../declarations.enum';

export class CreateDeclarationDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @Min(35)
  @Max(40)
  temperature: number;

  @IsNotEmpty()
  has_contact: boolean;

  @IsNotEmpty()
  @IsEnum(DeclarationSymptoms, { each: true })
  symptoms: DeclarationSymptoms[];
}

export class GetDeclarationFilterDto {
  @IsOptional()
  has_contact?: boolean;
}
