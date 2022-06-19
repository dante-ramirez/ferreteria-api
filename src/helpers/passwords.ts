const bycript = require('bcryptjs');

class Password {
  saltRounds:number;

  constructor() {
    this.saltRounds = 10;
  }

  hash(password:string):string {
    return bycript.hashSync(password, this.saltRounds);
  }

  async isPasswordCorrect(password:string, hash:string): Promise<boolean> {
    return bycript.compare(password, hash);
  }

  generate(length: number) {
    const characters: string = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let pass: string = '';

    for (let i = 0; i < length; i += 1) {
      pass += characters.charAt(Math.floor(Math.random() * characters.length)) || '.';
    }

    return pass;
  }
}

export default new Password();
