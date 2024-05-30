package com.Cars.Strategy;

import com.Cars.Models.usedCar;
import jakarta.servlet.http.HttpSession;
import org.bson.BsonBinarySubType;
import org.bson.types.Binary;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.Objects;

public class PhotoDescription implements CarStrategy{
    @Override
    public usedCar createCar(usedCar usedCar, MultipartFile photo, String description, HttpSession session) throws IOException {
        HashMap<String, Object> photoObject=new HashMap<>();
        photoObject.put("photoBase", new Binary(BsonBinarySubType.BINARY, photo.getBytes()));
        photoObject.put("extension", photo.getOriginalFilename().split("\\.")[1]);
        return  new usedCar
                .usedCarBuilder(usedCar.getMaker(), usedCar.getModel(), usedCar.getYear(), usedCar.getMileage(), usedCar.getPrice(),((HashMap<String,String>)session.getAttribute("UserInfo")).get("Login"))
                .setPhoto(photoObject)
                .setDescription(description)
                .build();
    }
}
