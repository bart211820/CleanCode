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
//        try {
//            query = "SELECT * FROM Animator;";
//            statement = database.prepareStatement(query);
//
//            return selectAnimators(statement);
//        }
//        catch (SQLException e) {
//            throw new RuntimeException(e);
//        }
        Animator animator1 = new Animator(1, "TheOdd1sOut", "https://www.youtube.com/channel/UCo8bcnLyZH8tBIH9V1mLgqQ", "https://yt3.ggpht.com/a-/AAuE7mAdLPVNtqjYHu9gffkZSRsNDtdPW6T228iO9Q=s288-mo-c-c0xffffffff-rj-k-no");
        Animator animator2 = new Animator(2, "Jaiden Animations", "https://www.youtube.com/channel/UCGwu0nbY2wSkW8N-cghnLpA", "https://yt3.ggpht.com/a-/AAuE7mBIrCpIdm5MYtFos91XRTNePDE_Kh4hWi_ruA=s288-mo-c-c0xffffffff-rj-k-no");
        Animator animator3 = new Animator(3, "Chipflake", "https://www.youtube.com/channel/UCRE6itj4Jte4manQEu3Y7OA", "https://yt3.ggpht.com/a/AATXAJycLaT-wYa_4cdxLmFBu5dZbBWkozXBWhEiMdA6Zg=s88-c-k-c0x00ffffff-no-rj");
        Animator animator4 = new Animator(4, "AmyRightMeow", "https://www.youtube.com/channel/UClN24S5-fc7LD0JJW0FdGWw", "https://yt3.ggpht.com/ytc/AAUvwng3uY2n2SObFg_gAnx8QKsLZO7iq_rlcBddpjbkqQ=s88-c-k-c0x00ffffff-no-rj");
        List temporaryList = new ArrayList();
        temporaryList.add(animator1);
        temporaryList.add(animator2);
        temporaryList.add(animator3);
        temporaryList.add(animator4);
        return temporaryList;
    }

    public Animator getAnimator(int animatorID){
//        try {
//            query = "SELECT * FROM Animator WHERE animatorID = ?;";
//            statement.setInt(1, animatorID);
//            statement = database.prepareStatement(query);
//
//            return selectAnimators(statement).get(0);
//        }
//        catch (SQLException e) {
//            throw new RuntimeException(e);
//        }

        if(animatorID == 1){
            return new Animator(1, "TheOdd1sOut", "https://www.youtube.com/channel/UCo8bcnLyZH8tBIH9V1mLgqQ", "https://yt3.ggpht.com/a-/AAuE7mAdLPVNtqjYHu9gffkZSRsNDtdPW6T228iO9Q=s288-mo-c-c0xffffffff-rj-k-no");
        }
        if(animatorID == 2){
            return new Animator(2, "Jaiden Animations", "https://www.youtube.com/channel/UCGwu0nbY2wSkW8N-cghnLpA", "https://yt3.ggpht.com/a-/AAuE7mBIrCpIdm5MYtFos91XRTNePDE_Kh4hWi_ruA=s288-mo-c-c0xffffffff-rj-k-no");
        }
        if(animatorID == 3){
            return new Animator(3, "Chipflake", "https://www.youtube.com/channel/UCRE6itj4Jte4manQEu3Y7OA", "https://yt3.ggpht.com/a/AATXAJycLaT-wYa_4cdxLmFBu5dZbBWkozXBWhEiMdA6Zg=s88-c-k-c0x00ffffff-no-rj");
        }
        return new Animator(4, "AmyRightMeow", "https://www.youtube.com/channel/UClN24S5-fc7LD0JJW0FdGWw", "https://yt3.ggpht.com/ytc/AAUvwng3uY2n2SObFg_gAnx8QKsLZO7iq_rlcBddpjbkqQ=s88-c-k-c0x00ffffff-no-rj");
    }

    public void createAnimator(String animatorName, String animatorLink, String animatorImage) {
        try {
            query = "INSERT INTO Animator (animatorName, animatorLink, animatorImage) VALUES (" + animatorName + ", " + animatorLink + ", " + animatorImage + ");";
            System.out.println("\"Created\" animator with: " + query);

//            statement = database.prepareStatement(query);
//            statement.setString(1, animatorName);
//            statement.setString(2, animatorLink);
//            statement.setString(3, animatorImage);
//
//            database.update(statement);
        }
        catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public void updateAnimator(String animatorName, String animatorLink, String animatorImage, int animatorID) {
        try {
            query = "UPDATE Animator animatorName = " + animatorName + ", animatorLink = " + animatorLink + ", animatorImage = " + animatorImage + " WHERE animatorID = " + animatorID;
            System.out.println("\"Updated\" animator with: " + query);
//            statement = database.prepareStatement(query);
//            statement.setString(1, animatorName);
//            statement.setString(2, animatorLink);
//            statement.setString(3, animatorImage);
//            statement.setInt(4, animatorID);
//
//            database.update(statement);
        }
        catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public void deleteAnimator(int animatorID) {
        try {
            query = "DELETE FROM animator WHERE animatorID = " + animatorID + ";";
            System.out.println("\"Deleted\" animator with: " + query);
//            statement = database.prepareStatement(query);
//            statement.setInt(1, animatorID);
//
//            database.update(statement);
        }
        catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
