export class UserModel {
  constructor(public _userName: string, private _token: string) {}

  get token() {
    return this._token;
  }
}
