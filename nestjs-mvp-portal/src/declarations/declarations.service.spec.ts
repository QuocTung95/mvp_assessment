import { Test, TestingModule } from '@nestjs/testing';
import { DeclarationService } from './declarations.service';
import { DeclarationRepository } from './declarations.repository';
import { NotFoundException } from '@nestjs/common';

const mockDeclarationService = () => ({
  getDeclarations: jest.fn(),
  getDeclarationById: jest.fn(),
  createDeclaration: jest.fn(),
  editDeclaration: jest.fn(),
});

const mockUser = {
  username: 'Tung',
  id: 'someId',
  password: 'somePassword',
  declaration: [],
};

describe('Declarations Service', () => {
  let declarationService: DeclarationService;
  let declarationRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        DeclarationService,
        {
          provide: DeclarationRepository,
          useFactory: mockDeclarationService,
        },
      ],
    }).compile();

    declarationService = module.get(DeclarationService);
    declarationRepository = module.get(DeclarationRepository);
  });

  it('calls declarationService.getDeclarations and returns the result', async () => {
    declarationRepository.getDeclarations.mockResolvedValue([]);
    const result = await declarationService.getDeclarations(null, mockUser);
    expect(result).toEqual([]);
  });

  it('calls declarationService.getDeclarationById and returns the result', async () => {
    const mockTask = {
      name: 'Tung',
      temperature: 36,
      id: 'someId',
      has_contact: false,
      symptoms: [],
    };

    declarationRepository.getDeclarationById.mockResolvedValue(mockTask);
    const result = await declarationService.getDeclarationById('someId');
    expect(result).toEqual(mockTask);
  });
});
