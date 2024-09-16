package com.koiproject.KoiVeterinaryServiceCenter.service.role;

import com.koiproject.KoiVeterinaryServiceCenter.entity.Role;

import java.util.List;

public interface IRoleService {

    public List<Role> findAll();

    public Role findById(Long id);

    public Role save(Role role);

    public void delete(Long id);
}
