package com.fpt.Koi_Veterinary_Service_Center_API;

import com.fpt.Koi_Veterinary_Service_Center_API.utils.EmailUtils;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class KoiVeterinaryServiceCenterApiApplication {
	public static void main(String[] args){
		SpringApplication.run(KoiVeterinaryServiceCenterApiApplication.class, args);
	}

}
