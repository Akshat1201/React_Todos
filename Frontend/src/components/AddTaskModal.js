import { useState, React } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../App.css";

export default function AddTaskModal(props) {
  const [severityValue, selectSeverity] = useState(1);
  const [taskName, updateTaskName] = useState("");
  const [taskDesc, updateTaskDesc] = useState("");

 

  const severity = [
    { id: 1, severityName: "High" },
    { id: 2, severityName: "Medium" },
    { id: 3, severityName: "Low" },
  ];

  const severityDwnHandler = (event) => {
    selectSeverity(event.target.value);
  };
  const cancelHandle = () => {
    selectSeverity(1)
    updateTaskName("")
    updateTaskDesc("")
    props.onHide()
  };

  const submitHandle = () => {
    const requestBody={
      "name":taskName,
      "desc":taskDesc,
      "severity":severityValue
    }

    fetch("http://localhost:8080/todo", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Accept":"application/json",
        "Content-type": "application/json",
      }}).then((response)=>{
        response.json().then(
          (resp)=>{
            console.log(resp);
            props.getdata(resp)
          }
        )
      })
  
 
   selectSeverity(1)
   updateTaskName("")
   updateTaskDesc("")
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Add Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <div style={{ width: "100%", marginBottom: "5px" }}>
            <label>Heading</label>
            <br />
            <input className="input"  value={taskName} placeholder="Todo's Heading"   onChange={(e) => {
              updateTaskName(e.target.value);
            }} />
          </div>
          <div className="flex" style={{ width: "100%" }}>
            <div className="desc">
              <label>Description</label>
              <br />
              <textarea style={{ width: "100%" }}  value={taskDesc} placeholder="Description" onChange={(e) => {
              updateTaskDesc(e.target.value);
            }} />
            </div>
            <div style={{ width: "50%" }}>
              <label>Select Severity</label>
              <br />
              <select
                style={{ width: "100%" }}
                value={severityValue}
                onChange={severityDwnHandler}
              >
                {severity.map((item) => (
                  <option  key={item.id} value={item.id}>{item.severityName}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={cancelHandle}>Cancel</Button>
        <Button  onClick={submitHandle}>Save</Button>
      </Modal.Footer>
    </Modal>
  );
}
