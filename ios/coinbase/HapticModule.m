//
//  HapticModule.m
//  coinbase
//
//  Created by Glauber Brack Castro on 04/07/24.
//

#import <Foundation/Foundation.h>
#import "HapticModule.h"
#import <UIKit/UIKit.h>

@implementation HapticModule

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(triggerHaptic)
{
  if (@available(iOS 10.0, *)) {
    UIImpactFeedbackGenerator *generator = [[UIImpactFeedbackGenerator alloc] initWithStyle:UIImpactFeedbackStyleMedium];
    [generator impactOccurred];
  }
}

@end
