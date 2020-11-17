package nl.hsleiden;

import java.sql.*;

public class Database {

    private static Database instance = new Database();
    private static Connection connection;
    private static PreparedStatement preparedStatement;

    public PreparedStatement prepareStatement(String query) {
        try {
            preparedStatement = connection.prepareStatement(query);
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return preparedStatement;
    }

    public static Database getInstance() {
        return instance;
    }

    public boolean hasConnection() throws SQLException {
        return connection != null && !connection.isClosed();
    }

    private void connect(String host, String name, String user, String password) throws SQLException {
//        String connectionString = String.format("jdbc:mysql://%s/%s?user=%s&password=%s&serverTimezone=UTC", host, name, user, password);
//
//        if (!hasConnection()) {
//            try {
//                Class.forName("com.mysql.cj.jdbc.Driver");
//            }
//            catch (ClassNotFoundException e) {
//                e.printStackTrace();
//            }
//            connection = DriverManager.getConnection(connectionString);
//        }
    }

    private void disconnect() throws SQLException {
        if (hasConnection()) {
            connection.close();
        }
    }

    public ResultSet select(PreparedStatement statement) throws SQLException {
        return statement.executeQuery();
    }

    public void update(PreparedStatement statement) throws SQLException {
        // statement.executeUpdate();
    }
}
