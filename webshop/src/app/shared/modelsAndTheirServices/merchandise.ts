export class Merchandise {

  private merchandiseID;
  private merchandiseName;
  private merchandiseDescription;
  private merchandisePrice;
  private merchandiseImage;
  private merchandiseType;
  private merchandiseAnimatorID;

  constructor(private data?) {
    this.merchandiseID = data.itemID;
    this.merchandiseName = data.itemName;
    this.merchandiseDescription = data.itemDescription;
    this.merchandisePrice = data.itemPrice;
    this.merchandiseImage = data.itemImage;
    this.merchandiseType = data.itemType;
    this.merchandiseAnimatorID = data.itemAnimatorID;
  }

  public getData() {
    const data = {
      itemID: this.merchandiseID,
      itemName: this.merchandiseName,
      itemDescription: this.merchandiseDescription,
      itemPrice: this.merchandisePrice,
      itemImage: this.merchandiseImage,
      itemType: this.merchandiseType,
      itemAnimatorID: this.merchandiseAnimatorID
    };
    return data;
  }

  public getMerchandiseID() {
    return this.merchandiseID;
  }

  public getMerchandiseName() {
    return this.merchandiseName;
  }

  public getMerchandiseDescription() {
    return this.merchandiseDescription;
  }

  public getMerchandisePrice() {
    return this.merchandisePrice;
  }

  public getMerchandiseImage() {
    return this.merchandiseImage;
  }

  public getMerchandiseType() {
    return this.merchandiseType;
  }

  public getMerchandiseAnimatorId() {
    return this.merchandiseAnimatorID;
  }
}
