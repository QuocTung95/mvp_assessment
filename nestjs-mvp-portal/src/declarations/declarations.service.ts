import { Injectable } from '@nestjs/common';
import { User } from '../auth/user.entity';
import { Declaration } from './declarations.entity';
import { DeclarationRepository } from './declarations.repository';
import {
  CreateDeclarationDto,
  GetDeclarationFilterDto,
} from './dto/declaration.dto';

@Injectable()
export class DeclarationService {
  constructor(private declarationRepository: DeclarationRepository) {}

  async getDeclarations(
    filterDto: GetDeclarationFilterDto,
    user: User,
  ): Promise<Declaration[]> {
    return this.declarationRepository.getDeclarations(filterDto, user);
  }

  async getDeclarationById(id: string): Promise<Declaration> {
    return this.declarationRepository.getDeclarationById(id);
  }

  async createDeclaration(
    createDeclarationDto: CreateDeclarationDto,
    user: User,
  ): Promise<Declaration> {
    const { name, temperature, symptoms, has_contact } = createDeclarationDto;

    const declaration = {
      name: name,
      temperature,
      symptoms,
      has_contact,
      user,
    };

    return this.declarationRepository.createDeclaration(declaration);
  }

  async editDeclaration(
    createDeclarationDto: CreateDeclarationDto,
    id: string,
  ): Promise<Declaration> {
    const { name, temperature, symptoms, has_contact } = createDeclarationDto;

    const declaration = {
      name: name,
      temperature,
      symptoms,
      has_contact,
    };

    return this.declarationRepository.editDeclaration(declaration, id);
  }
}
