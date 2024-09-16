package com.fpt.Koi_Veterinary_Service_Center_API.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;

@Entity
@Table(name = "Users")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class User implements UserDetails {
    @Id
    @Column(length = 30, nullable = false)
    private String userID;

    @Column(length = 60, nullable = false)
    private String password;

    @Column(length = 100)
    private String name;

    @Column(length = 50)
    private String email;

    @Column(length = 10)
    private String phoneNumber;

    @ManyToOne
    @JoinColumn(name="roleID", nullable=false)
    private Role role;

    @Column(length = 100)
    private String address;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(role.getTitle()));
        return authorities;
    }

    @Override
    public String getUsername() {
        return userID;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
