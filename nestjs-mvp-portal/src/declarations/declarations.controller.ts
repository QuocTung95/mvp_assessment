import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';
import { Declaration } from './declarations.entity';
import { DeclarationService } from './declarations.service';
import {
  CreateDeclarationDto,
  GetDeclarationFilterDto,
} from './dto/declaration.dto';

@Controller('declarations')
@UseGuards(AuthGuard())
export class DeclarationController {
  constructor(private declarationService: DeclarationService) {}

  @Get()
  getDeclarations(
    @Query() filterDto: GetDeclarationFilterDto,
    @GetUser() user: User,
  ): Promise<Declaration[]> {
    return this.declarationService.getDeclarations(filterDto, user);
  }

  @Get('/:id')
  getDeclarationById(@Param('id') id: string): Promise<Declaration> {
    return this.declarationService.getDeclarationById(id);
  }

  @Post()
  createDeclaration(
    @Body() createDeclarationDto: CreateDeclarationDto,
    @GetUser() user: User,
  ): Promise<Declaration> {
    return this.declarationService.createDeclaration(
      createDeclarationDto,
      user,
    );
  }

  @Post('/:id')
  editDeclaration(
    @Body() createDeclarationDto: CreateDeclarationDto,
    @Param('id') id: string,
  ): Promise<Declaration> {
    return this.declarationService.editDeclaration(createDeclarationDto, id);
  }
}
