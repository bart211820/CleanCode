package nl.hsleiden.persistence;

import nl.hsleiden.Database;
import nl.hsleiden.model.Animator;
import nl.hsleiden.model.Item;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class AnimatorDAO {
    private Database database;
    private PreparedStatement statement;
    private String query;
    private List<Animator> results;

    public AnimatorDAO() {
        this.database = Database.getInstance();
    }

    public List<Animator> selectAnimators(PreparedStatement statement) throws SQLException {
        ResultSet animators = database.select(statement);
        List<Animator> resultList = new ArrayList<>();

        while (animators.next()){
            Animator animator = new Animator(
                    animators.getInt("animatorID"),
                    animators.getString("animatorName"),
                    animators.getString("animatorLink"),
                    animators.getString("animatorImage")
            );

            resultList.add(animator);
        }

        return resultList;
    }

    public List<Animator> getAllAnimators() {
        try {
            query = "SELECT * FROM Animator;";
            statement = database.prepareStatement(query);

            return selectAnimators(statement);
        }
        catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public Animator getAnimator(int animatorID){
        try {
            query = "SELECT * FROM Animator WHERE animatorID = ?;";
            statement = database.prepareStatement(query);
            statement.setInt(1, animatorID);

            return selectAnimators(statement).get(0);
        }
        catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public void createAnimator(String animatorName, String animatorLink, String animatorImage) {
        try {
            query = "INSERT INTO Animator (animatorName, animatorLink, animatorImage) VALUES (?, ?, ?);";

            statement = database.prepareStatement(query);
            statement.setString(1, animatorName);
            statement.setString(2, animatorLink);
            statement.setString(3, animatorImage);

            database.update(statement);
        }
        catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public void updateAnimator(String animatorName, String animatorLink, String animatorImage, int animatorID) {
        try {
            query = "UPDATE Animator SET animatorName = ?, animatorLink = ?, animatorImage = ? WHERE animatorID = ?;";

            statement = database.prepareStatement(query);
            statement.setString(1, animatorName);
            statement.setString(2, animatorLink);
            statement.setString(3, animatorImage);
            statement.setInt(4, animatorID);

            database.update(statement);
        }
        catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public void deleteAnimator(int animatorID) {
        try {
            query = "DELETE FROM Animator WHERE animatorID = ?;";

            statement = database.prepareStatement(query);
            statement.setInt(1, animatorID);

            database.update(statement);
        }
        catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }
}
