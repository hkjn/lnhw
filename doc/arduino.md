# Getting ready to work with Arduino boards

- Download and install desktop [Arduino IDE](https://www.arduino.cc/en/Main/Software)
- Add Adafruit boards following [this instruction](https://learn.adafruit.com/adafruit-feather-m0-adalogger/setup)
- Clone [arduino-bitcoin library](https://github.com/arduino-bitcoin/arduino-bitcoin)
- Clone [arduino-lightning library](https://github.com/arduino-bitcoin/arduino-lightning)
- Install libraries ([instruction](https://www.arduino.cc/en/guide/libraries))

## Debugging permission issues with serial device

We found that there's frequently steps that need to be taken to allow a non-privileged user to read and write
from serial port devices for Arduino hardware on Linux.

When the hardware Arduino device is plugged in, a new device file should appear under `/dev`. Run the following
command, then plug in the device and it should appear, e.g as `/dev/ttyACM0`:

```
$ watch ls /dev/ttyACM*
```

In all command that follow, replace `/dev/ttyACM0` with the actual name of your device if it differed.
If a command like the following succeeds, you can read from the device with your non-privileged user:

```
$ cat /dev/ttyACM0
```

If that gives a "permission denied" error, you can run `ls -l /dev/ttyACM0` to see which permissions the device
file has. If it e.g is owned by group `dialout`, you can add yourself to that group if necessary:

```
$ # show all groups you are member of right now:
$ id
$ # add yourself to the group that owns the device (e.g 'dialout' in example below):
$ sudo usermod -a -G dialout $USER
$ # reload user groups for this shell (alternatively reboot your system):
$ su - $USER
$ # now your user should be a member of the 'dialout' group:
$ id
```

Alternatively (or if you are having issues with the above), you can add a new udev rule to give yourself
access. Details of exactly how the rule should look like seems to differ between distributions, but for
Arch Linux the following worked:

```
$ # use 'lsusb' to see the vendor and product id of the device as you plug it in:
$ watch lsusb
$ # if the lsusb output was like 'Bus 002 Device 003: ID 03eb:2111 Atmel Inc.', the
$ # 'idVendor' value would be '03eb', and 'idProduct' would be '2111'.. now create a new
$ # udev rule under the appropriate directory, usually /etc/udev/rules.d:
$ sudo nano /etc/udev/rules.d/50-arduino.rules
$ # add a rule like the following in the editor that opens, updating idVendor, idProduct and
$ # possibly other fields as necessary:
$ # SUBSYSTEMS=="usb", ATTRS{idVendor}=="03eb", ATTRS{idProduct}=="2111", MODE="0660", TAG+="uaccess", TAG+="udev-acl"
$ # now you can reload the udev rules:
$ sudo udevadm control --reload-rules && udevadm trigger
