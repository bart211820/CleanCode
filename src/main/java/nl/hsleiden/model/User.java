package nl.hsleiden.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonView;
import java.security.Principal;
import nl.hsleiden.View;
import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotEmpty;

/**
 * Meer informatie over validatie:
 *  http://hibernate.org/validator/
 * 
 * @author Peter van Vliet
 */
public class User implements Principal
{
    private int userID;
    private String fullName;
    private String postcode;
    private String streetnumber;
    private String emailAddress;
    private String password;
    private String[] roles;

    public User() {

    }

    public User(int userID, String fullName, String postcode, String streetnumber, String emailAddress, String password, String[] roles) {
        this.userID = userID;
        this.fullName = fullName;
        this.postcode = postcode;
        this.streetnumber = streetnumber;
        this.emailAddress = emailAddress;
        this.password = password;
        this.roles = roles;
    }

    public int getUserID() {
        return userID;
    }

    public void setUserID(int userID) {
        this.userID = userID;
    }

    public String getFullName()
    {
        return fullName;
    }

    public void setFullName(String fullName)
    {
        this.fullName = fullName;
    }

    public String getPostcode()
    {
        return postcode;
    }

    public void setPostcode(String postcode)
    {
        this.postcode = postcode;
    }

    public String getStreetnumber()
    {
        return streetnumber;
    }

    public void setStreetnumber(String streetnumber)
    {
        this.streetnumber = streetnumber;
    }

    public String getEmailAddress()
    {
        return emailAddress;
    }

    public void setEmailAddress(String emailAddress)
    {
        this.emailAddress = emailAddress;
    }

    public String getPassword()
    {
        return password;
    }

    public void setPassword(String password)
    {
        this.password = password;
    }

    @Override
    @JsonIgnore
    public String getName()
    {
        return fullName;
    }
    
    public String[] getRoles()
    {
        return roles;
    }

    public void setRoles(String[] roles)
    {
        this.roles = roles;
    }
    
    public boolean hasRole(String roleName)
    {
        if (roles != null)
        {
            for(String role : roles)
            {
                if(roleName.equals(role))
                {
                    return true;
                }
            }
        }
        
        return false;
    }
    
    public boolean equals(User user)
    {
        return emailAddress.equals(user.getEmailAddress());
    }
}
