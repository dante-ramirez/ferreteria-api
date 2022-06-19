import config from '../../configuration';

const jwt = require('jsonwebtoken');

class JWT {
  private secret:string;
  private algorithm:string;
  private durationInMinutes:number;
  private serviceName:string;

  constructor() {
    this.secret = config.jwt.secret;
    this.algorithm = config.jwt.algorithm;
    this.durationInMinutes = config.jwt.durationInMinutes;
    this.serviceName = config.service;
  }

  createSessionToken(payload:any) {
    const dataToSign = {
      ...payload,
      service: this.serviceName,
      exp: this.getExpirationTime()
    };

    return jwt.sign(dataToSign, this.secret, { algorithm: this.algorithm });
  }

  createAccountVerificationToken(payload:any) {
    const dataToSign = {
      ...payload,
      service: this.serviceName,
      exp: this.getExpirationTime()
    };

    return jwt.sign(dataToSign, this.secret, { algorithm: this.algorithm });
  }

  private getExpirationTime():number {
    return Math.floor(Date.now() / 1000) + (Number(this.durationInMinutes) * 60);
  }
}

export default new JWT();
