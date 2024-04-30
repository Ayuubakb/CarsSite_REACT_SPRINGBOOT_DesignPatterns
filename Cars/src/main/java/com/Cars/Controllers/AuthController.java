package com.Cars.Controllers;

import com.Cars.Models.User;
import com.Cars.Repositories.UserRepo;
import com.Cars.Projections.Signup;
import com.Cars.Projections.Login;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.util.HashMap;
import java.util.List;
import java.util.Objects;

import static org.springframework.web.bind.annotation.RequestMethod.*;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true",allowedHeaders = {"Content-Type"}, methods = {POST,GET,DELETE})
@RequestMapping("/auth")
@RestController
public class AuthController {
    @Autowired
    private UserRepo userRepository ;
    @PostMapping("/signup")
    public ResponseEntity<String> RegisterUser(@RequestBody Signup userInfo) throws NoSuchAlgorithmException, InvalidKeySpecException {
        User users =userRepository.findByLogin(userInfo.getLogin());
        if(users==null){
            String pass=User.hashPassword(userInfo.getPassword());
            User u=new User.UserBuilder(userInfo.getLogin(),pass,userInfo.getCity(),userInfo.getPhone()).build();
            userRepository.save(u);
            return new ResponseEntity<>("Signed Up Successfully", HttpStatus.OK);
        }else{
            return new ResponseEntity<>("Login Already Used", HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<String> LoginUser(@RequestBody Login login, HttpServletRequest request) throws NoSuchAlgorithmException, InvalidKeySpecException {
        User users =userRepository.findByLogin(login.getLogin());
        //checkSession(request);
        if (users!=null){
            String givenPassword=User.hashPassword(login.getPassword());
            if(users.getPassword().equals(givenPassword)){
                HashMap<String,Object> userMap=new HashMap<>();
                userMap.put("Id",users.getId());
                userMap.put("Login",users.getLogin());
                userMap.put("City",users.getCity());
                userMap.put("Phone",users.getPhone());
                userMap.put("Favourites",users.getFavorites());
                HttpSession session=request.getSession();
                session.setAttribute("UserInfo",userMap);
                return new ResponseEntity<>("Logged",HttpStatus.OK);
            }else {
                return new ResponseEntity<>("Incorrect Password", HttpStatus.BAD_REQUEST);
            }
        }else{
            return new ResponseEntity<>("No User By This Login",HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest req){
        HttpSession session= req.getSession(false);
        if(session != null){
            session.invalidate();
            return new ResponseEntity<>("loggedOut",HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @GetMapping("/checkSession")
    public ResponseEntity<Object> checkSession(HttpServletRequest req){
        HttpSession session =req.getSession(false);
        HashMap<String,Object> infos=new HashMap<>();
        if(session==null){
            infos.put("status","notLogged");
            return new ResponseEntity<>(infos,HttpStatusCode.valueOf(403));
        }else{
            infos.put("status","logged");
            infos.put("user",session.getAttribute("UserInfo"));
           return new ResponseEntity<>(infos, HttpStatusCode.valueOf(201));
        }
    }

}
