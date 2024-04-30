package com.Cars.Repositories;

import com.Cars.Models.User;
import com.Cars.Projections.Seller;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

public interface UserRepo extends MongoRepository<User, String> {
    User findByLogin(String Login);
    @Query(value = "{login:?0}", fields = "{id:1,city:1,phone:1}")
    Seller findSeller(String login);

}
