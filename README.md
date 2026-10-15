# 🌤️ Weather App — Real-time Weather Forecast

A sleek, responsive, and lightweight web application built with **React.js** and the **OpenWeatherMap API**. It allows users to search for real-time weather conditions for any city worldwide with dynamic condition icons and a smooth skeleton loading user experience.

---

## 🚀 Live Demo

👉 **[View Live Demo](https://ansalf.github.io/weather-app)**

---

## ✨ Features

* 🔍 **Global City Search:** Instantly search weather conditions for any city worldwide.
* 🌦️ **Dynamic Weather Icons:** High-resolution condition icons directly synced with OpenWeatherMap CDN.
* 🎨 **Smooth Skeleton Loader:** Interactive loading states and pulse animations for enhanced user experience.
* 🛡️ **Error Handling:** Graceful error handling for invalid or unfound city names.
* 📱 **Fully Responsive:** Clean UI optimized for mobile, tablet, and desktop viewports.

---

## 🛠️ Tech Stack

* **Frontend:** React.js, JavaScript (ES6+), HTML5, CSS3
* **API:** OpenWeatherMap API (Current Weather Data)
* **Build Tool:** Create React App
* **Deployment:** GitHub Pages

---

## 📦 Getting Started & Available Scripts

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). 

In your project directory, you can run:

### `git clone https://github.com/ansalf/weather-app.git`
Clones the repository to your local machine.

### `npm install`
Installs all required project dependencies.

### `npm start`
Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser. The page will reload when you make changes.

### `npm test`
Launches the test runner in the interactive watch mode.

### `npm run build`
Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm run deploy`
Automatically builds and deploys the project to **GitHub Pages**.

---

## 🌐 API Reference

This app fetches current weather data from [OpenWeatherMap API](https://openweathermap.org/api):

```http
GET [https://api.openweathermap.org/data/2.5/weather?q=](https://api.openweathermap.org/data/2.5/weather?q=){city name}&appid={API key}&units=metric