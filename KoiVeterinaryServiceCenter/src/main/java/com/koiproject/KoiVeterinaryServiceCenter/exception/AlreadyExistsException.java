package com.koiproject.KoiVeterinaryServiceCenter.exception;

public class AlreadyExistsException extends RuntimeException {
    public AlreadyExistsException(String message) {
        super(message);
    }
}
