import signupback from "./../../assets/image/Group.png";
import farmer from "../../assets/image/Clippathgroup.png";
import React, { useState, useRef, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import FilledInput from "@mui/material/FilledInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import success from "./success.gif";
import "./Signup.css";
const Signup = () => {
  const [aquaAnalyticsData, setaquaAnalyticsData] = useState({});
  const accountnameref = useRef();
  const password_aqua_farming = useRef();
  const [registersuccess, setRegistersuccess] = useState(false);
  const [usertype, setusertype] = useState("");
  const [additionalinformation, setadditionalinformation] = useState(true);

  const [aquaDeviceType, setaquaDeviceType] = useState([
    { value: "", count: 1 },
  ]);
  const increment = (index) => {
    const updatedItems = [...aquaDeviceType];
    updatedItems[index].count += 1;
    setaquaDeviceType(updatedItems);
  };
  console.log(process.env.REACT_APP_AquaIP);
  
  const decrement = (index) => {
    const updatedItems = [...aquaDeviceType];
    if (updatedItems[index].count > 1) {
      updatedItems[index].count -= 1;
    }
    setaquaDeviceType(updatedItems);
  };
  const onRemove = (index) => {
    const updatedItems = aquaDeviceType.filter((_, i) => i !== index);
    setaquaDeviceType(updatedItems);
  };
  const addSelectItem = () => {
    setaquaDeviceType([...aquaDeviceType, { value: "", count: 1 }]);
  };
  const aquahandleSelectChange = (index, event) => {
    const updatedItems = [...aquaDeviceType];
    updatedItems[index].value = event.target.value;
    setaquaDeviceType(updatedItems);
  };

  const handleSelectChange = (event) => {
    setusertype(event.target.value);
  };

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  //Regex expression
  const [firstNameRef, setfirstnameref] = useState("");
  const [lastNameRef, setlastNameRef] = useState("");
  const [phoneNumberRef, setphoneNumberRef] = useState("");
  const [emailRef, emailemailRef] = useState("");
  const [adhaarNumberRef, setadhaarNumberRef] = useState("");
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhoneNumber = (phoneNumber) => {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phoneNumber);
  };
  const validateAadhaar = (adhaarNumber) => {
    const d = [
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      [1, 2, 3, 4, 0, 6, 7, 8, 9, 5],
      [2, 3, 4, 0, 1, 7, 8, 9, 5, 6],
      [3, 4, 0, 1, 2, 8, 9, 5, 6, 7],
      [4, 0, 1, 2, 3, 9, 5, 6, 7, 8],
      [5, 9, 8, 7, 6, 0, 4, 3, 2, 1],
      [6, 5, 9, 8, 7, 1, 0, 4, 3, 2],
      [7, 6, 5, 9, 8, 2, 1, 0, 4, 3],
      [8, 7, 6, 5, 9, 3, 2, 1, 0, 4],
      [9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
    ];

    const p = [
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      [1, 5, 7, 6, 2, 8, 3, 0, 9, 4],
      [5, 8, 0, 3, 7, 9, 6, 1, 4, 2],
      [8, 9, 1, 6, 0, 4, 3, 5, 2, 7],
      [9, 4, 5, 3, 1, 2, 6, 8, 7, 0],
      [4, 2, 8, 6, 5, 7, 3, 9, 0, 1],
      [2, 7, 9, 3, 8, 0, 6, 4, 1, 5],
      [7, 0, 4, 6, 9, 1, 3, 2, 5, 8],
    ];
    let c = 0;
    let invertedArray = adhaarNumber.split("").map(Number).reverse();

    for (let i = 0; i < invertedArray.length; i++) {
      c = d[c][p[i % 8][invertedArray[i]]];
    }

    return c === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = {};

    setaquaAnalyticsData({
      firstname: firstNameRef,
      lastname: lastNameRef,
      email: emailRef,
      mobno: phoneNumberRef,
      adhaar: adhaarNumberRef,
      user_cat: "analytics",
      params: {
        accountname: accountnameref.current?.value,
        devicesList: aquaDeviceType,
      },
    });

    if (!validateEmail(emailRef)) {
      formErrors.email = "Invalid email address";
    }
    if (!validatePhoneNumber(phoneNumberRef)) {
      formErrors.phoneNumber = "Invalid phone number";
    }
    if (!validateAadhaar(adhaarNumberRef)) {
      formErrors.adhaarNumber = "Invalid Aadhaar number";
    }

    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      // Form is valid, proceed with form submission
      console.log("Form submitted successfully");
      setadditionalinformation(!additionalinformation);
    }
  };

  const AquaAnalytics = async (e) => {
    e.preventDefault();
    console.log(aquaDeviceType);
    console.log(aquaAnalyticsData);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_IP}regd/`,
        aquaAnalyticsData
      );
      console.log(response);
      if (response) {
        setRegistersuccess(!registersuccess);
      }
    } catch (error) {
      throw error;
    }
  };

  const AquaFarmingFormSubmit = async (e) => {
    e.preventDefault();

    const AquafarmingData = {
      firstname: firstNameRef,
      lastname: lastNameRef,
      email: emailRef,
      adhaar: adhaarNumberRef,
      mobno: phoneNumberRef,
      user_cat: "aqua",
      // password: password_aqua_farming.current?.value,
      params: password_aqua_farming.current?.value,
    };
    try {
      // const response = await axios.post(
      //   "http://20.244.37.91:8000/regd/",
      //   AquafarmingData
      // );
      const response = await axios.post(
        `${process.env.REACT_APP_IP}regd/`,
        AquafarmingData
      );
      console.log(response);
      if (response) {
        setRegistersuccess(!registersuccess);
      }
    } catch (error) {
      throw error;
    }
  };

  // WaterBody Rejevention

  const waterBodyRejeventionSubmit = async (e) => {
    e.preventDefault();
    
    const waterBodyData = {
      firstname: firstNameRef,
      lastname: lastNameRef,
      email: emailRef,
      mobno: phoneNumberRef,
      adhaar: adhaarNumberRef,
      user_cat: "water",
      params: password_aqua_farming.current?.value,
    };
    try {
      // const response = await axios.post( 
      //   "https://loginbg.bc-pl.com/regd/",
      //   waterBodyData
      // );
      const response = await axios.post( 
        `${process.env.REACT_APP_IP}regd/`,
        waterBodyData
      );
      console.log(response);
      if (response) {
        setRegistersuccess(!registersuccess);
      }
    } catch (error) {
      console.error(error); 
    }
  };

  //api calls
  const url1 = `${process.env.REACT_APP_AquaIP}devicetype_view/`;
  // eslint-disable-next-line
  const { response: response1, error: error1 } = useFetch(url1, "GET");

  useEffect(() => { 
    setaquaAnalyticsData((prevAquadata) => ({
      ...prevAquadata,
      params: {
        accountname: accountnameref.current?.value,
        devicesList: aquaDeviceType,
      },
    }));
  }, [aquaDeviceType]);

  return (
    <>
      <div
        style={{
          background: "linear-gradient(to right, rgb(0, 101, 236), #94c1ff)",
        }}
      >
        <div
          style={{
            backgroundImage: `url(${signupback})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            height: "100vh",
          }}
        >
          {additionalinformation ? (
            <div
              style={{
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
                flexWrap: "wrap",
                padding: "8px",
              }}
            >
              <div
                style={{
                  height: "auto",
                  backgroundColor: "#E9EEF6",
                  padding: "5px",
                  zIndex: 10,
                }}
              >
                <h3 className="mb-5 mt-3 ml-3" style={{ color: "green" }}>
                  Registration
                </h3>
                <form onSubmit={handleSubmit}>
                  <div className="d-flex ml-3">
                    <div className="form-floating mb-3">
                      <input
                        value={firstNameRef}
                        type="text"
                        className="form-control"
                        id="floatingInput"
                        placeholder="FirstName"
                        required
                        onInvalid={(e) =>
                          e.target.setCustomValidity("Please Enter First Name")
                        }
                        onChange={(e) => {
                          setfirstnameref(e.target.value);
                          e.target.setCustomValidity("");
                        }}
                      />
                      <label htmlFor="floatingInput">First Name</label>
                    </div>
                    <div className="form-floating mb-3 ml-3">
                      <input
                        value={lastNameRef}
                        type="text"
                        className="form-control"
                        id="floatingInput"
                        placeholder="LastName"
                        required
                        onInvalid={(e) =>
                          e.target.setCustomValidity("Please Enter Last Name")
                        }
                        onChange={(e) => {
                          setlastNameRef(e.target.value);
                          e.target.setCustomValidity("");
                        }}
                      />
                      <label htmlFor="floatingInput">Last Name</label>
                    </div>
                  </div>
                  <div className="d-flex">
                    <div className="form-floating mb-3 ml-3">
                      <input
                        value={phoneNumberRef}
                        type="number"
                        className="form-control"
                        id="floatingPassword"
                        placeholder="Mobile Number"
                        required
                        onInvalid={(e) =>
                          e.target.setCustomValidity(
                            "Please Enter Mobile Number"
                          )
                        }
                        onChange={(e) => {
                          e.target.setCustomValidity("");
                          setphoneNumberRef(e.target.value);
                        }}
                      />
                      <label htmlFor="floatingPassword">Mobile Number</label>
                      {errors.phoneNumber && (
                        <p style={{ color: "red" }}>{errors.phoneNumber}</p>
                      )}
                    </div>
                    <div className="form-floating mb-3 ml-3">
                      <input
                        value={emailRef}
                        type="email"
                        className="form-control"
                        placeholder="Email-ID"
                        required
                        onInvalid={(e) =>
                          e.target.setCustomValidity("Please Enter Email-ID")
                        }
                        onChange={(e) => {
                          emailemailRef(e.target.value);
                          e.target.setCustomValidity("");
                        }}
                      />
                      <label htmlFor="floatingPassword">Email Id</label>
                      {errors.email && (
                        <p style={{ color: "red" }}>{errors.email}</p>
                      )}
                    </div>
                  </div>
                  <div className="form-floating mb-3 ml-3">
                    <input
                      value={adhaarNumberRef}
                      type="number"
                      className="form-control"
                      placeholder="Adharnumber"
                      style={{ width: "75%" }}
                      required
                      onInvalid={(e) =>
                        e.target.setCustomValidity("Please Enter Adhar Number")
                      }
                      onChange={(e) => {
                        setadhaarNumberRef(e.target.value);
                        e.target.setCustomValidity("");
                      }}
                    />
                    <label htmlFor="floatingPassword">Adhar Number</label>
                    {errors.adhaarNumber && (
                      <p style={{ color: "red" }}>{errors.adhaarNumber}</p>
                    )}
                  </div>
                  <div className="py-2 d-flex justify-content-end">
                    <button
                      type="submit"
                      className="btn btn-success px-3 py-2 text-center fs-sm fw-bold rounded-pill mr-2"
                    >
                      Next
                    </button>
                  </div>
                </form>
              </div>
            </div>
          ) : (
            <div
              style={{
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
                flexWrap: "wrap",
                padding: "8px",
              }}
            >
              <div
                style={{
                  backgroundColor: "#e9eeff",
                  overflow: "hidden",
                  height: "auto",
                  padding: "5px",
                  zIndex: 10,
                  borderRadius: "8px",
                }}
              >
                <h3 className="mb-5 ml-3" style={{ color: "#735cdb" }}>
                  Additional Information
                </h3>
                <select
                  className="form-select form-select mb-3"
                  aria-label="Large select example"
                  value={usertype}
                  onChange={handleSelectChange}
                >
                  <option value=" " selected>
                    Select Type Of User
                  </option>
                  <option value="aqua">Aqua Farming</option>
                  <option value="analytics">Aqua Analytics</option>
                  <option value="water">WaterBody</option>
                  <option value="3D Printing">3D Printing</option>
                </select>
                {/* START IOT ADMIN DASHBOARD Form  */}
                {/*  eslint-disable-next-line */}
                {usertype == "analytics" && (
                  <form onSubmit={AquaAnalytics}>
                    <div
                      className="analytics ml-3 mr-3"
                      style={{ maxHeight: "363px", overflow: "auto" }}
                    >
                      <div className="form-floating mb-3 ">
                        <input
                          type="Text"
                          className="form-control"
                          ref={accountnameref}
                          placeholder="AccountName"
                          style={{ width: "55%" }}
                          required
                          onInvalid={(e) =>
                            e.target.setCustomValidity(
                              "Please Enter AccountName"
                            )
                          }
                          onChange={(e) => {
                            e.target.setCustomValidity("");
                          }}
                        />

                        <label forName="floatingPassword">Account Name</label>
                      </div>
                      <div className="overflow-scroll">
                        <table
                          className="table-bordered table-striped table-hover table-design"
                          style={{ width: "max-content", overflow: "auto" }}
                        >
                          <thead>
                            <tr>
                              <th className="text-center">Device Types</th>
                              <th
                                className="text-center"
                                style={{ width: "163px" }}
                              >
                                Device Quantity
                              </th>
                              <th className="text-center">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {aquaDeviceType.map((selectItem, i) => (
                              <tr key={i}>
                                <td className="margin-row">
                                  <select
                                    className="form-select form-select"
                                    aria-label="Large select example"
                                    required
                                    onInvalid={(e) =>
                                      e.target.setCustomValidity(
                                        "Please Select Device"
                                      )
                                    }
                                    onChange={(e) => {
                                      e.target.setCustomValidity("");
                                      aquahandleSelectChange(i, e);
                                    }}
                                  >
                                    <option value="" disabled selected>
                                      Select your Device
                                    </option>
                                    {response1?.results.map((data, i) => (
                                      <option key={i} value={data[0]}>
                                        {data[0]}
                                      </option>
                                    ))}
                                  </select>
                                </td>
                                <td className="text-center d-flex justify-content-center">
                                  <div>
                                    <button
                                      type="button"
                                      className="btn btn-secondary"
                                      onClick={() => decrement(i)}
                                    >
                                      -
                                    </button>
                                    <button
                                      className="btn btn-info"
                                      style={{ marginLeft: "10px" }}
                                    >
                                      {" "}
                                      {selectItem.count}
                                    </button>
                                    <button
                                      type="button"
                                      className="btn btn-secondary"
                                      style={{ marginLeft: "10px" }}
                                      onClick={() => increment(i)}
                                    >
                                      +
                                    </button>
                                  </div>
                                </td>
                                <td>
                                  <button onClick={() => onRemove(i)}>
                                    <i
                                      type="button"
                                      className="bi bi-trash"
                                      style={{ color: "red", fontSize: 25 }}
                                    ></i>
                                  </button>
                                </td>
                              </tr>
                            ))}
                            <tr>
                              <td colSpan="3">
                                <div>
                                  <button
                                    type="button"
                                    className="btn btn-warning"
                                    onClick={addSelectItem}
                                  >
                                    Add+
                                  </button>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="d-flex justify-content-end mt-2">
                      <button
                        type="submit"
                        className=" d-flex justify-content-end btn btn-success px-3 py-2 text-center fs-sm fw-bold rounded-pill mr-2 "
                      >
                        Register
                      </button>
                    </div>
                  </form>
                )}

                {/* END IOT ADMIN DASHBOARD Form  */}

                {/* START 3D PRINTING DASHBOARD Form  */}
                {/* eslint-disable-next-line */}
                {usertype == "3D Printing" && (
                  <div className="d-flex justify-content-end mt-2">
                    <button
                      type="submit"
                      className=" d-flex justify-content-end btn btn-success px-3 py-2 text-center fs-sm fw-bold rounded-pill mr-2 "
                    >
                      Register
                    </button>
                  </div>
                )}

                {/* END 3D PRINTING DASHBOARD Form  */}

                {/* START AQUA FARMING DASHBOARD Form  */}
                {/* eslint-disable-next-line */}
                {usertype == "aqua" && (
                  <form onSubmit={AquaFarmingFormSubmit}>
                    <FormControl sx={{ m: 1, width: "30ch" }} variant="filled">
                      <InputLabel htmlFor="filled-adornment-password">
                        Password
                      </InputLabel>
                      <FilledInput
                        id="filled-adornment-password"
                        type={showPassword ? "text" : "password"}
                        inputRef={password_aqua_farming} // Correctly bind the ref
                        required
                        onInvalid={(e) =>
                          e.target.setCustomValidity("Must Enter Your Password")
                        }
                        onChange={(e) => {
                          e.target.setCustomValidity("");
                        }}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    </FormControl>
                    <div className="d-flex justify-content-end mt-2">
                      <button
                        type="submit"
                        className="btn btn-success px-3 py-2 text-center fs-sm fw-bold rounded-pill mr-2"
                      >
                        Register
                      </button>
                    </div>
                  </form>
                )}
                {/* END AQUA FARMING DASHBOARD Form  */}

                {/* START WATERBODY DASHBOARD Form  */}

                {usertype === "water" && (
                  <form onSubmit={waterBodyRejeventionSubmit}>
                    <FormControl sx={{ m: 1, width: "30ch" }} variant="filled">
                      <InputLabel htmlFor="filled-adornment-password">
                        Password
                      </InputLabel>
                      <FilledInput
                        id="filled-adornment-password"
                        type={showPassword ? "text" : "password"}
                        inputRef={password_aqua_farming} // Correctly bind the ref
                        required
                        onInvalid={(e) =>
                          e.target.setCustomValidity("Must Enter Your Password")
                        }
                        onChange={(e) => {
                          e.target.setCustomValidity("");
                        }}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    </FormControl>
                    <div className="d-flex justify-content-end mt-2">
                      <button
                        type="submit"
                        className="btn btn-success px-3 py-2 text-center fs-sm fw-bold rounded-pill mr-2"
                      >
                        Register
                      </button>
                    </div>
                  </form>
                )}

                {/* END WATERBODY DASHBOARD Form  */}

                <div></div>
                <div className="py-2 d-flex justify-content-between">
                  <button
                    className="btn btn-warning ml-3 px-3 py-2 text-center fs-sm fw-bold rounded-pill"
                    onClick={() => {
                      setadditionalinformation(!additionalinformation);
                    }}
                  >
                    {" "}
                    Back{" "}
                  </button>
                </div>
              </div>
            </div>
          )}

          <div
            className="d-flex"
            style={{ justifyContent: "end", alignItems: "end" }}
          >
            <img
              src={farmer}
              alt="oldfarmer"
              style={{ position: "absolute", bottom: 0 }}
            />
          </div>
        </div>
      </div>

      {registersuccess ? (
        <div
          className="check-modal"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            buttom: 0,
            zIndex: 20,
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <div
            className="model"
            style={{ fontSize: "16px", width: "600px", height: "300px" }}
          >
            <img
              src={success}
              alt="successful"
              style={{ width: "200px", marginLeft: "30%" }}
            />
            <p style={{ marginLeft: "30%" }}>Your account Under Verification</p>
            <p style={{ marginLeft: "30%" }}>Contact To Admin:-9777171033</p>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Signup;
