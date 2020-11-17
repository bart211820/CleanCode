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
    
    public UserDAO()
    {
        this.database = Database.getInstance();
    }

    public List<User> selectUsers(PreparedStatement statement) throws SQLException {
        ResultSet users = database.select(statement);
        List<User> resultList = new ArrayList<>();

        while (users.next()){
            User user = new User(
                    users.getInt("userID"),
                    users.getString("fullname"),
                    users.getString("postcode"),
                    users.getString("streetnumber"),
                    users.getString("emailAddress"),
                    users.getString("password"),
                    users.getString("roles").split("\\s+")
            );

            resultList.add(user);
        }


        return resultList;
    }

    public List<User> getAll()
    {
            try {
            query = "SELECT * FROM User;";
            statement = database.prepareStatement(query);

            return selectUsers(statement);
        }
        catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }
    
    public User get(int id)
    {
        try {
            query = "SELECT * FROM User WHERE userID = ?;";
            statement = database.prepareStatement(query);
            statement.setInt(1, id);

            return selectUsers(statement).get(0);
        }
        catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }
    
    public User getByEmailAddress(String emailAddress)
    {
        try {
            query = "SELECT * FROM User WHERE emailAddress = ?;";
            statement = database.prepareStatement(query);
            statement.setString(1, emailAddress);

            return selectUsers(statement).get(0);
        }
        catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public void createUser(String userFullname, String userPostcode, String userStreetnumber, String userEmail, String userPassword, String roles) {
        try {
            query = "INSERT INTO User (fullname, postcode, streetnumber, emailAddress, password, roles) VALUES (?, ?, ?, ?, ?, ?);";

            statement = database.prepareStatement(query);
            statement.setString(1, userFullname);
            statement.setString(2, userPostcode);
            statement.setString(3, userStreetnumber);
            statement.setString(4, userEmail);
            statement.setString(5, userPassword);
            statement.setString(6, roles);

            database.update(statement);
        }
        catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public void updateUser(String userFullname, String userPostcode, String userStreetnumber, String userEmail, String userPassword, int userID) {
        try {
            query = "UPDATE User SET fullname = ?, postcode = ?, streetnumber = ?, emailAddress = ?, password = ? WHERE userID = ?;";

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

    public void deleteUser(int userID) {
        try {
            query = "DELETE FROM User WHERE userID = ?;";

            statement = database.prepareStatement(query);
            statement.setInt(1, userID);

            database.update(statement);
        }
        catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }
}
