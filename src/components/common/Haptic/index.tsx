import {NativeModules} from 'react-native';

const {HapticModule} = NativeModules;

export const Haptic = {
  triggerHaptic: () => {
    if (HapticModule) {
      HapticModule.triggerHaptic();
    } else {
      console.error('HapticModule is not available');
    }
  },
};
