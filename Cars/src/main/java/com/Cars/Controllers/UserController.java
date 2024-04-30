package com.Cars.Controllers;

import com.Cars.Models.usedCar;
import com.Cars.Projections.Fav;
import com.Cars.Repositories.usedCarTemplate;
import com.Cars.Repositories.usedCarsRepo;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.websocket.Session;
import org.apache.catalina.User;
import org.apache.coyote.Response;
import org.bson.json.JsonObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true",methods = {RequestMethod.GET,RequestMethod.POST,RequestMethod.DELETE})
@RequestMapping("/user")
@RestController
public class UserController {
    @Autowired
    usedCarsRepo usedCarsRepo;
    @Autowired
    usedCarTemplate usedCarTemplate;

    @GetMapping("/profile")
    public ResponseEntity<Object> getProfile(HttpServletRequest req){
        HashMap<String,Object> res=new HashMap<>();
        HttpSession session=req.getSession(false);
        if(session != null){
            List<usedCar> usedCars=usedCarsRepo.findCarBySeller(((HashMap<String,String>)session.getAttribute("UserInfo")).get("Login"));
            res.put("UserInfo",session.getAttribute("UserInfo"));
            res.put("UsedCars",usedCars);
            return new ResponseEntity<>(res, HttpStatus.OK);
        }else{
            res.put("Response","No Session Found, Please Try Login");
            return new ResponseEntity<>(res,HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/AddFav")
    public ResponseEntity<String> addFavs(HttpServletRequest req, @RequestBody Fav favCar){
        HttpSession session=req.getSession(false);
        if(session != null){
            HashMap<String,Object> userInfo=(HashMap<String, Object>) session.getAttribute("UserInfo");
            long r=usedCarTemplate.addFav(userInfo.get("Login"),favCar);
            if(r == 0){
                return new ResponseEntity<>("Something Went Wrong", HttpStatusCode.valueOf(500));
            }else {
                ((List<Fav>)userInfo.get("Favourites")).add(favCar);
                return new ResponseEntity<>("Added", HttpStatus.OK);
            }
        }else{
            return new ResponseEntity<>("Please Try Again After Login In",HttpStatus.FORBIDDEN);
        }
    }
    @DeleteMapping("/deleteFav")
    public ResponseEntity<String> deleteFav(HttpServletRequest req, @RequestBody Fav favCar){
        HttpSession session= req.getSession(false);
        if (session != null) {
            HashMap<String, Object> userInfo = (HashMap<String, Object>) session.getAttribute("UserInfo");
            long r = usedCarTemplate.deleteFav(userInfo.get("Login"), favCar);
            if (r == 0) {
                return new ResponseEntity<>("Something Went Wrong", HttpStatusCode.valueOf(500));
            } else {
                Iterator<Fav> iterator = ((List<Fav>) userInfo.get("Favourites")).iterator();
                while (iterator.hasNext()){
                    Fav iterator1=iterator.next();
                    if(iterator1.getModel().equals(favCar.getModel())&&
                            iterator1.getModel().equals(favCar.getModel()) &&
                            iterator1.getModel().equals(favCar.getModel())){
                        iterator.remove();
                    }
                }
                return new ResponseEntity<>("Removed", HttpStatus.OK);
            }
        }else
            return new ResponseEntity<>("Please Try Again After Login In",HttpStatus.FORBIDDEN);
    }

    @PostMapping("/checkFav")
    public ResponseEntity<String> checkFav(HttpServletRequest req, @RequestBody Fav favCar){
        HttpSession session= req.getSession(false);
        if(session != null) {
            HashMap<String,Object> userInfo=(HashMap<String, Object>) session.getAttribute("UserInfo");
            long r=usedCarTemplate.checkFav(userInfo.get("Login"),favCar);
            if(r!=0) {
                return new ResponseEntity<>("1", HttpStatus.OK);
            }else
                return new ResponseEntity<>("0",HttpStatus.OK);
        }else{
            return new ResponseEntity<>("0",HttpStatus.OK);
        }
    }
}
