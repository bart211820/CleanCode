package nl.hsleiden.persistence;

import nl.hsleiden.Database;
import nl.hsleiden.model.Item;

import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class ItemDAO {
    private Database database;
    private PreparedStatement statement;
    private String query;
    private List<Item> results;

    public ItemDAO() {
        this.database = Database.getInstance();
    }

    public List<Item> selectItems(PreparedStatement statement) throws SQLException{
        ResultSet items = database.select(statement);
        List<Item> resultList = new ArrayList<>();

        while (items.next()){
            Item item = new Item(
                    items.getInt("itemID"),
                    items.getString("itemName"),
                    items.getString("itemDescription"),
                    items.getDouble("itemPrice"),
                    items.getString("itemImage"),
                    items.getString("itemType"),
                    items.getInt("itemAnimatorID")
            );

            resultList.add(item);
        }


        return resultList;
    }

    public List<Item> getAllItems() {
//        try {
//            query = "SELECT * FROM Merchandise;";
//            statement = database.prepareStatement(query);
//
//            return selectItems(statement);
//        }
//        catch (SQLException e) {
//            throw new RuntimeException(e);
//        }
        Item item1 = new Item(1, "The Odd 1s Out Book", "Description", 20.0, "https://cdn.shopify.com/s/files/1/0033/1762/8983/products/Book_720x.jpg?v=1529191180", "Boek", 1);
        Item item2 = new Item(2, "Ari Plush", "Description2", 14.0, "https://cdn.shopify.com/s/files/1/0034/0590/6035/products/Plush1_590x.jpg?v=1535989539", "Plush", 2);
        Item item3 = new Item(3, "Chipflake hat", "Description3", 21.0, "https://vangogh.teespring.com/static.jpg?height=560&image_url=https%3A%2F%2Fteespring-pub-custom.s3.amazonaws.com%2Fa36_100042978_product_765_103374_front.png&padded=false&signature=9tg8G05flvlP%2FshulnzoPq9898JKoyCF1ajZSAOpK%2FQ%3D&version=2020-10-15-04-20-49&width=480", "Hoed", 3);
        Item item4 = new Item(4, "Aphantasia shirt", "Description4", 25.0, "https://images.teemill.com/TcQx3JbAMsEER9Jcls8qvpHg6okGt271pf2x0CeJcaU13L4j.png.png?w=1080&h=auto", "Shirt", 4);
        List temporaryList = new ArrayList();
        temporaryList.add(item1);
        temporaryList.add(item2);
        temporaryList.add(item3);
        temporaryList.add(item4);
        return temporaryList;
    }

    public Item getItem(int itemID){
//        try {
//            query = "SELECT * FROM Merchandise WHERE itemID = ?;";
//            statement.setInt(1, itemID);
//            statement = database.prepareStatement(query);
//
//            return selectItems(statement).get(0);
//        }
//        catch (SQLException e) {
//            throw new RuntimeException(e);
//        }

        if(itemID == 1){
            return new Item(1, "The Odd 1s Out Book", "Description", 20.0, "https://cdn.shopify.com/s/files/1/0033/1762/8983/products/Book_720x.jpg?v=1529191180", "Boek", 1);
        }
        if(itemID == 2){
            return new Item(2, "Ari Plush", "Description2", 14.0, "https://cdn.shopify.com/s/files/1/0034/0590/6035/products/Plush1_590x.jpg?v=1535989539", "Plush", 2);
        }
        if(itemID == 3){
            return new Item(3, "Chipflake hat", "Description3", 21.0, "https://vangogh.teespring.com/static.jpg?height=560&image_url=https%3A%2F%2Fteespring-pub-custom.s3.amazonaws.com%2Fa36_100042978_product_765_103374_front.png&padded=false&signature=9tg8G05flvlP%2FshulnzoPq9898JKoyCF1ajZSAOpK%2FQ%3D&version=2020-10-15-04-20-49&width=480", "Hoed", 3);
        }
        return new Item(4, "Aphantasia shirt", "Description4", 25.0, "https://images.teemill.com/TcQx3JbAMsEER9Jcls8qvpHg6okGt271pf2x0CeJcaU13L4j.png.png?w=1080&h=auto", "Shirt", 4);
    }

    public void createItem(String itemName, String itemDescription, double itemPrice, String itemImage, String itemType, int itemAnimatorID) {
        try {
            query = "INSERT INTO Merchandise (itemName, itemDescription, itemPrice, itemImage, itemType, itemAnimatorID) VALUES (?, ?, ?, ?, ?, ?);";

            statement = database.prepareStatement(query);
            statement.setString(1, itemName);
            statement.setString(2, itemDescription);
            statement.setDouble(3, itemPrice);
            statement.setString(4, itemImage);
            statement.setString(5, itemType);
            statement.setInt(5, itemAnimatorID);

            database.update(statement);
        }
        catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public void updateItem(String itemName, String itemDescription, double itemPrice, String itemImage, String itemType, int itemAnimatorID, int itemID) {
        try {
            query = "UPDATE Merchandise itemName = ?, itemDescription = ?, itemPrice = ?, itemImage = ?, itemType = ?, itemAnimatorID = ? WHERE itemID = ?";

            statement = database.prepareStatement(query);
            statement.setString(1, itemName);
            statement.setString(2, itemDescription);
            statement.setDouble(3, itemPrice);
            statement.setString(4, itemImage);
            statement.setString(5, itemType);
            statement.setInt(4, itemAnimatorID);
            statement.setInt(5, itemID);

            database.update(statement);
        }
        catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public void deleteItem(int itemID) {
        try {
            query = "DELETE FROM item WHERE itemID = ?;";

            statement = database.prepareStatement(query);
            statement.setInt(1, itemID);

            database.update(statement);
        }
        catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }
}
