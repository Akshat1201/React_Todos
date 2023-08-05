import { useState , React  } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { MdDeleteForever } from "react-icons/md";

export default function Task(props) {
  const [detailModalShow, setModalShow] = useState(false);
const deleteTaskHandler=(index)=>{
  fetch("http://www.localhost:8080/todo/delete/"+index, {
    method: "DELETE"
}).then((response)=>{
      response.json().then(
        (resp)=>{
          console.log(resp);
          props.getdata(resp)
        }
      )
    })
}
  return (
    <>
    <div className={"taskCard "+
    (props.taskObj.severity==1?"red":
     props.taskObj.severity==2?"yellow":"green")}>
    <div  
    style={{width:"100%"}}
    onClick={(e)=>{setModalShow(true)}}
  >
     {props.taskObj.name}
    </div>
    <div className="mr-1" onClick={()=>(deleteTaskHandler(props.taskObj.index))} ><MdDeleteForever/></div>
    </div>
    <TaskDetaiModal  show={detailModalShow}
        onHide={() => setModalShow(false)}
        taskobject= {props.taskObj}/>
    </>
  )
}


function TaskDetaiModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
       <h4>{props.taskobject.name}</h4>  
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <b>Description</b><br />
        <p>
         {props.taskobject.desc}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

