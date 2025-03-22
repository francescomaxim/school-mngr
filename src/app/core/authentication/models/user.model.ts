export class User {
  constructor(
    public email: string,
    public id: string,
    public _token: string,
    public _tokenExpirationDate: Date,
    public role: 'admin' | 'teacher' | 'student',
    public fullName: string
  ) {}

  get token() {
    return this._token;
  }
}
