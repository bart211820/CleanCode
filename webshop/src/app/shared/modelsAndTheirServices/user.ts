export class User {

  private userID;
  private fullName;
  private postcode;
  private streetnumber;
  private emailAddress;
  private password;
  private roles;

  constructor(private data?) {
    this.userID = data.userID;
    this.fullName = data.fullName;
    this.postcode = data.postcode;
    this.streetnumber = data.streetnumber;
    this.emailAddress = data.emailAddress;
    this.password = data.password;
    this.roles = data.roles;
  }

  public getData() {
    const data = {
      userID: this.userID,
      fullName: this.fullName,
      postcode: this.postcode,
      streetnumber: this.streetnumber,
      emailAddress: this.emailAddress,
      password: this.password,
      roles: this.roles
    };
    return data;
  }

  public getUserID() {
    return this.userID;
  }

  public getFullName() {
    return this.fullName;
  }

  public getPostcode() {
    return this.postcode;
  }

  public getStreetnumber() {
    return this.streetnumber;
  }

  public getEmailAddress() {
    return this.emailAddress;
  }

  public getPassword() {
    return this.password;
  }

  public getRoles() {
    return this.roles;
  }
}
