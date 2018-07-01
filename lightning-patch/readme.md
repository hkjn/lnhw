# Patch installation

1. Replace serial port name in `readwrite.c` to your port name
2. Compile readwrite.c file `gcc readwrite.c -o rw`
3. Copy `rw` executable to `~/.lightning/` folder
4. Replace (keep originals) the files in lightning folder
5. `make`
6. Run `lightningd`
