package com.Cars.Observer;

import com.Cars.Models.User;
import com.Cars.Projections.Fav;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequestMapping("/obs")
public class NotifObs implements DataBaseObserver{
    private static HashMap<String,String> msg=new HashMap<>();
    public static int i=0;
    @Override
    public void update(HashMap<String,String> msgs){
        msg=msgs;
    }

    @GetMapping("/eventStream")
    public void sendAlert(HttpServletResponse response, HttpServletRequest req) {
        response.setContentType("text/event-stream");
        response.setCharacterEncoding("UTF-8");
        if(msg.size()!=0) {
            try {
                System.out.println(msg.get("Maker")+" "+msg.get("Model"));
                PrintWriter out = response.getWriter();
                out.write("data:" + msg.get("Maker") + "/" + msg.get("Model")+"\n\n");
                out.flush();
            } catch (IOException e) {
                e.printStackTrace();
            }
            i++;
            if(i==User.countFavs.size()){
                System.out.println("i:"+i+" ,count: "+User.countFavs.size());
                msg.remove("Maker");
                msg.remove("Model");
                i=0;
            }
        }else{
            try {
                PrintWriter out = response.getWriter();
                out.write("data:nn\n\n");
                out.flush();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

}
