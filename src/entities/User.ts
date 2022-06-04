// import _UserPack from './UserPack';

export type userRole = 'administrator' | 'client';

export default class User {
  id: number;
  name: string;
  lastName: string;
  email: string;
  password: string;
  role: userRole;
  // mercadoPagoId: string | null
  verified: boolean;
  suspended: boolean;
  // pack: _UserPack

  constructor(
    id: number,
    name: string,
    lastName: string,
    email: string,
    password: string,
    role: userRole,
    // mercadoPagoId: string | null,
    verified: boolean,
    suspended: boolean
    // pack: _UserPack
  ) {
    this.id = id;
    this.name = name;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.role = role;
    // this.mercadoPagoId = mercadoPagoId;
    this.verified = verified;
    this.suspended = suspended;
    // this.pack = pack;
  }

  serialize() {
    return {
      id: this.id,
      name: this.name,
      lastName: this.lastName,
      email: this.email,
      role: this.role,
      verified: this.verified,
      suspended: this.suspended
      // pack: this.pack.serialize()
    };
  }
}
