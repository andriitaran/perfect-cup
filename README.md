# PERFECT CUP

PERFECT CUP is a mobile application that will help you make a perfect cup of coffee anytime, every time! By using best recipes it will lead you through the process of making a perfect cup of coffee. Anybody who loves coffee and has a kitchen scale could use this app to teach themselves to make good coffee!

Currently, the app allows you to brew coffee via pour-over or french press - 2 of the most popular and accessible brewing methods available and could be purchased for under \$20.

What separates PERFECT CUP from similar apps is that it will also provide recommendations based on user input to adjust the recipe to fit the user’s taste profile at the end of the brewing process.

<img width="1280" alt="perfect_cup" src="https://i.ibb.co/TYDPKjm/perfect-cup.png">

## APP VIEWPORT :

Currently the app is setup for iPhone 8+ viewport(414x736 px), but could be easily adapted to other screen sizes. It will be always centered if you use a bigger viewport size.

## APP ROUTES :

/ - initial loading screen with video and logo
/register - allows user to register an account
/login - allows user to login into existing account
/prepare - allows user to choose between brewing methods
/prepare/pourover - allows user to start brewing via pour over
/prepare/frenchpress - allows user to start brewing via french press
/profile - user profile with brew data
/profile/brews/:id - loads specific brew data
/discover - curated selection of specialty coffee shops in Vancouver

## GENERAL FUNCTIONALITY :

Register & login. You will be redirected to PREPARE page. Click on the brew method you'd like to use in PREPARE section(components are modular and will allow adding other brewing methods in future in matter of minutes). Choose the amount of coffee you’d like to make - small, medium or large and it will automatically update how much ground coffee you need. And when you click on the ground coffee it will show you preset ratios that will allow you to customize the coffee to your taste. Steps at the bottom of the page are for reference. Click on the icon to start a brewing process. At the end of the brewing process you will be prompted to choose preset options. Clicking on save button will POST brewing data and redirect user to profile page. Profile page will display brew data for all brews. Clicking on a specific brew will load data of that brew with recommendations provided by the application. DISCOVER page contains a list of curated specialty coffee shops and displays them on map. Clicking on a specific coffee shop marker will load basic information about the shop.

## TECH STACK :

React, Node, Express, MongoDB, JWT for user authentication.
