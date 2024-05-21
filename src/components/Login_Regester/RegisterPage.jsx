import React, { useState } from "react";

const RegisterPage = () => {
  const [selectItemsAndCounters, setSelectItemsAndCounters] = useState([
    { value: "", count: 0 },
    // Initialize with default values if needed
  ]);

  const [noofponds, setNoOfPonds] = useState(0);
  const [selectedValue, setSelectedValue] = useState("");
  const increment = (index) => {
    const updatedItems = [...selectItemsAndCounters];
    updatedItems[index].count += 1;
    setSelectItemsAndCounters(updatedItems);
  };

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
  return (
    <>
      <div className="d-flex" style={{ border: "1px solid" }}>
        <div>
          <div className="mb-5 mt-3">
            <h3>Registration</h3>
          </div>
          <div className="d-flex mt-">
            <div class="form-floating mb-3">
              <input
                type="text"
                class="form-control"
                id="floatingInput"
                placeholder="name@example.com"
                style={{ width: "250px" }}
              />
              <label for="floatingInput">First Name</label>
            </div>
            <div class="form-floating mb-3 ml-5">
              <input
                type="text"
                class="form-control"
                id="floatingInput"
                placeholder="name@example.com"
                style={{ width: "250px" }}
              />
              <label for="floatingInput">Last Name</label>
            </div>
          </div>
          <div className="d-flex">
            <div class="form-floating mb-3">
              <input
                type="number"
                class="form-control"
                id="floatingPassword"
                placeholder="Password"
                style={{ width: "250px" }}
              />
              <label for="floatingPassword">Mobile Number</label>
            </div>
            <div class="form-floating mb-3 ml-5">
              <input
                type="email"
                class="form-control"
                placeholder="Password"
                style={{ width: "250px" }}
              />
              <label for="floatingPassword">Email Id</label>
            </div>
          </div>
          <div class="form-floating mb-3">
            <input
              type="Text"
              class="form-control"
              placeholder="Password"
              style={{ width: "250px" }}
            />
            <label for="floatingPassword">Adhar Number</label>
          </div>
        </div>

        <div style={{ margin: "20px 0 0 40px", border: "1px solid" }}>
          <h3>Additional Information</h3>
          <select
            class="form-select form-select-lg mb-3 ml-3"
            aria-label="Large select example"
            style={{ width: "250px" }}
            value={selectedValue}
            onChange={handleSelectChange}
          >
            <option value=" " selected>
              Open this select menu
            </option>
            <option value="Aqua">Aqua</option>
            <option value="Water Body">Water Body</option>
            
            <option value="3D Printing">3D Printing</option>
            <option value="Gis">Gis</option>
          </select>
          {/* START Aqua Form  */}
{selectedValue=="Aqua" && (  <div className="Aqua ml-3">
            <div class="form-floating mb-3 ">
              <input
                type="Text"
                class="form-control"
                placeholder="Password"
                style={{ width: "250px" }}
              />
              <label for="floatingPassword">Account Name</label>
            </div>

            <table class="table table-hover">
              <thead>
                <tr>
                  <th>Device Types</th>
                  <th>Device Quantity</th>
                  <th style={{ marginLeft: "200px" }}>Action</th>
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
                      >
                        <option selected>Open this select menu</option>
                        <option value="Aeration">Aeration</option>
                        
                      </select>
                    </td>
                    <td>
                      <div>
                        <button
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
                      <button class="btn btn-warning" onClick={addSelectItem}>
                        Add+
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>

          </div>
 )}

         
          {/* END Aqua Form  */}

          {/* START WaterBody Form  */}

{selectedValue=="Water Body" && (<div className="waterbodyform">
            <div className="d-flex">
              <div class="form-floating mb-3 ml-5">
                <input
                  type="text"
                  class="form-control"
                  id="floatingInput"
                  placeholder="Pond Name"
                  style={{ width: "250px" }}
                />
                <label for="floatingInput">Pond Name</label>
              </div>

              <div class="form-floating mb-3 ml-5">
                <input
                  type="text"
                  class="form-control"
                  id="floatingInput"
                  placeholder="District Name"
                  style={{ width: "250px" }}
                />
                <label for="floatingInput">District Name</label>
              </div>
            </div>
            <div className="d-flex justify-content-between">
              <div className=" mb-3 ml-5 " style={{ fontSize: "20px" }}>
                No. Of Ponds
              </div>
              <div>
                <button class="btn btn-secondary" onClick={pondcountdec}>
                  -
                </button>
                <button class="btn btn-info" style={{ marginLeft: "10px" }}>
                  {noofponds}
                </button>
                <button
                  class="btn btn-secondary"
                  style={{ marginLeft: "10px" }}
                  onClick={pondcountinc}
                >
                  +
                </button>
              </div>
            </div>
          </div> ) }
          

          {/* END WaterBody Form  */}

           


          <div className="py-2 d-flex justify-content-end">
              <button className="btn btn-success px-3 py-2 text-center fs-sm fw-bold rounded-pill ">
                Register
              </button>
            </div>
        </div>
      </div>
    </>
  );
};
export default RegisterPage;
