package com.fpt.Koi_Veterinary_Service_Center_API.config;

import com.fpt.Koi_Veterinary_Service_Center_API.entity.Role;
import com.fpt.Koi_Veterinary_Service_Center_API.entity.User;
import com.fpt.Koi_Veterinary_Service_Center_API.exception.AppException;
import com.fpt.Koi_Veterinary_Service_Center_API.repository.RoleRepository;
import com.fpt.Koi_Veterinary_Service_Center_API.repository.UserRepository;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class InitialSetupConfig {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    public InitialSetupConfig(UserRepository userRepository, PasswordEncoder passwordEncoder, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.roleRepository = roleRepository;
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
            if (!userRepository.existsByUserID("admin")) {
                User adminAccount = new User();
                adminAccount.setUserID("admin");
                adminAccount.setEmail("admin@gmail.com");
                adminAccount.setName("admin");
                adminAccount.setPhoneNumber("0123456789");
                adminAccount.setPassword(passwordEncoder.encode("123"));
                adminAccount.setRole(roleRepository.findByTitle("ADMIN").orElseThrow(() -> new AppException("Role not found")));
                userRepository.save(adminAccount);
            }
        };
    }
}
