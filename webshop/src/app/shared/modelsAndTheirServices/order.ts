export class Order {

  private orderID;
  private orderUserID;
  private orderItemID;
  private orderItemAmount;
  private orderDelivery;

  constructor(private data?) {
    this.orderID = data.orderID;
    this.orderUserID = data.orderUserID;
    this.orderItemID = data.orderItemID;
    this.orderItemAmount = data.orderItemAmount;
    this.orderDelivery = data.orderDelivery;
  }

  public getData() {
    const data = {
      orderID: this.orderID,
      orderUserID: this.orderUserID,
      orderItemID: this.orderItemID,
      orderItemAmount: this.orderItemAmount,
      orderDelivery: this.orderDelivery
    };
    return data;
  }

  public getOrderID() {
    return this.orderID;
  }

  public getOrderUserID() {
    return this.orderUserID;
  }

  public getOrderItemID() {
    return this.orderItemID;
  }

  public getOrderItemAmount() {
    return this.orderItemAmount;
  }

  public getOrderDelivery() {
    return this.orderDelivery;
  }
}
