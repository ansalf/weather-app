import React from "react";

export const WeatherIcons = {
  Sun: () => (
    <svg width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="weather-icon-sun">
      <circle cx="12" cy="12" r="5" fill="#FFC837" stroke="#F59E0B" />
      <line x1="12" y1="1" x2="12" y2="3" stroke="#F59E0B" strokeWidth="2.5" />
      <line x1="12" y1="21" x2="12" y2="23" stroke="#F59E0B" strokeWidth="2.5" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="#F59E0B" strokeWidth="2.5" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="#F59E0B" strokeWidth="2.5" />
      <line x1="1" y1="12" x2="3" y2="12" stroke="#F59E0B" strokeWidth="2.5" />
      <line x1="21" y1="12" x2="23" y2="12" stroke="#F59E0B" strokeWidth="2.5" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="#F59E0B" strokeWidth="2.5" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="#F59E0B" strokeWidth="2.5" />
    </svg>
  ),
  PartlyCloudy: () => (
    <svg width="54" height="54" viewBox="0 0 64 64" fill="none">
      <circle cx="24" cy="24" r="14" fill="url(#sunGrad)" />
      <path d="M48 48H22C16.4772 48 12 43.5228 12 38C12 32.7482 16.0592 28.4444 21.206 28.0384C22.6517 21.7259 28.2863 17 35 17C42.8465 17 49.336 22.868 50.3159 30.505C54.6738 31.7582 58 35.7925 58 40.5C58 44.6421 53.5228 48 48 48Z" fill="url(#cloudGrad)" filter="drop-shadow(0 6px 8px rgba(0,0,0,0.25))" />
      <defs>
        <radialGradient id="sunGrad" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(20 20) rotate(45) scale(20)">
          <stop stopColor="#FFF59D" />
          <stop offset="1" stopColor="#F59E0B" />
        </radialGradient>
        <linearGradient id="cloudGrad" x1="12" y1="17" x2="58" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFFFF" />
          <stop offset="0.75" stopColor="#F8FAFC" />
          <stop offset="1" stopColor="#CBD5E1" />
        </linearGradient>
      </defs>
    </svg>
  ),
  Rain: () => (
    <svg width="48" height="48" viewBox="0 0 64 64" fill="none">
      <path d="M48 40H22C16.4772 40 12 35.5228 12 30C12 24.7482 16.0592 20.4444 21.206 20.0384C22.6517 13.7259 28.2863 9 35 9C42.8465 9 49.336 14.868 50.3159 22.505C54.6738 23.7582 58 27.7925 58 32.5C58 36.6421 53.5228 40 48 40Z" fill="url(#rainCloudGrad)" filter="drop-shadow(0 6px 8px rgba(0,0,0,0.25))" />
      <line x1="22" y1="44" x2="19" y2="54" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" />
      <line x1="32" y1="44" x2="29" y2="56" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" />
      <line x1="42" y1="44" x2="39" y2="54" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" />
      <defs>
        <linearGradient id="rainCloudGrad" x1="12" y1="9" x2="58" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#94A3B8" />
        </linearGradient>
      </defs>
    </svg>
  ),
  Cloudy: () => (
    <svg width="48" height="48" viewBox="0 0 64 64" fill="none">
      <path d="M48 44H22C16.4772 44 12 39.5228 12 34C12 28.7482 16.0592 24.4444 21.206 24.0384C22.6517 17.7259 28.2863 13 35 13C42.8465 13 49.336 18.868 50.3159 26.505C54.6738 27.7582 58 31.7925 58 36.5C58 40.6421 53.5228 44 48 44Z" fill="url(#greyCloudGrad)" filter="drop-shadow(0 6px 8px rgba(0,0,0,0.25))" />
      <defs>
        <linearGradient id="greyCloudGrad" x1="12" y1="13" x2="58" y2="44" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFFFF" />
          <stop offset="0.8" stopColor="#E2E8F0" />
          <stop offset="1" stopColor="#94A3B8" />
        </linearGradient>
      </defs>
    </svg>
  ),
  Wind: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2" />
    </svg>
  ),
  Visibility: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  AirQuality: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3a9 9 0 0 0 0 18v-9a4.5 4.5 0 0 0 0-9Z" fill="currentColor" fillOpacity="0.4" />
    </svg>
  ),
  Humidity: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
    </svg>
  ),
  Navigation: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="3 11 22 2 13 21 11 13 3 11" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
    </svg>
  ),
  Search: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  ),
  Moon: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="#F1F5F9" stroke="none">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  ),
  SunSmall: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="#F59E0B" stroke="#F59E0B" strokeWidth="1">
      <circle cx="12" cy="12" r="7" fill="#FBBF24" />
    </svg>
  ),
  Sparkle: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" />
    </svg>
  ),
  Sunrise: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v6m0 0l-3-3m3 3l3-3" />
      <path d="M4 18h16M2 22h20" />
      <circle cx="12" cy="18" r="4" fill="#FBBF24" stroke="#F59E0B" />
    </svg>
  ),
  Sunset: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 8v6m0 0l-3-3m3 3l3-3" />
      <path d="M4 18h16M2 22h20" />
      <circle cx="12" cy="18" r="4" fill="#F97316" stroke="#EA580C" />
    </svg>
  ),
  Compass: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill="currentColor" fillOpacity="0.4" />
    </svg>
  ),
  Thermometer: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" />
    </svg>
  )
};
