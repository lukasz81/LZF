# Little Zebra Foundation

This is a single page app that uses component state as well as Redux.

## TL;DR

To get started right away:

* install all project dependencies with `npm install`
* start the development server with `npm start`
* run tests with `npm run test`

## Redux / React Redux

I have shown ability to use redux on one example of the component state update. Any change to the component state could be stored in App state, rather then component state.
This is again due to lack of time.  

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can find more information on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

## TDD included

I am using Jest & Enzyme for writing tests. Unfortunately not all components are covered with tests. This is due to lack of time.
I have focused on testing the most important part of the project which is the widget form for donations.

## TODO

* I would like to cover all components with Unit Testing in the nearest future.
* Add all form change and state updates to Redux store, rather than just one method.
* Make the page responsive to different screen sizes.