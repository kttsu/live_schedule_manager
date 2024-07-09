package com.tsuchiya.live;

// 既存のレコードと同じライブ情報を更新しようとした場合にスローするための例外処理クラス。
public class DuplicateLiveDataException extends RuntimeException {
    public DuplicateLiveDataException(String message) {
        super(message);
    }
}

