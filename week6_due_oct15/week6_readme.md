# Week 6

**Date:** Oct 8

## Topic
Animating Sprites

## Content
functions

## Assignment
Assignment 6: Animated Clock (Due Oct 15)

### Description
For this assignment I wanted to have every aspect involve a time function even if you couldn't tell. Each of the circles relates to a specific time scale. One takes in the seconds() function and increases in diameter according to frame rate. Another circle pulses to each second and the diameter is informed by minutes. The last circle's diameter is infomred by the hour() time function. The background color changes when the mouse is clicked and creates a color based off of the millis() function (i.e. how many ms the sketch has been running). The color of the circles changes each day and is created based off of today's date. There is also a movement function so that when you click around on screen the circles will follow your cursor and move back to their original spaces. I created the seconds() informed circle to be the largest and linearly increase because then you aren't able to visually tell how many seconds have passed, simulating seconds dragging on. The hour() informed circle is the smallest because we often can't feel an hour pass by like we can with minutes. That is why the minutes() informed circle pulses because we can feel those seconds ticking by in the context of a minute.
