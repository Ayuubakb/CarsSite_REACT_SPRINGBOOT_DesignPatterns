package com.Cars.Repositories;

import com.Cars.Models.usedCar;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.Update;

import java.util.List;
import java.util.Optional;

    public interface usedCarsRepo extends MongoRepository<usedCar,String> {
        @Query(value = "{model:?0,maker:?1,year:?2}" , fields = "{id:1,maker:1,model:1,year:1,price:1,photo:1}")
        List<usedCar> findUsedCars(String model, String maker, int year);
        @Query(value = "{id:?0}")
        usedCar findCarById(String id);

        @Query(value = "{seller:?0}", fields = "{id:1,maker:1,model:1,year:1,price:1}")
        List<usedCar> findCarBySeller(String seller);

    }
