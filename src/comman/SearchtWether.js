import React, { useEffect, useState } from "react";
import axios from "axios";

const CurrentWether = () => {
  const [cityname, setCityName] = useState("");
  const now = new Date();
  const [data, setData] = useState({
    request: {
      type: "City",
      query: "Mumbai, India",
      language: "en",
      unit: "m",
    },
    location: {
      name: "Mumbai",
      country: "India",
      region: "Maharashtra",
      lat: "18.975",
      lon: "72.826",
      timezone_id: "Asia/Kolkata",
      localtime: "2022-10-20 17:05",
      localtime_epoch: 1666285500,
      utc_offset: "5.50",
    },
    current: {
      observation_time: "11:35 AM",
      temperature: 31,
      weather_code: 143,
      weather_icons: [
        "https://cdn.worldweatheronline.com/images/wsymbols01_png_64/wsymbol_0006_mist.png",
      ],
      weather_descriptions: ["Haze"],
      wind_speed: 17,
      wind_degree: 280,
      wind_dir: "W",
      pressure: 1008,
      precip: 0,
      humidity: 75,
      cloudcover: 50,
      feelslike: 37,
      uv_index: 7,
      visibility: 4,
      is_day: "yes",
    },
  });

  const handlesearch = async () => {
    if (cityname !== undefined || null) {
      const url = `http://api.weatherstack.com/current?access_key=810e7fc9e04524fbed8e9455eccdb33f&query=${cityname}`;
      const response = await axios.get(url);
      console.log(response.data);
      setData(response.data);
    }
  };
  return (
    <div>
      <div className="row height d-flex justify-content-center align-items-center">
        <div className="col-md-8 m-2">
          <div className="search d-flex">
            <input
              type="text"
              className="form-control"
              placeholder="location"
              onChange={(e) => {
                setCityName(e.target.value);
              }}
            />
            <button className="btn btn-primary m-1" onClick={handlesearch}>
              check
            </button>
          </div>
        </div>
        <div className="col-md-8 m-1">
          {data && (
            <div
              className="main_container"
              style={{
                backgroundColor: "#150050",
                color: "white",
                margin: "auto",
              }}
            >
              <div className="m-1">
                <h5 className="large_text">{now.toDateString()}</h5>
                <h5 className="large_text">{now.toLocaleTimeString()}</h5>
                <p>{data.location.name}</p>
                <p>
                  {data.location.region},{data.location.country}
                </p>
              </div>
              <div className="d-flex m-1">
                <h1 className="temp">{data.current.temperature}°C</h1>
                <img
                  src={data.current.weather_icons}
                  width="20px"
                  height="20px"
                  alt="icon"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CurrentWether;
