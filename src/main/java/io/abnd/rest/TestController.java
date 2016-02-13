package io.abnd.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import io.abnd.service.intf.TestService;

@RestController
public class TestController {

	@Autowired
	private TestService testService;

	@RequestMapping(value="/test/get/json", method=RequestMethod.GET, produces="application/json")
	public String testGetJson() {
		JsonObject jsonObject = new JsonObject();
		JsonObject message = new JsonObject();

		String result = testService.test();

		message.addProperty("message", "Hello, World!");
		jsonObject.add("test", message);

		return jsonObject.toString();
	}
}
