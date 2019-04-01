# Reef

A Raspberry Pi based controller for marine aquariums.

## Basics
The RPi functions as a server, running in node-red.  By connecting with a web browser, users can view the status of the aquarium pumps, filters, lights, heater and temperature.

![ScreenShot](https://raw.github.com/goossen/reef-node-red/master/flow.png)

### Power control
The RPi is connected to power relays using the GPIO pins.  Each relay in turn is connected to a power outlet used by the aquarium devices.  The lights can be individually scheduled to turn on/off on a daily schedule.  The pumps can be scheduled to power on and off at set intervals to imitate wave and tidal actions.  All devices may be individually controlled, such as during filter media or water changes.

The GPIO pins are controlled using the pi-gpio library.  The usage is based on an example of a web-controlled power strip: http://www.instructables.com/id/Web-Controlled-8-Channel-Powerstrip/?ALLSTEPS

### Temperature monitoring
Temperature sensors are connected to the RPi and monitor the current water temperature.  The temperature sensor is used to control a fan to cool the aquarium surface.  It could also be used as a failsafe for the aquarium heater.  The temperature sensor(s) uses the ds18b20 library.  An example of its usage is give here: https://learn.adafruit.com/adafruits-raspberry-pi-lesson-11-ds18b20-temperature-sensing?view=all

![Insides](https://raw.github.com/goossen/reef/master/insides.jpg)

### User Interface
The user interface is html, css and straight javascript.  The index.html is edited within node-red.

![ScreenShot](https://raw.github.com/goossen/reef/master/screenshot1.png)

## Installation

### Clone the git repository

### Add dependencies
sudo /opt/node/bin/npm install node-red-contrib-ds18b20-sensor
sudo /opt/node/bin/npm install node-red-contrib-bigtimer

### Edit user directory in /home/pi/.node-red/settings.js
set User directory : /home/pi/.node-red

### Start server
node-red-pi --max-old-space-size=128



