package nl.hsleiden.model;

public class Basket {
    private int basketID;
    private int basketUserID;
    private int basketItemID;
    private int basketItemAmount;

    public Basket() {

    }

    public Basket(int basketID, int basketUserID, int basketItemID, int basketItemAmount) {
        this.basketID = basketID;
        this.basketUserID = basketUserID;
        this.basketItemID = basketItemID;
        this.basketItemAmount = basketItemAmount;
    }

    public int getBasketID() {
        return basketID;
    }

    public void setBasketID(int basketID) {
        this.basketID = basketID;
    }

    public int getBasketUserID() {
        return basketUserID;
    }

    public void setBasketUserID(int basketUserID) {
        this.basketUserID = basketUserID;
    }

    public int getBasketItemID() {
        return basketItemID;
    }

    public void setBasketItemID(int basketItemID) {
        this.basketItemID = basketItemID;
    }

    public int getBasketItemAmount() {
        return basketItemAmount;
    }

    public void setBasketItemAmount(int basketItemAmount) {
        this.basketItemAmount = basketItemAmount;
    }
}
