package com.Cars.Models;

import com.Cars.Observer.DataBaseObserver;
import com.Cars.Projections.CarCount;
import com.Cars.Projections.Fav;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.KeySpec;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Document(collection = "User")
public class User {
    @Id
    private String id;
    private String login;
    private String password;
    private String city;
    private String phone;
    private List<Fav> favorites=new ArrayList<Fav>();
    public static HashMap<String, HashMap<String,Long>> countFavs=new HashMap<>();

    public String getId() {
        return id;
    }
    public String getLogin() {
        return login;
    }
    public String getPassword() {
        return password;
    }
    public List<Fav> getFavorites() {
        return favorites;
    }
    public String getCity() {
        return city;
    }
    public String getPhone() {
        return phone;
    }
    public User(){

    }
    public User(UserBuilder userBuilder) {
        this.login = userBuilder.login;
        this.password = userBuilder.password;
        this.city = userBuilder.city;
        this.phone = userBuilder.phone;
        this.favorites = userBuilder.favorites;
    }

    public static String hashPassword(String password) throws NoSuchAlgorithmException, InvalidKeySpecException {
        //SecureRandom random=new SecureRandom();
        byte[] salt=new byte[16];
        //random.nextBytes(salt);
       for(byte i=0;i<16;i++){
           salt[i]=i;
       }
        KeySpec spec=new PBEKeySpec(password.toCharArray(),salt,600,120);
        SecretKeyFactory factory=SecretKeyFactory.getInstance("PBKDF2WithHmacSHA1");
        byte[] hash=factory.generateSecret(spec).getEncoded();
        return  new String(hash, StandardCharsets.UTF_8);
    }

    public static class UserBuilder{
        private String login;
        private String password;
        private String city;
        private String phone;
        private List<Fav> favorites;

        public UserBuilder(String login,String password,String city, String phone){
            this.login=login;
            this.password=password;
            this.city=city;
            this.phone=phone;
        }

        public UserBuilder setFavorites(List<Fav> favorites) {
            this.favorites = favorites;
            return this;
        }

        public User build(){
            return new User(this);
        }
    }
}
