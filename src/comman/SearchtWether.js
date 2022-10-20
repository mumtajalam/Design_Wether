import React, { useEffect, useState } from "react";
import axios from "axios";

const CurrentWether = () => {
  const [cityname, setCityName] = useState("");
  const now = new Date();
  const [data, setData] = useState(null);

  const handlesearch = async () => {
    if (cityname !== "") {
      const url = `http://api.weatherstack.com/current?access_key=810e7fc9e04524fbed8e9455eccdb33f&query=${cityname}`;
      const response = await axios.get(url);
      console.log(response.data);
      setData(response.data);
      setCityName("");
    } else {
      alert("Please fill correct location");
    }
  };
  return (
    <div>
      <div className="row height d-flex justify-content-center align-items-center">
        <div className="col-md-8 m-2">
          <div className="search d-flex">
            <input
              type="text"
              value={cityname}
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
