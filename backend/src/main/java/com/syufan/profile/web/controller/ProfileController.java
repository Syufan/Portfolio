package com.syufan.profile.web.controller;

import com.syufan.profile.domain.model.About;
import com.syufan.profile.domain.model.Experience;
import com.syufan.profile.domain.model.Project;
import com.syufan.profile.domain.service.ProfileService;

import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class ProfileController {

    private final ProfileService profileService;

    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }

    @GetMapping("/")
    public Map<String, Object> getProfile() throws Exception {
        return profileService.getProfile();
    }
    
}
