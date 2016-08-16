package io.abnd.rest;

import io.abnd.model.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.google.gson.JsonObject;

import io.abnd.service.intf.TestService;

import java.util.List;

@RestController
public class TestController {

	@Autowired
	private TestService testService;

	@RequestMapping(value="/test/get/json", method=RequestMethod.GET, produces="application/json")
	public @ResponseBody List<Message> testGetJson() {
		return this.testService.test();
	}
}
