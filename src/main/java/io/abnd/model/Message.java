package io.abnd.model;

public class Message {

    public String title;
    public String message;

    public Message(String title, String message) {
        this.title = title;
        this.message = message;
    }

    public String getTitle() {
        return this.title;
    }

    public String getMessage() {
        return this.message;
    }

}
