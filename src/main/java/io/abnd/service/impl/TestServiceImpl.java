package io.abnd.service.impl;

import io.abnd.model.Message;
import org.springframework.stereotype.Service;

import io.abnd.service.intf.TestService;

import java.util.ArrayList;
import java.util.List;

@Service
public class TestServiceImpl implements TestService {

	public List<Message> test() {
        ArrayList<Message> messages = new ArrayList<Message>();

        messages.add(new Message("Message1", "Hello, world!"));
        messages.add(new Message("Message2", "Another one!"));

        return messages;
    }

}
