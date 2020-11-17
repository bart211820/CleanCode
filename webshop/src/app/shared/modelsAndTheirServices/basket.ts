export class Basket {

  private basketID;
  private basketUserID;
  private basketItemID;
  private basketItemAmount;

  constructor(private data?) {
    this.basketID = data.basketID;
    this.basketUserID = data.basketUserID;
    this.basketItemID = data.basketItemID;
    this.basketItemAmount = data.basketItemAmount;
  }

  public getData() {
    const data = {
      basketID: this.basketID,
      basketUserID: this.basketUserID,
      basketItemID: this.basketItemID,
      basketItemAmount: this.basketItemAmount
    };
    return data;
  }

  public getBasketID() {
    return this.basketID;
  }

  public getBasketUserID() {
    return this.basketUserID;
  }

  public getBasketItemID() {
    return this.basketItemID;
  }

  public getBasketItemAmount() {
    return this.basketItemAmount;
  }

  public addAnotherOne() {
    this.basketItemAmount++;
  }
}
