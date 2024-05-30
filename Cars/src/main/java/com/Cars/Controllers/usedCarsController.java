package com.Cars.Controllers;

import com.Cars.Models.usedCar;
import com.Cars.Observer.DataBasePublisher;
import com.Cars.Observer.NotifObs;
import com.Cars.Projections.Seller;
import com.Cars.Repositories.UserRepo;
import com.Cars.Repositories.usedCarTemplate;
import com.Cars.Repositories.usedCarsRepo;
import com.Cars.Strategy.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.bson.BsonBinarySubType;
import org.bson.types.Binary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.*;

@CrossOrigin(origins = "http://localhost:3000", methods = {GET,POST,DELETE,PUT}, allowCredentials = "true")
@RequestMapping("/usedCar")
@RestController
public class usedCarsController {
    @Autowired
    usedCarsRepo usedCarRepo;
    @Autowired
    UserRepo userRepo;
    @Autowired
    usedCarTemplate usedCarTemplate;

    @PostMapping(path = "/add", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<String> addCar(@RequestPart("usedcar") usedCar usedCar, @RequestPart(name = "description", required = false) String Description , @RequestPart(name = "photo", required = false) MultipartFile photo, HttpServletRequest req) throws IOException {
        HttpSession session=req.getSession(false);
        Context context = new Context();
        if(session != null) {
            if (photo != null && Description != null) {
                context.setCarStrategy(new PhotoDescription());
            } else if (photo == null && Description != null) {
                context.setCarStrategy(new Description());
            } else if (Description == null && photo != null) {
                context.setCarStrategy(new Photo());
            } else {
                context.setCarStrategy(new NoPhotoNoDescription());
            }
            usedCarRepo.insert(context.executeStrategy(usedCar,photo,Description,session));
            DataBasePublisher dbp=new DataBasePublisher();
            NotifObs no=new NotifObs();
            dbp.addObserver(no);
            HashMap<String,String> msg=new HashMap<>();
            msg.put("Maker",usedCar.getMaker());
            msg.put("Model",usedCar.getModel());
            dbp.setMsg(msg);
            return new ResponseEntity<>("Car Added",HttpStatus.CREATED);
        }else{
            return new ResponseEntity<>("You Should Login First",HttpStatus.FORBIDDEN);
        }
    }

    @DeleteMapping("/deleteCar/{id}")
    public ResponseEntity<String> deleteCar(HttpServletRequest req, @PathVariable String id){
        HttpSession session=req.getSession(false);
        if(session!=null){
         HashMap<String,Object> userInfo=(HashMap<String,Object>)session.getAttribute("UserInfo");
         long r=usedCarTemplate.deleteCar(id);
         if(r!=0) {
             return new ResponseEntity<>("Deleted", HttpStatus.OK);
         }else{
             return new ResponseEntity<>("Something Went Wrong", HttpStatus.BAD_REQUEST);
         }
        }else{
            return new ResponseEntity<>("Please Login First",HttpStatus.FORBIDDEN);
        }
    }

    @GetMapping("/getCars/{model}/{maker}/{year}")
    public ResponseEntity<List<usedCar>> getCars(@PathVariable String model, @PathVariable String maker, @PathVariable int year, Model mode){
        //List<usedCar> usedCars=usedCarRepo.findUsedCars(model,maker,year);
        List<usedCar> usedCars= usedCarTemplate.findCars(maker,model,year);
        if(usedCars.size()!=0){
            for(usedCar us: usedCars){
                if(us.getPhoto()!=null) {
                    us.getPhoto().put("photoBase", Base64.getEncoder().encodeToString(((Binary) (us.getPhoto().get("photoBase"))).getData()));
                }
            }
            return new ResponseEntity<>(usedCars,HttpStatus.OK);
        }else{
            return new ResponseEntity<>(usedCars,HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/getCar/{Id}")
    public ResponseEntity<HashMap<String,Object>> findCar(@PathVariable String Id){
        HashMap<String,Object> full=new HashMap<>();
        usedCar theCar=usedCarRepo.findCarById(Id);
        Seller seller = userRepo.findSeller(theCar.getSeller());
        if(theCar.getPhoto()!=null){
            theCar.getPhoto().put("photoBase",Base64.getEncoder().encodeToString(((Binary) (theCar.getPhoto().get("photoBase"))).getData()));
        }
        full.put("Seller",seller);
        full.put("Car",theCar);
        return new ResponseEntity<>(full, HttpStatus.OK);
    }

    /*@GetMapping("/carsImage/{maker}/{model}/{year}")
    public String getImage(@PathVariable String maker,@PathVariable String model,@PathVariable String year ) throws IOException, InterruptedException {
        HttpRequest request = HttpRequest.newBuilder()
                .GET()
                .uri(URI.create("https://serpapi.com/search.json?engine=google_images&q="+maker+"%20"+model+"%20"+year+"%20car&api_key=2526a4f46452d1cfb1015284e551c6ffcdeaab9e3929fce8a60f7058413afa38"))
                .build();

        HttpResponse<String> response = HttpClient.newHttpClient()
                .send(request, HttpResponse.BodyHandlers.ofString());

        ObjectMapper objectMapper = new ObjectMapper();

        ImageApiResponse myObject = objectMapper.readValue(response.body(),ImageApiResponse.class);

        System.out.println("Response: " + myObject.getSuggested_searches().get(0).getThumbnail());
        return myObject.getSuggested_searches().get(0).getThumbnail();
    }*/
}
