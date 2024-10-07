import { User } from '../auth/user.entity';
import { Repository } from 'typeorm';
import {
  CreateDeclarationDto,
  GetDeclarationFilterDto,
} from './dto/declaration.dto';
import { Declaration } from './declarations.entity';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DeclarationRepository {
  constructor(
    @InjectRepository(Declaration)
    private repository: Repository<Declaration>,
  ) {}

  //   private logger = new Logger('DeclarationsRepository', { timestamp: true });

  async getDeclarations(
    filterDto: GetDeclarationFilterDto,
    user: User,
  ): Promise<Declaration[]> {
    const { has_contact } = filterDto;

    const query = this.repository
      .createQueryBuilder('declaration')
      .leftJoinAndSelect('declaration.user', 'user')
      .where('declaration.userId = :userId', { userId: user.id });

    if (has_contact !== undefined) {
      query.andWhere('declaration.has_contact = :has_contact', { has_contact });
    }

    query.orderBy('declaration.updatedDate', 'DESC');
    return await query.getMany();
  }

  async getDeclarationById(id: string): Promise<Declaration> {
    const found = this.repository.findOne({ where: { id } });
    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return found;
  }

  async createDeclaration(
    declarationData: Partial<Declaration>,
  ): Promise<Declaration> {
    const declaration = this.repository.create(declarationData);
    return await this.repository.save(declaration);
  }

  async editDeclaration(
    declarationData: Partial<Declaration>,
    id: string,
  ): Promise<Declaration> {
    const declaration = await this.repository.findOne({ where: { id } });
    if (!declaration) {
      throw new Error('Declaration not found');
    }
    Object.assign(declaration, declarationData);
    return await this.repository.save(declaration);
  }
}
