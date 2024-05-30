package com.Cars.Strategy;

import com.Cars.Models.usedCar;
import jakarta.servlet.http.HttpSession;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface CarStrategy {
     usedCar createCar(usedCar usedCar, MultipartFile photo, String description, HttpSession session) throws IOException;
}
