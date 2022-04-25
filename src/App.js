import "./App.css";
import Axios from 'axios'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import React, { Fragment, useEffect, useState } from "react";

function App() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5005/getjobschedule").then((result) => {
      result.json().then((res) => {
        console.log("Result", res);
        setData(res);
      });
    });
  }, []);

  function formater(dateVal) {
    let date = "" + dateVal.getFullYear() + "-";

    if (dateVal.getMonth() < 10) {
      date += "0";
    }

    date += dateVal.getMonth() + 1 + "-" + dateVal.getDate();

    return date;
  }

  return (
    <div className="App">

      <h1>Job Master Table</h1>
      <AddJob />
      <table className="table">
        <thead>
          <tr>
            <th scope="col">JobID</th>
            <th scope="col">JobName</th>
            <th scope="col">machine_name</th>
            <th scope="col">Status</th>
            <th scope="col">Shift</th>
            <th scope="col">Job_count</th>
            <th scope="col">Schedule_date</th>
            <th scope="col">Latest_schedule_date</th>
            <th scope="col">Rescheduling_reason</th>
          </tr>
        </thead>
        {data.map((item) => (
          <tbody>
            <tr>
              <td scope="row">{item.jobid}</td>
              <td scope="row">{item.jobname}</td>
              <td scope="row">{item.machine_name}</td>
              <td scope="row">{item.status}</td>
              <td scope="row">{item.shift}</td>
              <td scope="row">{item.job_count}</td>
              <td scope="row">{formater(new Date(item.schedule_date))}</td>
              <td scope="row">{formater(new Date(item.latest_schedule_date))}
              </td>
              <td scope="row">{item.rescheduling_reason}</td>
            </tr>
          </tbody>
        ))}
      </table>

    </div>
  );
}

const AddJob = () => {

  const [jobname, setJname] = useState("");
  const [mid, setMid] = useState("")
  const [schedule_date, setSDate] = useState(new Date());
  const [latest_schedule_date, setReSDate] = useState(new Date());
  const [shift, setShift] = useState("")
  const [status, setStatus] = useState("")
  const [job_count, setJcount] = useState("")


  function getFormData(e) {
    e.preventDefault();

    console.warn({ jobname, mid, shift, job_count, status, schedule_date, latest_schedule_date });
    let data = { jobname, mid, shift, job_count, status, schedule_date, latest_schedule_date }


    Axios.post('http://localhost:5005/getjobschedule/jobsbyjobcount', data)
      .then((res) => {
        alert("Data is inserted successfully...")
        console.warn("res=", res);
      })
    // fetch("http://localhost:5005/getjobschedule/jobsbyjobcount",
    //   {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(data)
    //   }
    // ).then((response) => {
    //   console.warn("result", response);
    //   alert("data inserted sucessfully...")
    // }
    // );
  };

  return (
    <Fragment>
      {/* <!-- Button trigger modal --> */}
      <button
        type="button"
        class="btn btn-success mb-3 ms-3 float-start"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
      >
        Add Job
      </button>

      {/* <!-- Modal --> */}
      <div
        class="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="staticBackdropLabel">
                Insert New Job
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              {/* Form body */}
              <form onSubmit={getFormData}>
                <div class="mb-3">
                  <label class="form-label float-start">JobName</label>
                  <input type="text" class="form-control" onChange={(e) => setJname(e.target.value)} placeholder="Job Name" />

                </div>
                <div>
                  <label class="form-label float-start">MachineName</label>
                  <select class="form-select" onChange={(e) => setMid(e.target.value)} aria-label="Default select example">
                    <option selected disabled >Select</option>
                    <option value="1">3DPrinter</option>
                    <option value="2">Auto-Stitcher</option>
                    <option value="3">Auto-Corrugator</option>
                    <option value="4">Rotary Auto-Feed</option>
                    <option value="5">2DPrinter</option>
                  </select>
                </div>

                {/*Schedule Date */}
                <div class="container ">
                  <div class="row">
                    <div class="col-6 p-4">
                      <label class="form-label float-start">Schedule_Date</label>
                    </div>
                    <div class="col-6 p-3">
                      <DatePicker selected={schedule_date} onChange={(date) => setSDate(date)} peekNextMonth
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select" />
                    </div>
                  </div>
                </div>

                {/*Rechedule Date */}
                <div class="container">
                  <div class="row">
                    <div class="col-6 p-4">
                      <label class="form-label float-start">Reschedule_Date</label>
                    </div>
                    <div class="col-6 p-3">
                      <DatePicker selected={latest_schedule_date} onChange={(date) => setReSDate(date)} peekNextMonth
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select" />
                    </div>

                  </div>
                </div>

                {/* status */}
                <div class="mb-3">
                  <label class="form-label float-start">Status</label>
                  <select class="form-select" onChange={(e) => setStatus(e.target.value)} aria-label="Default select example">
                    <option selected disabled >Select</option>
                    <option value="Pass">Pass</option>
                    <option value="Fail">Fail</option>
                  </select>
                </div>

                {/* shift */}
                <div class="mb-3">
                  <label class="form-label float-start">Shift</label>

                  <select class="form-select" onChange={(e) => setShift(e.target.value)} aria-label="Default select example">
                    <option selected disabled >Select the Shift</option>
                    <option value="1">MorningShift</option>
                    <option value="2">AfternoonShift</option>
                  </select>
                </div>

                {/* JobCount */}
                <div class="mb-3">
                  <label class="form-label float-start">JobCount</label>
                  <input type="text" class="form-control" onChange={(e) => setJcount(e.target.value)} placeholder="Enter JobCount" />
                </div>

                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="submit" class="btn btn-primary" >Add Details</button>

                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default App;
