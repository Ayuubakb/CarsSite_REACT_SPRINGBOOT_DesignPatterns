package com.Cars.Observer;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class DataBasePublisher {
    List<DataBaseObserver> observers=new ArrayList<>();
    HashMap<String,String> msg;

    public void addObserver(DataBaseObserver dbo) {
        observers.add(dbo);
    }
    public void removeObserver(DataBaseObserver dbo) {
        observers.add(dbo);
    }
    public void notifyObservers() {
        for(DataBaseObserver dbo:observers){
            dbo.update(msg);
        }
    }
    public void setMsg(HashMap<String,String> msg){
        this.msg=msg;
        notifyObservers();
    }
}
