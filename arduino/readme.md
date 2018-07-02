# Arduino Hardware wallet

Folder [hackathon_code](./hackathon_code/) currently contains a bunch of unstructured Arduino sketches that we've put together in a very ugly way to get a working demo.

Now, when the hackathon is over and there are people from the team interested to keep working on the project, it's time to sort and refactor everything.

Arduino obviously is not the most secure platform, but it is easy enough to work with and perfect for prototyping. One can buy a board and OLED display for 40 euro and start playing with them right away.

This work will help us to understand what we need from the hardware wallet: what secrets have to be stored there and what secrets we can give to the host without worrying too much.

Ideally this work can be a first move towards standartisation of the communication protocol between a lightning client and a hardware wallet.

Arduino hardware wallet can be splitted into several parts:

- secrets generation and derivation
- secrets storage (SD card or secure storage)
- user interface (OLED display + buttons / TFT screen with touchscreen)
- communication protocol and interfaces (Serial / Bluetooth / TCP-IP)

Every part is more or less independent and can be developed and tested separately. Code for different functional parts is stored in separate folders and will be assembled later for a few demo use-cases.