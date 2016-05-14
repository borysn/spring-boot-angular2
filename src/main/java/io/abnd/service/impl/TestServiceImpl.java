package io.abnd.service.impl;

import org.springframework.stereotype.Service;

import io.abnd.service.intf.TestService;

@Service
public class TestServiceImpl implements TestService {

	public String test() {
        return "Hello, World!";
    }

}
