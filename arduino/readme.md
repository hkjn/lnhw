# Arduino Hardware wallet

Folder [hackathon_code](./hackathon_code/) currently contains a bunch of unstructured Arduino sketches that we've put together in a very ugly way to get a working demo.

Now, when the hackathon is over and there are people from the team interested to keep working on the project, it's time to sort and refactor everything.

Arduino obviously is not the most secure platform, but it is easy enough to work with and perfect for prototyping. One can buy a board and OLED display for 40 euro and start playing with them right away.

This work will help us to understand what we need from the hardware wallet: what secrets have to be stored there and what secrets we can give to the host without worrying too much.

Ideally this work can be a first move towards standartisation of the communication protocol between a lightning client and a hardware wallet.

Arduino hardware wallet can be splitted into several parts:

- [secrets generation and derivation](./secrets/)
- [secrets storage](./storage/) (SD card or secure storage)
- [user interface](./ui/) (OLED display + buttons / TFT screen with touchscreen)
- [communication](./communication/) protocol and interfaces (Serial / Bluetooth / TCP-IP)

Every part is more or less independent and can be developed and tested separately. Code for different functional parts is stored in separate folders and will be assembled later for a few demo use-cases.

Assembled sketch with current functionality is in the [hsm/hardware_wallet](./hsm/hardware_wallet/) folder.

# Boards

Not every Arduino board will work with our project. The sketch requires some significant amount of space, memory and uses 64-bit unsigned integers for amounts that only 32-bit microcontrollers support.

In general any 32-bit microcontroller will work. But to be more specific here is a list:

- [Genuino Zero](https://store.arduino.cc/genuino-zero)
- [Arduino Due](https://store.arduino.cc/arduino-due)
- [Arduino M0 family](https://store.arduino.cc/arduino-m0)
- [Arduino MKR family](https://store.arduino.cc/homepage/arduino-mkrfox1200)
- [Adafruit M0 family](https://www.adafruit.com/product/2796)

There are also faster boards based on ARM Cortex M3, M4 and ESP32. They should work, but I would recommend to start with M0. I tried them and they are a bit harder to work with. As soon as we test our firmware on M0 we can start moving to faster MCU.

If you don't have a soldering station or you just don't want to solder anything, I would recommend to look very carefully at what you are buying. Arduino don't require soldering, but Adafruit does. And to be able to plug in the OLED screen you should also buy [the headers](https://www.adafruit.com/product/2886).