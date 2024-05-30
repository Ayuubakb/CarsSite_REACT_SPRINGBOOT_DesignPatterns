package com.Cars.Strategy;

import com.Cars.Models.usedCar;
import jakarta.servlet.http.HttpSession;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public class Context {
    CarStrategy carStrategy;
    public void setCarStrategy(CarStrategy carStrategy){
        this.carStrategy=carStrategy;
    }
    public usedCar executeStrategy(usedCar usedCar, MultipartFile photo, String description, HttpSession session) throws IOException {
        return carStrategy.createCar(usedCar,photo,description,session);
    }

}
