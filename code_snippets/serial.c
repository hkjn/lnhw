/*
 * This program sends the string from command line argument argv[1] to the serial port
 * If there are no arguments - sends "Nothing"
 * Can be used to debug communication between hardware device and our hsmd daemon
 * TODO: add serial_read function
 */

#include <stdio.h>
#include <fcntl.h>   /* File Control Definitions           */
#include <termios.h> /* POSIX Terminal Control Definitions */
#include <unistd.h>  /* UNIX Standard Definitions      */ 
#include <errno.h>   /* ERROR Number Definitions           */
#include <string.h>

// write here the serial port you have Arduino plugged to
// should be autodetected afterwards
static char serialport[] = "/dev/cu.usbmodem1461";

static void serial_write(char * msg){
    int fd;/*File Descriptor*/

    fd = open(serialport, O_RDWR | O_NOCTTY | O_NDELAY);
                            /* O_RDWR Read/Write access to serial port           */
                            /* O_NOCTTY - No terminal will control the process   */
                            /* O_NDELAY -Non Blocking Mode,Does not care about-  */
                            /* -the status of DCD line,Open() returns immediatly */                                        
                            
    if(fd == -1)                        /* Error Checking */
        return;

    /*---------- Setting the Attributes of the serial port using termios structure --------- */

    struct termios SerialPortSettings;  /* Create the structure                          */

    tcgetattr(fd, &SerialPortSettings); /* Get the current attributes of the Serial port */

    cfsetispeed(&SerialPortSettings,B9600); /* Set Read  Speed as 9600                       */
    cfsetospeed(&SerialPortSettings,B9600); /* Set Write Speed as 9600                       */

    SerialPortSettings.c_cflag &= ~PARENB;   /* Disables the Parity Enable bit(PARENB),So No Parity   */
    SerialPortSettings.c_cflag &= ~CSTOPB;   /* CSTOPB = 2 Stop bits,here it is cleared so 1 Stop bit */
    SerialPortSettings.c_cflag &= ~CSIZE;    /* Clears the mask for setting the data size             */
    SerialPortSettings.c_cflag |=  CS8;      /* Set the data bits = 8                                 */

    SerialPortSettings.c_cflag &= ~CRTSCTS;       /* No Hardware flow Control                         */
    SerialPortSettings.c_cflag |= CREAD | CLOCAL; /* Enable receiver,Ignore Modem Control lines       */ 


    SerialPortSettings.c_iflag &= ~(IXON | IXOFF | IXANY);          /* Disable XON/XOFF flow control both i/p and o/p */
    SerialPortSettings.c_iflag &= ~(ICANON | ECHO | ECHOE | ISIG);  /* Non Cannonical mode                            */

    SerialPortSettings.c_oflag &= ~OPOST;/*No Output Processing*/
    
    /*------------------------------- Write data to serial port -----------------------------*/

    int  bytes_written  = 0;    /* Value for storing the number of bytes written to the port */ 

    bytes_written = write(fd,msg,strlen(msg));/* use write() to send data to port                                            */
                                     /* "fd"                   - file descriptor pointing to the opened serial port */
                                     /* "write_buffer"         - address of the buffer containing data              */
                                     /* "sizeof(write_buffer)" - No of bytes to write                               */  
    close(fd);/* Close the Serial port */
}

int main(int argc, char * argv[]){
    if(argc==1){
        serial_write("Nothing");
        return 1;
    }
    if(argc>=2){
        serial_write(argv[1]);
    }
    return 0;
}