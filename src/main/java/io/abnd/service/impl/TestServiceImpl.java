package io.abnd.service.impl;

import java.util.ArrayList;
import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import io.abnd.service.intf.TestService;

@Service
public class TestServiceImpl implements TestService {

	public String test() {
        return "Hello, World!";
    }

}
