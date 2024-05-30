package com.Cars.Models;

import lombok.Generated;
import org.bson.types.Binary;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Base64;
import java.util.HashMap;

@Document(collection = "usedCars")
public class usedCar {
    @Id
    private String id;
    private HashMap<String,Object> photo;
    private String maker;
    private String model;
    private int year;
    private String description;
    private float price;
    private int mileage;
    private String seller;

    public String  getId() {
        return id;
    }
    public String getMaker() {
        return maker;
    }
    public HashMap<String, Object> getPhoto() {
        return photo;
    }
    public String getModel() {
        return model;
    }
    public int getYear() {
        return year;
    }
    public String getDescription() {
        return description;
    }
    public float getPrice() {
        return price;
    }
    public int getMileage() {
        return mileage;
    }
    public String getSeller(){
        return seller;
    }
    public usedCar(){}
    public usedCar(usedCarBuilder userCarBuilder){
        this.photo=userCarBuilder.photo;
        this.model=userCarBuilder.model;
        this.maker=userCarBuilder.maker;
        this.year=userCarBuilder.year;
        this.description=userCarBuilder.description;
        this.price=userCarBuilder.price;
        this.mileage=userCarBuilder.mileage;
        this.seller=userCarBuilder.seller;
    }
    public static class usedCarBuilder{

        private HashMap<String,Object> photo;
        private String maker;
        private String model;
        private int year;
        private String description;
        private float price;
        private int mileage;
        private String seller;

        public usedCarBuilder setPhoto(HashMap<String,Object> photo){
            this.photo=photo;
            return this;
        }
        public usedCarBuilder setDescription(String description) {
            this.description = description;
            return this;
        }

        public usedCarBuilder(String maker,String model, int year, int mileage, float price,String seller){
            this.model=model;
            this.maker=maker;
            this.year=year;
            this.mileage=mileage;
            this.price=price;
            this.seller=seller;
        }
        public usedCar build(){
            return new usedCar(this);
        }
    }
}
