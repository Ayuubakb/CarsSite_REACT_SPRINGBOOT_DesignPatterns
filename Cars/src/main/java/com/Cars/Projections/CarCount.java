package com.Cars.Projections;

public class CarCount {
    private String model;
    private String maker;
    private long count;

    public CarCount(String maker,String model,long count){
        this.model=model;
        this.maker=maker;
        this.count=count;
    }
    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public String getMaker() {
        return maker;
    }

    public void setMaker(String maker) {
        this.maker = maker;
    }

    public long getCount() {
        return count;
    }

    public void setCount(long count) {
        this.count = count;
    }

}
