import React, { useEffect, useState } from "react";
import "./Home.css";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [shippingOpen, setShippingOpen] = useState(false);

  const [name, setName] = useState("");

  const [country, setCountry] = useState([]);
  const [countryValue, setCountryValue] = useState("");
  const [countryOpen, setCountryOpen] = useState(false);
  const [c_inputValue, setC_inputValue] = useState("");

  const [s_country, setS_Country] = useState([]);
  const [s_countryValue, setS_CountryValue] = useState("");
  const [s_countryOpen, setS_CountryOpen] = useState(false);
  const [s_inputValue, setS_inputValue] = useState("");

  console.log(s_inputValue);

  const [division, setDivision] = useState([]);
  const [divisionValue, setDivisionValue] = useState("");

  const [district, setDistrict] = useState([]);
  const [districtValue, setDistrictValue] = useState("");

  const [city, setCity] = useState([]);
  const [cityValue, setCityValue] = useState("");

  const [union, setUnion] = useState([]);
  const [unionValue, setUnionValue] = useState("");

  const [zip, setZip] = useState("");
  const [street, setStreet] = useState("");
  const [house, setHouse] = useState("");
  const [number, setNumber] = useState("");
  const [fax, setFax] = useState("");

  const data = {
    name,
    c_inputValue,
    divisionValue,
    districtValue,
    cityValue,
    unionValue,
    zip,
    street,
    house,
    number,
    fax,
  };

  useEffect(() => {
    setLoading(true);

    fetch(`https://restcountries.com/v3.1/name/${countryValue}`)
      .then((res) => res.json())
      .then((data) => {
        setCountry(data);
        setLoading(false);
        if (data?.message) {
          setCountry([]);
        }
      });
  }, [countryValue]);

  useEffect(() => {
    setLoading(true);

    fetch(`https://restcountries.com/v3.1/name/${s_countryValue}`)
      .then((res) => res.json())
      .then((data) => {
        setS_Country(data);
        setLoading(false);
        if (data.message) {
          setS_Country([]);
        }
      });
  }, [s_countryValue]);

  useEffect(() => {
    fetch("https://bdapis.com/api/v1.1/divisions")
      .then((res) => res.json())
      .then((data) => setDivision(data));
  }, []);

  useEffect(() => {
    fetch(`https://bdapis.com/api/v1.1/division/${divisionValue}`)
      .then((res) => res.json())
      .then((data) => setDistrict(data.data));
  }, [divisionValue]);

  useEffect(() => {
    fetch("https://barikoi.xyz/v1/api/NDQ4NDowSzVYMUVJOFpE/sub_districts")
      .then((response) => response.json())
      .then((data) => {
        if (districtValue === "Chattogram") {
          const city = data?.places.filter((b) => b.district === "Chittagong");
          setCity(city);
          return;
        }
        const city = data?.places.filter((b) => b.district === districtValue);

        setCity(city);
      });
  }, [districtValue]);

  useEffect(() => {
    fetch("https://barikoi.xyz/v1/api/NDQ4NDowSzVYMUVJOFpE/unions")
      .then((res) => res.json())
      .then((data) => {
        const union = data?.places?.filter(
          (sd) => sd.sub_district === cityValue
        );
        setUnion(union);
      });
  }, [cityValue]);

  return (
    <div className="max_width form_container">
      <div>
        <h3>BILLING ADDRESS</h3>
        <form>
          <div className="input_content">
            <p>Enter Name</p>
            <input
              type="text"
              onBlur={(e) => setName(e.target.value)}
              placeholder="Enter personal name"
            />
          </div>

          <div className="input_content">
            <label>Country</label> <br />
            <input
              onChange={(e) => {
                setCountryOpen(true);
                setCountryValue(e.target.value);
                setC_inputValue(e.target.value);
              }}
              value={c_inputValue}
              type="text"
              placeholder={"Enter personal name"}
            />
            <ul className={!countryOpen && "hidden"}>
              <li className="loading">
                {loading ? "Loading..." : "Please search & select"}
              </li>
              {country?.map((c, i) => (
                <li
                  onClick={(e) => {
                    setCountryOpen(false);
                    setC_inputValue(e.target.innerText);
                  }}
                >
                  {c?.name?.common}
                </li>
              ))}
            </ul>
          </div>

          {/* <div className="input_content">
            <label>Division/ Province State</label> <br />
            <input
              onChange={(e) => {
                setDivisionOpen(true);
                setDivisionValue(e.target.value);
                setC_inputValue(e.target.value);
              }}
              value={c_inputValue}
              type="text"
              placeholder={"Enter personal name"}
            />
            <ul className={!divisionOpen && "hidden"}>
              <li className="loading">
                {loading ? "Loading..." : "Please search & select"}
              </li>

              {countryValue === "Bangladesh" &&
                division?.map((d, i) => (
                  <li
                    onClick={(d) => {
                      setDivisionOpen(false);
                      setD_inputValue(d.target.innerText);
                    }}
                  >
                    {d.division}
                  </li>
                ))}
            </ul>
          </div> */}

          <div className="input_content">
            <label>Division/ Province State</label> <br />
            <select
              name=""
              id=""
              onChange={(e) => setDivisionValue(e.target.value)}
            >
              <option value="">Please Search</option>
              {c_inputValue === "Bangladesh" &&
                division?.data?.map((d, i) => (
                  <option key={i} value={d.division}>
                    {d.division}
                  </option>
                ))}
            </select>
          </div>

          <div className="input_content">
            <label>District</label> <br />
            <select
              name=""
              id=""
              onChange={(e) => setDistrictValue(e.target.value)}
            >
              <option value="">Please Search</option>
              {c_inputValue === "Bangladesh" &&
                district?.map((name, i) => (
                  <option key={i} value={name.district}>
                    {name.district}
                  </option>
                ))}
            </select>
          </div>

          <div className="input_content">
            <label>City/ Sub District/ Thana</label> <br />
            <select
              name=""
              id=""
              onChange={(e) => setCityValue(e.target.value)}
            >
              <option value="">Please Search</option>
              {c_inputValue === "Bangladesh" &&
                city?.map((d, i) => (
                  <option key={i} value={d.name}>
                    {d.name}
                  </option>
                ))}
            </select>
          </div>

          <div className="input_content">
            <label>Union/ Area / Town</label> <br />
            <select
              name=""
              id=""
              onChange={(e) => setUnionValue(e.target.value)}
            >
              <option value="">Please Search</option>
              {c_inputValue === "Bangladesh" &&
                union?.map((d, i) => (
                  <option key={i} value={d.name}>
                    {d.name}
                  </option>
                ))}
            </select>
          </div>

          <div className="input_content">
            <label>Zip code</label> <br />
            <input
              type="number"
              onBlur={(e) => setZip(e.target.value)}
              placeholder="Enter your zip code"
            />
          </div>
          <div className="input_content">
            <label>Street Address/ Village</label> <br />
            <input
              type="text"
              onChange={(e) => setStreet(e.target.value)}
              placeholder="Enter street/village address"
            />
          </div>
          <div className="input_content">
            <p>House/ Suite/ Apartment no</p>
            <input
              type="text"
              onBlur={(e) => setHouse(e.target.value)}
              placeholder="Enter house name"
            />
          </div>
          <div className="input_content">
            <p>Phone</p>
            <input
              type="number"
              onBlur={(e) => setNumber(e.target.value)}
              placeholder="Enter Phone"
            />
          </div>
          <div className="input_content">
            <p>Fax</p>
            <input
              type="text"
              onBlur={(e) => setFax(e.target.value)}
              placeholder="Enter personal name"
            />
          </div>
        </form>
      </div>
      <div>
        <div className="shipping_container">
          <h3> SHIPPING ADDRESS</h3>
          <p onClick={() => setShippingOpen(true)} className="link">
            Copy from billing address
          </p>
        </div>
        <form action="">
          <div className="input_content">
            <p>Enter Name</p>
            <input
              type="text"
              placeholder="Enter personal name"
              defaultValue={shippingOpen ? data?.name : ''}
            />
          </div>

          <div className="input_content">
            <label>Country</label> <br />
            <input
              onChange={(e) => {
                setS_CountryOpen(true);
                setS_CountryValue(e.target.value);
                setS_inputValue(e.target.value);
              }}
              value={shippingOpen ? data.c_inputValue : s_inputValue}
              // value={shippingOpen && data.name}
              type="text"
              placeholder={"Enter personal name"}
            />
            <ul className={!s_countryOpen && "hidden"}>
              <li className="loading">
                {loading ? "Loading..." : "Please search & select"}
              </li>
              {s_country?.map((c, i) => (
                <li
                  key={i}
                  onClick={(e) => {
                    setS_CountryOpen(false);
                    setS_inputValue(e.target.innerText);
                  }}
                >
                  {c.name.common}
                </li>
              ))}
            </ul>
          </div>

          <div className="input_content">
            <label>Division/ Province State</label> <br />
            <select
              name=""
              id=""
              onChange={(e) => setDivisionValue(e.target.value)}
            >
              <option value="">{shippingOpen ? data.divisionValue : "Please Search"}</option>
              {s_inputValue === "Bangladesh" &&
                division?.data?.map((d, i) => (
                  // value={shippingOpen ? data.c_inputValue:  s_inputValue}

                  <option
                    key={i}
                    value={d.division}
                  >
                    {d.division}
                  </option>
                ))}
            </select>
          </div>

          <div className="input_content">
            <label>District</label> <br />
            <select
              name=""
              id=""
              onChange={(e) => setDistrictValue(e.target.value)}
            >
              <option value="">{shippingOpen ? data.districtValue : "Please Search"}</option>
              {s_inputValue === "Bangladesh" &&
                district?.map((name, i) => (
                  <option
                    key={i}
                    value={shippingOpen ? data.districtValue : name.district}
                  >
                    {name.district}
                  </option>
                ))}
            </select>
          </div>

          <div className="input_content">
            <label>City/ Sub District/ Thana</label> <br />
            <select
              name=""
              id=""
              onChange={(e) => setCityValue(e.target.value)}
            >
              <option value="">{shippingOpen ? data.cityValue : "Please Search"}</option>
              {s_inputValue === "Bangladesh" &&
                city?.map((d, i) => (
                  <option key={i} value={shippingOpen ? data.cityValue : d.name}>
                    {d.name}
                  </option>
                ))}
            </select>
          </div>

          <div className="input_content">
            <label>Union/ Area / Town</label> <br />
            <select
              name=""
              id=""
              onChange={(e) => setUnionValue(e.target.value)}
            >
              <option value="">{shippingOpen ? data.unionValue : "Please Search"}</option>
              {s_inputValue === "Bangladesh" &&
                union?.map((d, i) => (
                  <option key={i} value={d.name}>
                    {d.name}
                  </option>
                ))}
            </select>
          </div>

          <div className="input_content">
            <label>Zip code</label> <br />
            <input type="number"
              value={shippingOpen && data.zip}
              placeholder="Enter your zip code" />
          </div>
          <div className="input_content">
            <label>Street Address/ Village</label> <br />
            <input type="text"
              defaultValue={shippingOpen ? data?.street : ''}
              placeholder="Enter street/village address" />
          </div>
          <div className="input_content">
            <p>House/ Suite/ Apartment no</p>
            <input type="text"
              defaultValue={shippingOpen ? data?.house : ''}
              placeholder="Enter house name" />
          </div>
          <div className="input_content">
            <p>Phone</p>
            <input type="number"
              defaultValue={shippingOpen ? data?.number : ''}
              placeholder="Enter Phone" />
          </div>
          <div className="input_content">
            <p>Fax</p>
            <input type="text"
              defaultValue={shippingOpen ? data?.fax : ''}
              placeholder="Enter personal name" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Home;
