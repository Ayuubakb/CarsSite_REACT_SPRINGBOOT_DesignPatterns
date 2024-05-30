package com.Cars.Strategy;

import com.Cars.Models.usedCar;
import jakarta.servlet.http.HttpSession;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;

public class NoPhotoNoDescription implements CarStrategy{
    @Override
    public usedCar createCar(usedCar usedCar, MultipartFile photo, String description, HttpSession session) throws IOException {
        return new usedCar
                .usedCarBuilder(usedCar.getMaker(), usedCar.getModel(), usedCar.getYear(), usedCar.getMileage(), usedCar.getPrice(),((HashMap<String,String>)session.getAttribute("UserInfos")).get("Id"))
                .build();
    }
}
