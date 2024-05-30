package com.Cars.Observer;

import java.util.HashMap;

public interface DataBaseObserver {
    void update(HashMap<String,String> msg);
}
