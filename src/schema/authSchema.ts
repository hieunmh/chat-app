import * as z from 'zod';

export const LoginSchema = z.object({
  email: z.string({
    required_error: 'Vui lòng nhập email của bạn'
  }).email({
    message: 'Email không hợp lệ',
  }),
  password: z.string({
    required_error: 'Vui lòng nhập mật khẩu của bạn'
  }).min(8, {
    message: 'Mật khẩu cần chứa ít nhất 8 ký tự',
  })
}); 