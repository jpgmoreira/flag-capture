# Flag Capture

An AI that learns how to play a flag capturing game using the [Q-Learning algorithm](https://en.wikipedia.org/wiki/Q-learning).

The game consists of a robot that explores a 10 x 10 tile map, and its objective is to collect flags and avoid obstacles.

Every time the robot captures a flag, it receives a positive reward (set to +100 points). If it falls in an obstacle, it receives a negative reward (-140 points). A step that doesn't result in capturing a flag nor falling in an obstacle gives to the robot a small negative reward (-0.2 points).

Demo video: https://www.youtube.com/watch?v=ljXbDU3MfGc



## Running it locally

To run this application on your machine, you need to have installed the g++ compiler, make and Node.js

1. Clone or download this repository to your local machine.

2. Navigate to the flag-capture/ai folder and open a commands terminal.

3. Run the `make` command. It will compile the C++ files and generate a `main` executable file inside this same flag-capture/ai directory.

   If you don't have `make` installed on your machine, you can still compile the files using the following command: `g++ -o main random_numbers.cpp qlearning.cpp main.cpp -std=c++11  ` .

4. Navigate to flag-capture/controller and open a commands terminal.

5. Run the `npm install` command. It will install the necessary Node packages for the application.

6. Navigate to the flag-capture directory from your commands terminal (`cd ..`), and run the command `node controller/src/app.js`. It must show you the following message: *Open your browser and access localhost:3000*

7. Now just access localhost:3000 from your browser. It will show you a page with the "Initializing..." message, and after a while the application will start.



## Implementation

The Q-Learning algorithm was implemented in C++11, and the browser-based game was written in JavaScript using the [Konva.js](https://konvajs.org/) canvas library. 

[Node.js](https://nodejs.org/) was used to communicate between the Q-Learning process and the browser.



## Assets credits

- favicon.png: https://www.flaticon.com/free-icon/robot_2942773

  - Attribution: "Icon made by [Eucalyp](https://www.flaticon.com/authors/eucalyp) from www.flaticon.com"

- flag.png: https://ya-webdesign.com/transparent250_/flag-icon-png-14.png

- robot.png: https://ya-webdesign.com/images600_/toy-robot-png-1.png

  

