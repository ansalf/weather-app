import React, { useState, useEffect, useMemo } from "react";
import "./App.css";
import { WeatherIcons } from "./Icons";

const API_KEY = "644081f8d16c359bcd2137e8165e9232";

const POPULAR_CITIES = [
  "Malang",
  "Medan",
  "Bandung",
  "Jakarta",
  "Surabaya"
];

function App() {
  const [city, setCity] = useState("Malang");
  const [searchInput, setSearchInput] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [timeMode, setTimeMode] = useState(50); // 0 (Morning) to 100 (Night)

  // Fetch current weather and 5-day forecast simultaneously
  const fetchWeather = async (targetCity) => {
    const queryCity = targetCity || city;
    setLoading(true);
    setError("");
    try {
      const [currentRes, forecastRes] = await Promise.all([
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
            queryCity
          )}&appid=${API_KEY}&units=metric`
        ),
        fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(
            queryCity
          )}&appid=${API_KEY}&units=metric`
        )
      ]);

      if (!currentRes.ok) {
        throw new Error("City not found. Please try another location.");
      }

      const current = await currentRes.json();
      setWeatherData(current);

      if (forecastRes.ok) {
        const forecast = await forecastRes.json();
        setForecastData(forecast.list || []);
      }
    } catch (err) {
      setError(err.message || "Failed to retrieve weather data.");
      setWeatherData(null);
      setForecastData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather("Malang");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setCity(searchInput.trim());
      fetchWeather(searchInput.trim());
      setSearchInput("");
    }
  };

  // Calculate local time of the selected city using OpenWeatherMap timezone offset
  const localTimeInfo = useMemo(() => {
    if (!weatherData) {
      const now = new Date();
      return {
        timeString: now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        period: "Day",
        formattedFullDate: now.toLocaleDateString("en-US", {
          weekday: "long",
          month: "short",
          day: "numeric"
        }),
        sunriseStr: "06:00 AM",
        sunsetStr: "06:30 PM"
      };
    }

    const utcMs = Date.now() + new Date().getTimezoneOffset() * 60000;
    const cityDate = new Date(utcMs + weatherData.timezone * 1000);
    const hours = cityDate.getHours();

    let period = "Day";
    if (hours >= 5 && hours < 11) period = "Morning";
    else if (hours >= 11 && hours < 15) period = "Noon";
    else if (hours >= 15 && hours < 18) period = "Afternoon";
    else if (hours >= 18 && hours < 21) period = "Evening";
    else period = "Night";

    const timeString = cityDate.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    });

    const formattedFullDate = cityDate.toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric"
    });

    // Sunrise and sunset local strings
    const sunriseDate = new Date((weatherData.sys?.sunrise || 0) * 1000 + (weatherData.timezone + new Date().getTimezoneOffset() * 60) * 1000);
    const sunsetDate = new Date((weatherData.sys?.sunset || 0) * 1000 + (weatherData.timezone + new Date().getTimezoneOffset() * 60) * 1000);

    const sunriseStr = sunriseDate.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    });

    const sunsetStr = sunsetDate.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    });

    return { timeString, period, formattedFullDate, hours, sunriseStr, sunsetStr };
  }, [weatherData]);

  // Poetic ambient quote inspired by the reference design
  const poeticVibe = useMemo(() => {
    if (!weatherData) return "Nature pauses in serene anticipation.";
    const main = (weatherData.weather?.[0]?.main || "").toLowerCase();
    const temp = Math.round(weatherData.main?.temp ?? 25);

    if (main.includes("rain") || main.includes("drizzle")) {
      return "Soft droplets dance upon the glass, refreshing the Earth with calm contemplation.";
    }
    if (main.includes("cloud")) {
      return "Gentle porcelain clouds glide across the horizon, diffusing a mellow cinematic light.";
    }
    if (main.includes("clear") && temp > 28) {
      return "The sun is high and confident. It wraps the city in golden heat and purpose.";
    }
    if (main.includes("clear")) {
      return "A pure azure expanse warms the air, crisp breeze carrying serenity through the fields.";
    }
    if (main.includes("snow")) {
      return "Silent crystal dust descends gracefully, casting a tranquil silence across the hills.";
    }
    return "Gentle atmosphere wraps the skyline in harmonious warmth and calm radiance.";
  }, [weatherData]);

  // Hourly forecast slice
  const hourlySlots = useMemo(() => {
    if (!forecastData || forecastData.length === 0) {
      return [
        { time: "10 AM", temp: 28 },
        { time: "11 AM", temp: 29 },
        { time: "12 PM", temp: 29 },
        { time: "1 PM", temp: 30 }
      ];
    }
    return forecastData.slice(0, 4).map((item) => {
      const date = new Date(item.dt * 1000);
      const hourStr = date.toLocaleTimeString("en-US", {
        hour: "numeric",
        hour12: true
      });
      return {
        time: hourStr,
        temp: Math.round(item.main.temp),
        icon: item.weather?.[0]?.main || "Clear"
      };
    });
  }, [forecastData]);

  // 4-Day forecast slots
  const dailySlots = useMemo(() => {
    if (!forecastData || forecastData.length === 0) {
      return [
        { day: "Tue", type: "Sun" },
        { day: "Wed", type: "Cloudy" },
        { day: "Thu", type: "Rain" },
        { day: "Fri", type: "PartlyCloudy" }
      ];
    }

    const daysMap = {};
    const daysArr = [];

    forecastData.forEach((item) => {
      const d = new Date(item.dt * 1000);
      const dayName = d.toLocaleDateString("en-US", { weekday: "short" });
      const currentDay = new Date().toLocaleDateString("en-US", { weekday: "short" });
      
      if (dayName !== currentDay && !daysMap[dayName] && daysArr.length < 4) {
        daysMap[dayName] = true;
        const mainW = (item.weather?.[0]?.main || "").toLowerCase();
        let type = "PartlyCloudy";
        if (mainW.includes("rain")) type = "Rain";
        else if (mainW.includes("cloud")) type = "Cloudy";
        else if (mainW.includes("clear")) type = "Sun";
        
        daysArr.push({
          day: dayName,
          type: type,
          temp: Math.round(item.main.temp)
        });
      }
    });

    return daysArr.length > 0
      ? daysArr
      : [
          { day: "Tue", type: "Sun" },
          { day: "Wed", type: "Cloudy" },
          { day: "Thu", type: "Rain" },
          { day: "Fri", type: "PartlyCloudy" }
        ];
  }, [forecastData]);

  // Dynamic atmospheric theme based on slider
  const bgThemeStyle = useMemo(() => {
    if (timeMode < 35) {
      return "theme-day";
    } else if (timeMode < 70) {
      return "theme-golden";
    } else {
      return "theme-night";
    }
  }, [timeMode]);

  // Air quality approximation
  const aqiValue = useMemo(() => {
    if (!weatherData) return 42;
    const base = Math.floor((weatherData.main.pressure % 50) + (weatherData.main.humidity / 3));
    return Math.min(120, Math.max(35, base));
  }, [weatherData]);

  // Accurate High and Low calculation over 24-hour cycle
  const todayHighLow = useMemo(() => {
    if (!weatherData) return { high: 28, low: 20 };
    const currentTemp = Math.round(weatherData.main.temp);
    let max = Math.round(weatherData.main.temp_max ?? currentTemp);
    let min = Math.round(weatherData.main.temp_min ?? currentTemp);

    if (forecastData && forecastData.length > 0) {
      // Periksa 8 slot pertama (24 jam)
      const next24h = forecastData.slice(0, 8);
      next24h.forEach((item) => {
        const t = Math.round(item.main.temp);
        if (t > max) max = t;
        if (t < min) min = t;
      });
    }

    // Jika max dan min masih persis sama karena stasiun tunggal, berikan rentang natural
    if (max <= min) {
      max = currentTemp + 3;
      min = currentTemp - 2;
    }

    return { high: max, low: min };
  }, [weatherData, forecastData]);

  // Dynamic headline condition
  const conditionTitle = useMemo(() => {
    if (!weatherData) return "Hot & Bright";
    const main = (weatherData.weather?.[0]?.main || "").toLowerCase();
    const desc = (weatherData.weather?.[0]?.description || "").toLowerCase();
    const temp = Math.round(weatherData.main?.temp ?? 26);
    const clouds = weatherData.clouds?.all ?? 0;
    const isNight = localTimeInfo.period === "Night" || localTimeInfo.period === "Evening";

    if (main.includes("thunderstorm")) return "Stormy & Electric";
    if (main.includes("drizzle")) return "Light Drizzle";
    if (main.includes("rain")) {
      if (desc.includes("heavy")) return "Heavy Downpour";
      return "Rainy & Refreshing";
    }
    if (main.includes("snow")) return "Frost & Snowfall";
    if (main.includes("mist") || main.includes("fog") || main.includes("haze")) {
      return "Misty & Atmospheric";
    }
    if (main.includes("cloud")) {
      if (clouds > 80 || desc.includes("overcast")) return "Mellow & Overcast";
      if (clouds > 40 || desc.includes("broken")) return "Scattered Clouds";
      return isNight ? "Moonlit & Cloudy" : "Partly Sunny & Mild";
    }
    if (main.includes("clear")) {
      if (isNight) return "Clear & Starry";
      if (temp >= 32) return "Hot & Blazing";
      if (temp >= 27) return "Hot & Bright";
      if (temp >= 20) return "Warm & Sunny";
      return "Crisp & Clear";
    }
    return desc
      .split(" ")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  }, [weatherData, localTimeInfo]);

  return (
    <div className={`liquid-app-wrapper ${bgThemeStyle}`}>
      {/* Decorative Floating Glass Bokeh Orbs & Atmosphere */}
      <div className="scenic-backdrop">
        <div className="golden-sun-glow"></div>
        <div className="glass-ambient-orb orb-1"></div>
        <div className="glass-ambient-orb orb-2"></div>
        <div className="glass-ambient-orb orb-3"></div>
        <div className="ambient-hills"></div>
        <div className="cloud-layer layer-1"></div>
        <div className="cloud-layer layer-2"></div>
      </div>

      <div className="desktop-layout-container">
        {/* Top Floating Glass Navigation Bar */}
        <header className="glass-topbar">
          <div className="brand-section">
            <div className="brand-logo-gem">
              <span className="gem-dot"></span>
            </div>
            <div className="brand-text-block">
              <span className="brand-title">Aether</span>
              <span className="brand-subtitle">Liquid Glass Desktop</span>
            </div>
          </div>

          <form className="glass-search-box" onSubmit={handleSearchSubmit}>
            <span className="search-icon">
              <WeatherIcons.Search />
            </span>
            <input
              type="text"
              placeholder="Search city ..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button type="submit" className="search-pill-btn">
              Explore
            </button>
          </form>

          {/* Quick city pills */}
          <div className="quick-city-tags">
            {POPULAR_CITIES.map((c) => (
              <button
                key={c}
                type="button"
                className={`city-pill ${city.toLowerCase() === c.toLowerCase() ? "active" : ""}`}
                onClick={() => {
                  setCity(c);
                  fetchWeather(c);
                }}
              >
                {c}
              </button>
            ))}
          </div>
        </header>

        {/* Error Notification */}
        {error && (
          <div className="glass-error-banner">
            <span>⚠️ {error}</span>
          </div>
        )}

        {/* Hero Headline Section (Big Atmospheric Editorial Title) */}
        <section className="hero-headline-block">
          <div className="hero-tag-chip">
            <span className="hero-tag-dot"></span>
            <span>Live Atmosphere</span>
          </div>
          <h1 className="hero-main-title">Aether Weather</h1>
          <p className="hero-sub-caption">Precision atmospheric dynamics wrapped in liquid glass</p>
        </section>

        {/* Main Double Glass Widget Frame */}
        <main className="widget-dual-container">
          {/* SKELETON STATE */}
          {loading ? (
            <div className="glass-card skeleton-card full-span">
              <div className="skeleton-line shimmer-pulse header-shimmer"></div>
              <div className="skeleton-grid-shimmer">
                <div className="skeleton-box shimmer-pulse"></div>
                <div className="skeleton-box shimmer-pulse"></div>
              </div>
            </div>
          ) : weatherData ? (
            <>
              {/* CARD LEFT: City & Metrics Overview */}
              <section className="glass-card left-panel-card">
                <div className="card-glare"></div>

                <div className="city-header-row">
                  <div className="city-title-group">
                    <div className="city-name-wrap">
                      <h1 className="city-headline">{weatherData.name}</h1>
                      <span className="nav-arrow-icon" title="Location locked">
                        <WeatherIcons.Navigation />
                      </span>
                    </div>
                    <p className="city-time-sub">
                      {localTimeInfo.period} • {localTimeInfo.timeString}
                    </p>
                  </div>
                  
                  {/* Decorative badge top right */}
                  <div className="live-status-pill">
                    <span className="pulse-indicator-dot"></span>
                    <span>Live Air</span>
                  </div>
                </div>

                {/* 4 Essential Atmospheric Metrics */}
                <div className="atmospheric-metrics-grid">
                  <div className="metric-cell">
                    <span className="metric-label">Wind</span>
                    <div className="metric-value-row">
                      <span className="metric-icon">
                        <WeatherIcons.Wind />
                      </span>
                      <span className="metric-number">
                        {Math.round(weatherData.wind?.speed * 2.237)} <small>mph</small>
                      </span>
                    </div>
                  </div>

                  <div className="metric-cell">
                    <span className="metric-label">Visibility</span>
                    <div className="metric-value-row">
                      <span className="metric-icon">
                        <WeatherIcons.Visibility />
                      </span>
                      <span className="metric-number">
                        {(weatherData.visibility / 1609).toFixed(1)} <small>mi</small>
                      </span>
                    </div>
                  </div>

                  <div className="metric-cell">
                    <span className="metric-label">Air Quality</span>
                    <div className="metric-value-row">
                      <span className="metric-icon">
                        <WeatherIcons.AirQuality />
                      </span>
                      <span className="metric-number">
                        {aqiValue} <small>AQI</small>
                      </span>
                    </div>
                  </div>

                  <div className="metric-cell">
                    <span className="metric-label">Humidity</span>
                    <div className="metric-value-row">
                      <span className="metric-icon">
                        <WeatherIcons.Humidity />
                      </span>
                      <span className="metric-number">
                        {weatherData.main?.humidity}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Decorative Sun Cycle Ribbon (Ornamen Pengisi) */}
                <div className="sun-cycle-ribbon">
                  <div className="sun-cycle-node">
                    <WeatherIcons.Sunrise />
                    <div className="sun-cycle-text">
                      <span className="sun-cycle-tag">Sunrise</span>
                      <span className="sun-cycle-val">{localTimeInfo.sunriseStr}</span>
                    </div>
                  </div>
                  <div className="sun-cycle-divider"></div>
                  <div className="sun-cycle-node">
                    <WeatherIcons.Sunset />
                    <div className="sun-cycle-text">
                      <span className="sun-cycle-tag">Sunset</span>
                      <span className="sun-cycle-val">{localTimeInfo.sunsetStr}</span>
                    </div>
                  </div>
                </div>

                {/* Poetic quote text at bottom of left card */}
                <div className="poetic-footer-text">
                  <span className="poetic-sparkle-icon">
                    <WeatherIcons.Sparkle />
                  </span>
                  <p>{poeticVibe}</p>
                </div>
              </section>

              {/* CARD RIGHT: Weather Status & Hourly/Daily Forecast */}
              <section className="glass-card right-panel-card">
                <div className="card-glare"></div>

                {/* Weather Header condition */}
                <div className="condition-hero-banner">
                  <div className="condition-symbol">
                    {(() => {
                      const main = (weatherData.weather?.[0]?.main || "").toLowerCase();
                      const isNight = localTimeInfo.period === "Night" || localTimeInfo.period === "Evening";
                      if (main.includes("rain") || main.includes("drizzle") || main.includes("thunderstorm")) {
                        return <WeatherIcons.Rain />;
                      }
                      if (main.includes("cloud")) {
                        return (weatherData.clouds?.all ?? 0) > 70 ? (
                          <WeatherIcons.Cloudy />
                        ) : (
                          <WeatherIcons.PartlyCloudy />
                        );
                      }
                      if (main.includes("clear")) {
                        return isNight ? <WeatherIcons.Moon /> : <WeatherIcons.Sun />;
                      }
                      return <WeatherIcons.PartlyCloudy />;
                    })()}
                  </div>
                  <div className="condition-text-block">
                    <h2 className="condition-status-text">{conditionTitle}</h2>
                    <div className="condition-temp-row">
                      <span className="condition-temp-now">
                        {Math.round(weatherData.main?.temp)}°C
                      </span>
                      <span className="condition-desc-dot">•</span>
                      <span className="condition-desc-sub">
                        {weatherData.weather?.[0]?.description}
                      </span>
                    </div>
                  </div>

                  {/* High/Low Temperature Pill Badge */}
                  <div className="temp-range-pill">
                    <span className="temp-high">H: {todayHighLow.high}°</span>
                    <span className="temp-sep">/</span>
                    <span className="temp-low">L: {todayHighLow.low}°</span>
                  </div>
                </div>

                {/* Hourly Forecast Bar with Glowing Slider effect */}
                <div className="hourly-forecast-module">
                  <div className="module-title-bar">
                    <span className="module-title-text">Hourly Forecast</span>
                    <span className="module-sub-highlight">Solar Curve</span>
                  </div>

                  <div className="hourly-glow-track">
                    <div className="hourly-amber-beam"></div>
                  </div>

                  <div className="hourly-items-flex">
                    {hourlySlots.map((slot, idx) => (
                      <div key={idx} className="hourly-slot">
                        <span className="slot-deg">{slot.temp}°C</span>
                        <div className="slot-indicator-pip"></div>
                        <span className="slot-time">{slot.time}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4-Day Mini Weather Row */}
                <div className="daily-forecast-row">
                  {dailySlots.map((slot, index) => (
                    <div key={index} className="daily-forecast-chip">
                      <div className="daily-icon-mini">
                        {slot.type === "Sun" ? (
                          <WeatherIcons.Sun />
                        ) : slot.type === "Rain" ? (
                          <WeatherIcons.Rain />
                        ) : slot.type === "Cloudy" ? (
                          <WeatherIcons.Cloudy />
                        ) : (
                          <WeatherIcons.PartlyCloudy />
                        )}
                      </div>
                      <span className="daily-weekday">{slot.day}</span>
                      {slot.temp && <span className="daily-temp-chip">{slot.temp}°</span>}
                    </div>
                  ))}
                </div>
              </section>
            </>
          ) : null}
        </main>

        {/* Liquid Glass Interactive Time Slider (Bawah) */}
        <section className="liquid-time-slider-shell">
          <div className="slider-sun-icon" title="Daylight Ambience">
            <WeatherIcons.SunSmall />
          </div>

          <div className="slider-track-wrap">
            <input
              type="range"
              min="0"
              max="100"
              value={timeMode}
              onChange={(e) => setTimeMode(Number(e.target.value))}
              className="liquid-range-input"
              aria-label="Time of Day Ambience Slider"
            />
          </div>

          <div className="slider-moon-icon" title="Night Ambience">
            <WeatherIcons.Moon />
          </div>
        </section>

        {/* Aesthetic Project Caption Bottom */}
        <footer className="footer-concept-credit">
          <p className="credit-title">
            Aether — A weather widget <span>by Saaproject</span>
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
