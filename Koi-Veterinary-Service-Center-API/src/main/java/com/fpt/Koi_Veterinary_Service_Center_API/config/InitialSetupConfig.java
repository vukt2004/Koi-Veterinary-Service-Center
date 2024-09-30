package com.fpt.Koi_Veterinary_Service_Center_API.config;

import com.fpt.Koi_Veterinary_Service_Center_API.entity.Fish;
import com.fpt.Koi_Veterinary_Service_Center_API.entity.Role;
import com.fpt.Koi_Veterinary_Service_Center_API.entity.User;
import com.fpt.Koi_Veterinary_Service_Center_API.entity.Veterinarian;
import com.fpt.Koi_Veterinary_Service_Center_API.entity.enums.Status;
import com.fpt.Koi_Veterinary_Service_Center_API.exception.AppException;
import com.fpt.Koi_Veterinary_Service_Center_API.repository.FishRepository;
import com.fpt.Koi_Veterinary_Service_Center_API.repository.RoleRepository;
import com.fpt.Koi_Veterinary_Service_Center_API.repository.UserRepository;
import com.fpt.Koi_Veterinary_Service_Center_API.repository.VeterinarianRepository;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class InitialSetupConfig {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final FishRepository fishRepository;
    private final VeterinarianRepository veterinarianRepository;

    public InitialSetupConfig(UserRepository userRepository, PasswordEncoder passwordEncoder, RoleRepository roleRepository, FishRepository fishRepository, VeterinarianRepository veterinarianRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.roleRepository = roleRepository;
        this.fishRepository = fishRepository;
        this.veterinarianRepository = veterinarianRepository;
    }

    @Bean
    public ApplicationRunner initializer() {

        return args -> {
            if(roleRepository.findByTitle("ADMIN").isEmpty()){
                Role admin = new Role();
                admin.setTitle("ADMIN");
                roleRepository.save(admin);
            }
            if(roleRepository.findByTitle("CUSTOMER").isEmpty()){
                Role customer = new Role();
                customer.setTitle("CUSTOMER");
                roleRepository.save(customer);
            }
            if(roleRepository.findByTitle("VETERINARIAN").isEmpty()){
                Role veterinarian = new Role();
                veterinarian.setTitle("VETERINARIAN");
                roleRepository.save(veterinarian);
            }
            if(roleRepository.findByTitle("STAFF").isEmpty()){
                Role staff = new Role();
                staff.setTitle("STAFF");
                roleRepository.save(staff);
            }
            if (!userRepository.existsByUserID("admin")) {
                User user = new User();
                user.setUserID("admin");
                user.setEmail("admin@gmail.com");
                user.setName("admin");
                user.setPhoneNumber("0123456789");
                user.setPassword(passwordEncoder.encode("123"));
                user.setRole(roleRepository.findByTitle("ADMIN").orElseThrow(() -> new AppException("Role not found")));
                userRepository.save(user);
            }
            if (!userRepository.existsByUserID("veterinarian")) {
                User user = new User();
                user.setUserID("veterinarian");
                user.setEmail("veterinarian@gmail.com");
                user.setName("veterinarian");
                user.setPhoneNumber("0123456789");
                user.setPassword(passwordEncoder.encode("123"));
                user.setRole(roleRepository.findByTitle("VETERINARIAN").orElseThrow(() -> new AppException("Role not found")));
                userRepository.save(user);
                Veterinarian veterinarian = new Veterinarian();
                veterinarian.setStatus(Status.ACTIVE);
                veterinarian.setUser(user);
                veterinarianRepository.save(veterinarian);
            }
            if (!userRepository.existsByUserID("customer")) {
                User user = new User();
                user.setUserID("customer");
                user.setEmail("customer@gmail.com");
                user.setName("customer");
                user.setPhoneNumber("0123456789");
                user.setPassword(passwordEncoder.encode("123"));
                user.setRole(roleRepository.findByTitle("CUSTOMER").orElseThrow(() -> new AppException("Role not found")));
                userRepository.save(user);
            }
            if (!userRepository.existsByUserID("staff")) {
                User user = new User();
                user.setUserID("staff");
                user.setEmail("staff@gmail.com");
                user.setName("staff");
                user.setPhoneNumber("0123456789");
                user.setPassword(passwordEncoder.encode("123"));
                user.setRole(roleRepository.findByTitle("STAFF").orElseThrow(() -> new AppException("Role not found")));
                userRepository.save(user);
            }
            if(!fishRepository.existsByFishID("F1")){
                Fish fish = new Fish();
                fish.setUser(userRepository.findByUserID("customer").orElseThrow(()-> new AppException("User not found")));
                fish.setWeight(1f);
                fish.setLength(1f);
                fish.setDescribe("yellow fish");
                fish.setMonth(3);
                fishRepository.save(fish);
            }
        };
    }
}
