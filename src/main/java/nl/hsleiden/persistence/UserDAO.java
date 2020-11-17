package nl.hsleiden.persistence;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import javax.inject.Singleton;

import nl.hsleiden.Database;
import nl.hsleiden.model.Item;
import nl.hsleiden.model.User;

/**
 *
 * @author Peter van Vliet
 */
@Singleton
public class UserDAO
{
    private Database database;
    private PreparedStatement statement;
    private String query;
    private List<Item> results;

    private final List<User> fakeUsers;
    
    public UserDAO()
    {
        User user = new User();
        user.setUserID(1);
        user.setFullName("admin");
        user.setPostcode("admin");
        user.setStreetnumber("admin");
        user.setEmailAddress("admin"); // User name
        user.setPassword("admin"); // Password
        user.setRoles(new String[] { "GUEST", "ADMIN" });

        User user1 = new User();
        user1.setUserID(2);
        user1.setFullName("First user");
        user1.setPostcode("1234AB");
        user1.setStreetnumber("12");
        user1.setEmailAddress("first@user.com");
        user1.setPassword("first");
        user1.setRoles(new String[] { "GUEST", "ADMIN" });

        User user2 = new User();
        user2.setUserID(3);
        user2.setFullName("Second user");
        user2.setPostcode("9876ZY");
        user2.setStreetnumber("98");
        user2.setEmailAddress("second@user.com");
        user2.setPassword("second");
        user2.setRoles(new String[] { "GUEST" });

        fakeUsers = new ArrayList<>();
        fakeUsers.add(user);
        fakeUsers.add(user1);
        fakeUsers.add(user2);

        this.database = Database.getInstance();
    }

    public List<User> selectUsers(PreparedStatement statement) throws SQLException {
        ResultSet users = database.select(statement);
        List<User> resultList = new ArrayList<>();

        while (users.next()){
            User user = new User(
                    users.getInt("userID"),
                    users.getString("userFullname"),
                    users.getString("userPostcode"),
                    users.getString("userStreetnumber"),
                    users.getString("userEmail"),
                    users.getString("userPassword"),
                    users.getString("userRole").split("\\s+")
            );

            resultList.add(user);
        }


        return resultList;
    }

    public List<User> getAll()
    {
        //    try {
//            query = "SELECT * FROM User;";
//            statement = database.prepareStatement(query);
//
//            return selectUsers(statement);
//        }
//        catch (SQLException e) {
//            throw new RuntimeException(e);
//        }
        return fakeUsers;
    }
    
    public User get(int id)
    {
        //        try {
//            query = "SELECT * FROM User WHERE userID = ?;";
//            statement.setInt(1, id);
//            statement = database.prepareStatement(query);
//
//            return selectUsers(statement).get(0);
//        }
//        catch (SQLException e) {
//            throw new RuntimeException(e);
//        }
        try
        {
            return fakeUsers.get(id);
        }
        catch(IndexOutOfBoundsException exception)
        {
            return null;
        }
    }
    
    public User getByEmailAddress(String emailAddress)
    {
        //        try {
//            query = "SELECT * FROM User WHERE userEmail = ?;";
//            statement.setString(1, emailAddress);
//            statement = database.prepareStatement(query);
//
//            return selectUsers(statement).get(0);
//        }
//        catch (SQLException e) {
//            throw new RuntimeException(e);
//        }
        Optional<User> result = fakeUsers.stream()
            .filter(user -> user.getEmailAddress().equals(emailAddress))
            .findAny();
        
        return result.isPresent()
            ? result.get()
            : null;
    }
    
    public void add(User user)
    {
        fakeUsers.add(user);
    }

    public void createUser(String userFullname, String userPostcode, String userStreetnumber, String userEmail, String userPassword) {
        try {
            query = "INSERT INTO User (userFullname, userPostcode, userStreetnumber, userEmail, userPassword, userRole) VALUES (?, ?, ?, ?, ?, GUEST);";

            statement = database.prepareStatement(query);
            statement.setString(1, userFullname);
            statement.setString(2, userPostcode);
            statement.setString(3, userStreetnumber);
            statement.setString(4, userEmail);
            statement.setString(5, userPassword);

            database.update(statement);
        }
        catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }
    
    public void update(int id, User user)
    {
        fakeUsers.set(id, user);
    }

    public void updateUser(String userFullname, String userPostcode, String userStreetnumber, String userEmail, String userPassword, int userID) {
        try {
            query = "UPDATE User userFullname = ?, userPostcode = ?, userStreetnumber = ?, userEmail = ?, userPassword = ? WHERE userID = ?";

            statement = database.prepareStatement(query);
            statement.setString(1, userFullname);
            statement.setString(2, userPostcode);
            statement.setString(3, userStreetnumber);
            statement.setString(4, userEmail);
            statement.setString(5, userPassword);
            statement.setInt(6, userID);

            database.update(statement);
        }
        catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }
    
    public void delete(int id)
    {
        fakeUsers.remove(id);
    }

    public void deleteUser(int userID) {
        try {
            query = "DELETE FROM user WHERE userID = ?;";

            statement = database.prepareStatement(query);
            statement.setInt(1, userID);

            database.update(statement);
        }
        catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }
}
