import { Injectable } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class AuthService {
  constructor(private usersRepository: UsersRepository) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.usersRepository.signUp(authCredentialsDto);
  }

  async signIn(authCredentialsDto): Promise<{ accessToken: string }> {
    return this.usersRepository.signIn(authCredentialsDto);
  }
}
