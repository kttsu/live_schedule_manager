package com.tsuchiya.live;

// 指定されたIDに対応するライブ情報が見つからない場合にスローするための例外処理クラス。
public class LiveNotFoundException extends RuntimeException {
    public LiveNotFoundException(String message) {
        super(message);
    }
}

