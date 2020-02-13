export class UserModel {
  constructor(
    public id: string,
    private _token: string,
  ) {
  }

  get token() {
    return this._token;
  }
}
