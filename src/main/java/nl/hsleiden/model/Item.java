package nl.hsleiden.model;

public class Item {
    private int itemID;
    private String itemName;
    private String itemDescription;
    private double itemPrice;
    private String itemImage;
    private String itemType;
    private int itemAnimatorID;

    public Item() {

    }

    public Item(int itemID, String itemName, String itemDescription, double itemPrice, String itemImage, String itemType, int itemAnimatorID) {
        this.itemID = itemID;
        this.itemName = itemName;
        this.itemDescription = itemDescription;
        this.itemPrice = itemPrice;
        this.itemImage = itemImage;
        this.itemType = itemType;
        this.itemAnimatorID = itemAnimatorID;
    }

    public int getItemID() {
        return itemID;
    }

    public String getItemName() {
        return itemName;
    }

    public String getItemDescription() {
        return itemDescription;
    }

    public double getItemPrice() {
        return itemPrice;
    }

    public String getItemImage() {
        return itemImage;
    }

    public String getItemType() {
        return itemType;
    }

    public int getItemAnimatorID() {
        return itemAnimatorID;
    }
}
