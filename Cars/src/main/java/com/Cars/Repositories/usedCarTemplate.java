package com.Cars.Repositories;

import com.Cars.Models.User;
import com.Cars.Models.usedCar;
import com.Cars.Projections.Fav;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.BasicQuery;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class usedCarTemplate {
    @Autowired
    private MongoTemplate mt;

    public List<usedCar> findCars(String maker,String model,int year ){
        Query query=new Query();
        if(!maker.equals("nomakerspecified")){
            query.addCriteria(Criteria.where("maker").regex(maker,"i"));
        }
        if(!model.equals("nomodelspecified")){
            query.addCriteria(Criteria.where("model").regex(model,"i"));
        }
        if(year!=404){
            query.addCriteria(Criteria.where("year").is(year));
        }
        return mt.find(query, usedCar.class);
    }
    public long addFav(Object login, Fav fav){
        Query query = new Query();
        query.addCriteria(Criteria.where("login").is(login));
        Update update=new Update();
        update.push("favorites",fav);
        return mt.updateFirst(query,update,"User").getModifiedCount();
    }
    public long deleteFav(Object login,Fav fav){
        Query query=new Query();
        query.addCriteria(Criteria.where("login").is(login));
        Update update=new Update();
        update.pull("favorites",fav);
        return mt.updateFirst(query,update,User.class).getModifiedCount();
    }

    public long checkFav(Object login, Fav fav){
        Query query=new Query();
        query.addCriteria(Criteria.where("login").is(login));
        query.addCriteria(Criteria.where("favorites.model").is(fav.getModel()));
        query.addCriteria(Criteria.where("favorites.maker").is(fav.getMaker()));
        query.addCriteria(Criteria.where("favorites.year").is(fav.getYear()));
        return mt.count(query,User.class);
    }

    public long deleteCar(String id){
        Query query=new Query();
        query.addCriteria(Criteria.where("id").is(id));
        return mt.remove(query, usedCar.class).getDeletedCount();
    }
}
