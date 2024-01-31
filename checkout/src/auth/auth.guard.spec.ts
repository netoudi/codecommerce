import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@/auth/auth.guard';

describe('AuthGuard', () => {
  it('should be defined', () => {
    expect(new AuthGuard(new JwtService())).toBeDefined();
  });
});
