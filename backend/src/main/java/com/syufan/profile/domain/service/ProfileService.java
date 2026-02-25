package com.syufan.profile.domain.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.syufan.profile.domain.model.About;
import com.syufan.profile.domain.model.Experience;
import com.syufan.profile.domain.model.Project;

import org.springframework.stereotype.Service;
import java.io.InputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ProfileService {
    private Map<String, Object> loadData() throws Exception{
        ObjectMapper mapper = new ObjectMapper();
        InputStream is = getClass().getResourceAsStream("/data.json");
        return mapper.readValue(is, Map.class);
    }

    private About getAbout() throws Exception {
        ObjectMapper mapper = new ObjectMapper();
        return mapper.convertValue(loadData().get("about"), About.class);
    }

    private List<Experience> getExperience() throws Exception {
        ObjectMapper mapper = new ObjectMapper();
        return mapper.convertValue(loadData().get("experience"),
            mapper.getTypeFactory().constructCollectionType(List.class, Experience.class));
    }

    private List<Project> getProjects() throws Exception {
        ObjectMapper mapper = new ObjectMapper();
        return mapper.convertValue(loadData().get("projects"),
            mapper.getTypeFactory().constructCollectionType(List.class, Project.class));
    }

    public Map<String, Object> getProfile() throws Exception {
        Map<String, Object> result = new HashMap<>();
        result.put("about", getAbout());
        result.put("experience", getExperience());
        result.put("projects", getProjects());
        return result;
    }

}
