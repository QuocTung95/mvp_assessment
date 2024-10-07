import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { DeclarationController } from './declarations.controller';
import { DeclarationRepository } from './declarations.repository';
import { DeclarationService } from './declarations.service';
import { Declaration } from './declarations.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Declaration]), AuthModule],
  controllers: [DeclarationController],
  providers: [DeclarationService, DeclarationRepository],
})
export class DeclarationModule {}
