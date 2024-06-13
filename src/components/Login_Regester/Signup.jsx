import signupback from "./../../assets/image/Group.png";
import farmer from "../../assets/image/Clippathgroup.png";
import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import FilledInput from "@mui/material/FilledInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
const Signup = () => {
  const [selectItemsAndCounters, setSelectItemsAndCounters] = useState([
    { value: "", count: 1 },
    // Initialize with default values if needed
  ]);

  const [noofponds, setNoOfPonds] = useState(1);
  const [selectedValue, setSelectedValue] = useState("");
  const [deviceinfo, setDeviceinfo] = useState(false);
  const increment = (index) => {
    const updatedItems = [...selectItemsAndCounters];
    updatedItems[index].count += 1;
    setSelectItemsAndCounters(updatedItems);
  };
  //
  const decrement = (index) => {
    const updatedItems = [...selectItemsAndCounters];
    if (updatedItems[index].count > 1) {
      updatedItems[index].count -= 1;
    }
    setSelectItemsAndCounters(updatedItems);
  };
  const onRemove = (index) => {
    const updatedItems = selectItemsAndCounters.filter((_, i) => i !== index);
    setSelectItemsAndCounters(updatedItems);
  };

  const addSelectItem = () => {
    setSelectItemsAndCounters([
      ...selectItemsAndCounters,
      { value: "", count: 1 },
    ]);
  };

  // const handleSelectChange = (index, event) => {
  //   const updatedItems = [...selectItemsAndCounters];
  //   updatedItems[index].value = event.target.value;
  //   setSelectItemsAndCounters(updatedItems);
  // };
  const pondcountinc = () => {
    setNoOfPonds(1 + noofponds);
  };
  const pondcountdec = () => {
    if (noofponds > 1) {
      setNoOfPonds(noofponds - 1);
    }
  };
  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
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

    const inv = [0, 4, 3, 2, 1, 5, 6, 7, 8, 9];

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

    const email = emailRef;
    const phoneNumber = phoneNumberRef;
    const adhaarNumber = adhaarNumberRef;

    if (!validateEmail(email)) {
      formErrors.email = "Invalid email address";
    }
    if (!validatePhoneNumber(phoneNumber)) {
      formErrors.phoneNumber = "Invalid phone number";
    }
    if (!validateAadhaar(adhaarNumber)) {
      formErrors.adhaarNumber = "Invalid Aadhaar number";
    }

    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      // Form is valid, proceed with form submission
      console.log("Form submitted successfully");
      setDeviceinfo(!deviceinfo);
    }
  };

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
          {deviceinfo ? (
            <div
              style={{
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
                flexWrap: "wrap",
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
                      type="Text"
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
                padding: "5px",
              }}
            >
              <div
                style={{
                  backgroundColor: "#e9eeff",

                  height: "auto",
                  padding: "5px",
                  zIndex: 10,
                }}
              >
                <h3 className="mb-5 ml-3" style={{ color: "#735cdb" }}>
                  Additional Information
                </h3>
                <select
                  class="form-select form-select-lg mb-3"
                  aria-label="Large select example"
                  value={selectedValue}
                  onChange={handleSelectChange}
                >
                  <option value=" " selected>
                    Select Your Device
                  </option>
                  <option value="Aqua">Aqua</option>
                  <option value="Water Body">Water Body</option>

                  <option value="3D Printing">3D Printing</option>
                  <option value="Gis">Gis</option>
                </select>
                {/* START Aqua Form  */}
                {selectedValue == "Aqua" && (
                  <form>
                    <div className="Aqua ml-3 mr-3">
                      <div class="form-floating mb-3 ">
                        <input
                          type="Text"
                          class="form-control"
                          placeholder="Password"
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
                        <label for="floatingPassword">Account Name</label>
                      </div>

                      <table class="table table-hover">
                        <thead>
                          <tr>
                            <th  className="text-center">Device Types</th>
                            <th className="text-center">Device Quantity</th>
                            <th  className="text-center" style={{ marginLeft: "200px" }}>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectItemsAndCounters.map((selectItem, i) => (
                            <tr key={i}>
                              <td className="margin-row">
                                <select
                                  class="form-select form-select-lg mb-3 "
                                  aria-label="Large select example"
                                  style={{ width: "200px" }}
                                  required
                                  onInvalid={(e) =>
                                    e.target.setCustomValidity(
                                      "Please Select Device"
                                    )
                                  }
                                  onChange={(e) => {
                                    e.target.setCustomValidity("");
                                  }}
                                >
                                  <option value="" selected>
                                    Open this select menu
                                  </option>
                                  <option value="Aeration">Aeration</option>
                                </select>
                              </td>
                              <td>
                                <div>
                                  <button
                                    type="button"
                                    class="btn btn-secondary"
                                    onClick={() => decrement(i)}
                                  >
                                    -
                                  </button>
                                  <button
                                    class="btn btn-info"
                                    style={{ marginLeft: "10px" }}
                                  >
                                    {" "}
                                    {selectItem.count}
                                  </button>
                                  <button
                                    type="button"
                                    class="btn btn-secondary"
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
                                    class="bi bi-trash"
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
                                  class="btn btn-warning"
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

                {/* END Aqua Form  */}

                {/* START WaterBody Form  */}

                {selectedValue == "Water Body" && (
                  <form>
                    <div className="waterbodyform">
                      <div className="d-flex">
                        <div class="form-floating mb-3 ml-3">
                          <input
                            type="text"
                            class="form-control"
                            id="floatingInput"
                            placeholder="Pond Name"
                            style={{ width: "85%" }}
                            required
                            onInvalid={(e) =>
                              e.target.setCustomValidity("Pond Name ?")
                            }
                            onChange={(e) => {
                              e.target.setCustomValidity("");
                            }}
                          />
                          <label for="floatingInput">Pond Name</label>
                        </div>

                        <div class="form-floating mb-3 ml-3">
                          <input
                            type="text"
                            class="form-control"
                            id="floatingInput"
                            placeholder="District Name"
                            style={{ width: "85%" }}
                            required
                            onInvalid={(e) =>
                              e.target.setCustomValidity("District name ?")
                            }
                            onChange={(e) => {
                              e.target.setCustomValidity("");
                            }}
                          />
                          <label for="floatingInput">District Name</label>
                        </div>
                      </div>
                      <div className="d-flex justify-content-between ml-3 mr-5">
                        <div className=" ml-2  " style={{ fontSize: "20px" }}>
                          No. Of Ponds
                        </div>
                        <div>
                          <button
                            type="button"
                            class="btn btn-secondary"
                            onClick={pondcountdec}
                          >
                            -
                          </button>
                          <button
                            type="button"
                            class="btn btn-info"
                            style={{ marginLeft: "10px" }}
                          >
                            {noofponds}
                          </button>
                          <button
                            type="button"
                            class="btn btn-secondary"
                            style={{ marginLeft: "10px" }}
                            onClick={pondcountinc}
                          >
                            +
                          </button>
                        </div>
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

                {/* END WaterBody Form  */}
                {selectedValue == "3D Printing" && (
                  <div className="d-flex justify-content-end mt-2">
                    <button
                      type="submit"
                      className=" d-flex justify-content-end btn btn-success px-3 py-2 text-center fs-sm fw-bold rounded-pill mr-2 "
                    >
                      Register
                    </button>
                  </div>
                )}

                {selectedValue == "Gis" && (
                  <>
                    <FormControl sx={{ m: 1, width: "30ch" }} variant="filled">
                      <InputLabel htmlFor="filled-adornment-password">
                        Password
                      </InputLabel>
                      <FilledInput
                        id="filled-adornment-password"
                        type={showPassword ? "text" : "password"}
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
                        className=" d-flex justify-content-end btn btn-success px-3 py-2 text-center fs-sm fw-bold rounded-pill mr-2 "
                      >
                        Register
                      </button>
                    </div>
                  </>
                )}
                <div></div>
                <div className="py-2 d-flex justify-content-between">
                  <button
                    className="btn btn-warning ml-3 px-3 py-2 text-center fs-sm fw-bold rounded-pill"
                    onClick={() => {
                      setDeviceinfo(!deviceinfo);
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
    </>
  );
};

export default Signup;
