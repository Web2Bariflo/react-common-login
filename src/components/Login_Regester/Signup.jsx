import signupback from "./../../assets/image/Group.png";
import farmer from "../../assets/image/Clippathgroup.png";
import React, { useState, useRef } from "react";
import IconButton from "@mui/material/IconButton";
import FilledInput from "@mui/material/FilledInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
const Signup = () => {
  const [selectItemsAndCounters, setSelectItemsAndCounters] = useState([
    { value: "", count: 0 },
    // Initialize with default values if needed
  ]);

  const [noofponds, setNoOfPonds] = useState(0);
  const [selectedValue, setSelectedValue] = useState("");
  const[additionalinfo,setAdditionalinfo]=useState(false);
  const increment = (index) => {
    const updatedItems = [...selectItemsAndCounters];
    updatedItems[index].count += 1;
    setSelectItemsAndCounters(updatedItems);
  };
  //
  const decrement = (index) => {
    const updatedItems = [...selectItemsAndCounters];
    if (updatedItems[index].count > 0) {
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
      { value: "", count: 0 },
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
    if (noofponds > 0) {
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
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const phoneNumberRef = useRef();
  const emailRef = useRef();
  const aadhaarNumberRef = useRef();
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhoneNumber = (phoneNumber) => {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phoneNumber);
  };
  const validateAadhaar = (aadhaarNumber) => {
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
    let invertedArray = aadhaarNumber.split("").map(Number).reverse();

    for (let i = 0; i < invertedArray.length; i++) {
      c = d[c][p[i % 8][invertedArray[i]]];
    }

    return c === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = {};

    const email = emailRef.current.value;
    const phoneNumber = phoneNumberRef.current.value;
    const aadhaarNumber = aadhaarNumberRef.current.value;

    if (!validateEmail(email)) {
      formErrors.email = "Invalid email address";
    }
    if (!validatePhoneNumber(phoneNumber)) {
      formErrors.phoneNumber = "Invalid phone number";
    }
    if (!validateAadhaar(aadhaarNumber)) {
      formErrors.aadhaarNumber = "Invalid Aadhaar number";
    }

    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      // Form is valid, proceed with form submission
      console.log("Form submitted successfully");
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
                width: "30%",
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
                      ref={firstNameRef}
                      type="text"
                      className="form-control"
                      id="floatingInput"
                      placeholder="FirstName"
                      required
                      onInvalid={(e) =>
                        e.target.setCustomValidity("Please Enter First Name")
                      }
                      onChange={(e) => e.target.setCustomValidity("")}
                    />
                    <label htmlFor="floatingInput">First Name</label>
                  </div>
                  <div className="form-floating mb-3 ml-3">
                    <input
                      ref={lastNameRef}
                      type="text"
                      className="form-control"
                      id="floatingInput"
                      placeholder="LastName"
                      required
                      onInvalid={(e) =>
                        e.target.setCustomValidity("Please Enter Last Name")
                      }
                      onChange={(e) => e.target.setCustomValidity("")}
                    />
                    <label htmlFor="floatingInput">Last Name</label>
                  </div>
                </div>
                <div className="d-flex">
                  <div className="form-floating mb-3 ml-3">
                    <input
                      ref={phoneNumberRef}
                      type="number"
                      className="form-control"
                      id="floatingPassword"
                      placeholder="Mobile Number"
                      required
                      onInvalid={(e) =>
                        e.target.setCustomValidity("Please Enter Mobile Number")
                      }
                      onChange={(e) => e.target.setCustomValidity("")}
                    />
                    <label htmlFor="floatingPassword">Mobile Number</label>
                    {errors.phoneNumber && (
                      <p style={{ color: "red" }}>{errors.phoneNumber}</p>
                    )}
                  </div>
                  <div className="form-floating mb-3 ml-3">
                    <input
                      ref={emailRef}
                      type="email"
                      className="form-control"
                      placeholder="Email-ID"
                      required
                      onInvalid={(e) =>
                        e.target.setCustomValidity("Please Enter Email-ID")
                      }
                      onChange={(e) => e.target.setCustomValidity("")}
                    />
                    <label htmlFor="floatingPassword">Email Id</label>
                    {errors.email && (
                      <p style={{ color: "red" }}>{errors.email}</p>
                    )}
                  </div>
                </div>
                <div className="form-floating mb-3 ml-3">
                  <input
                    ref={aadhaarNumberRef}
                    type="Text"
                    className="form-control"
                    placeholder="Adharnumber"
                    style={{ width: "75%" }}
                    required
                    onInvalid={(e) =>
                      e.target.setCustomValidity("Please Enter Adhar Number")
                    }
                    onChange={(e) => e.target.setCustomValidity("")}
                  />
                  <label htmlFor="floatingPassword">Adhar Number</label>
                  {errors.aadhaarNumber && (
                    <p style={{ color: "red" }}>{errors.aadhaarNumber}</p>
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
