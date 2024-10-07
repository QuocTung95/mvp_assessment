import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersRepository } from './users.repository';

const mockAuthService = () => ({
  signIn: jest.fn(),
  signUp: jest.fn(),
});

const mockUser = {
  username: 'Tung',
  password: 'SomePassWord@121',
};

describe('Auth Service', () => {
  let authService: AuthService;
  let authRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersRepository,
          useFactory: mockAuthService,
        },
      ],
    }).compile();

    authService = module.get(AuthService);
    authRepository = module.get(UsersRepository);
  });

  it('calls authService.signIn and returns the result', async () => {
    authRepository.signIn.mockResolvedValue('token-key');
    const result = await authService.signIn(mockUser);
    expect(result).toEqual('token-key');
  });

  it('calls authService.signUp and returns the result', async () => {
    authRepository.signUp.mockResolvedValue();
    const result = await authService.signUp(mockUser);
    expect(result).toEqual(undefined);
  });
});
