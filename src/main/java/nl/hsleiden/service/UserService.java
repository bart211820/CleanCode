package nl.hsleiden.service;

import java.util.Collection;
import javax.inject.Inject;
import javax.inject.Singleton;
import nl.hsleiden.model.User;
import nl.hsleiden.persistence.UserDAO;
import org.mindrot.jbcrypt.BCrypt;

/**
 *
 * @author Peter van Vliet
 */
@Singleton
public class UserService extends BaseService<User>
{
    private final UserDAO dao;
    
    @Inject
    public UserService(UserDAO dao)
    {
        this.dao = dao;
    }
    
    public Collection<User> getAll()
    {
        return dao.getAll();
    }
    
    public User get(int id)
    {
        return requireResult(dao.get(id));
    }
    
    public void add(User user)
    {
//        user.setRoles(new String[] { "GUEST" });

        user.setPassword(BCrypt.hashpw(user.getPassword(), BCrypt.gensalt()));

        String roles = "";
        for(String role : user.getRoles()) {
            roles = roles + role + " ";
        }

        dao.createUser(user.getFullName(), user.getPostcode(), user.getStreetnumber(), user.getEmailAddress(), user.getPassword(), roles);
    }
    
    public void update(User authenticator, int id, User user)
    {
        // Controleren of deze gebruiker wel bestaat
        User oldUser = get(id);
        
        if (!authenticator.hasRole("ADMIN"))
        {
            // Vaststellen dat de geauthenticeerde gebruiker
            // zichzelf aan het aanpassen is
            assertSelf(authenticator, oldUser);
        }

        // Kijken of wachtwoord aangepast moet worden
        if (!user.getPassword().equals(oldUser.getPassword())) {
            // Als ze niet gelijk zijn, is het dus een nieuw wachtwoord, gebruik eerst BCrypt
            user.setPassword(BCrypt.hashpw(user.getPassword(), BCrypt.gensalt()));
        }
        
        dao.updateUser(user.getFullName(), user.getPostcode(), user.getStreetnumber(), user.getEmailAddress(), user.getPassword(), user.getUserID());
    }
    
    public void delete(int id)
    {
        // Controleren of deze gebruiker wel bestaat
        User user = get(id);
        
        dao.deleteUser(id);
    }
}
