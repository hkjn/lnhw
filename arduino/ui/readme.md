# User interface

For every operation that reduces our funds we want to ask user for confirmation. We MUST display all necessary information about the transaction / invoice such that user can make sure that everything is correct.

## OLED screen + buttons

The easiest UI is a simple [OLED screen](https://www.adafruit.com/products/2900) with buttons.

With this screen we have 3 buttons and pretty small amount of space for the information. To be able to display all necessary information we need a scrolling function.

Buttons pinout:

- **Button A is #9** (note this is also used for the battery voltage divider)
- **Button B is #6**
- **Button C is #5**

Suggested actions:

- **Button A**: Confirm operation
- **Button B**: More information (scroll to the next string/line)
- **Button C**: Cancel operation

## TFT screen with touchscreen

TFT screen has much more space, so it can show all the information in the same screen and also show QR codes for generated payment invoices.

Suggested model TFT screen model: [Adafruit 3.5" 480x320 TFT FeatherWing](https://learn.adafruit.com/adafruit-3-5-tft-featherwing)