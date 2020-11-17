export class Item {

  private itemID;
  private itemName;
  private itemDescription;
  private itemPrice;
  private itemImage;
  private itemType;
  private itemAnimatorID;

  // constructor(private itemID?: Number, private itemName?: String, private itemDescription?: String, private itemPrice?: Number, private itemImage?: String, private itemType?: String, private itemAnimatorID?: Number) {
  //
  // }

  constructor(private data?) {
    this.itemID = data.itemID;
    this.itemName = data.itemName;
    this.itemDescription = data.itemDescription;
    this.itemPrice = data.itemPrice;
    this.itemImage = data.itemImage;
    this.itemType = data.itemType;
    this.itemAnimatorID = data.itemAnimatorID;
  }

  public getData() {
    const data = {
      itemID: this.itemID,
      itemName: this.itemName,
      itemDescription: this.itemDescription,
      itemPrice: this.itemPrice,
      itemImage: this.itemImage,
      itemType: this.itemType,
      itemAnimatorID: this.itemAnimatorID
    };
    return data;
  }

  public getItemID() {
    return this.itemID;
  }

  public getItemName() {
    return this.itemName;
  }

  public getItemDescription() {
    return this.itemDescription;
  }

  public getItemPrice() {
    return this.itemPrice;
  }

  public getItemImage() {
    return this.itemImage;
  }

  public getItemType() {
    return this.itemType;
  }

  public getItemAnimatorId() {
    return this.itemAnimatorID;
  }
}
