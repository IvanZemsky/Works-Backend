import * as bcryptjs from 'bcryptjs'

export class PasswordService {
   getSalt() {
      return bcryptjs.genSaltSync(10)
   }

   hashPassword(password: string, salt: string) {
      return bcryptjs.hashSync(password, salt)
   }
}