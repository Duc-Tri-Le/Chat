import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

export function CreateToken(user_name: string, user_id: string): string {
  const payload = {
    sub: user_id,       
    username: user_name
  };
  const secret = process.env.JWT_SECRET
  // Tạo JWT có thời hạn 1 ngày
  const token = jwt.sign(payload, secret, { expiresIn: '1d' });

  return token;
}
