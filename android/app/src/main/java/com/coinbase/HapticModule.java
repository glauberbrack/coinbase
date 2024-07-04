package com.coinbase;

import android.os.VibrationEffect;
import android.os.Vibrator;
import android.content.Context;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class HapticModule extends ReactContextBaseJavaModule {

  private static ReactApplicationContext reactContext;

  HapticModule(ReactApplicationContext context) {
    super(context);
    reactContext = context;
  }

  @Override
  public String getName() {
    return "HapticModule";
  }

  @ReactMethod
  public void triggerHaptic() {
    Vibrator vibrator = (Vibrator) reactContext.getSystemService(Context.VIBRATOR_SERVICE);
    if (vibrator != null && vibrator.hasVibrator()) {
      vibrator.vibrate(VibrationEffect.createOneShot(500, VibrationEffect.DEFAULT_AMPLITUDE));
    }
  }
}
