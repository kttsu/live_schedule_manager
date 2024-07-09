package com.tsuchiya.live;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    // LiveNotFoundExceptionとDuplicateLiveDataExceptionを処理するためのハンドラ。
    @ExceptionHandler(LiveNotFoundException.class)
    public ResponseEntity<LiveResponse> handleLiveNotFoundException(LiveNotFoundException ex) {
        LiveResponse response = new LiveResponse(ex.getMessage());
        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(DuplicateLiveDataException.class)
    public ResponseEntity<LiveResponse> handleDuplicateLiveDataException(DuplicateLiveDataException ex) {
        LiveResponse response = new LiveResponse(ex.getMessage());
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }
}

