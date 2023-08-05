import { useState ,useEffect  } from "react";
import "./App.css";
import Task from "./components/Task";
import Button from "react-bootstrap/Button";
import AddTaskModal from './components/AddTaskModal'

function App() {
  const [taskList, addTask] = useState([]);
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    fetchList()
  }, []);

  function fetchList(){
    fetch("http://localhost:8080/todo").then(
      (response)=>{
        response.json().then(
          (resp)=>{
            addTask(resp)
          }
        )
      }
    )
  }

  const dataHandler=(todoList)=>{
    setModalShow(false)
    addTask(todoList)
    
  }

  return (
    <>
    <div className="App">
      <div className="addBar">
        <h2 className="todo">TODO's</h2>
        <div>
          <Button
          className="ml-1"
            variant="primary"
            onClick={(e) => {
            setModalShow(true)
            }}
          >
            + Add
          </Button>
        </div>
      </div>
      <div className="taskList">
        {taskList.sort((a,b)=>(a.severity-b.severity)).map((item, i) => (
          <Task key={i} taskObj={item}  getdata={dataHandler} ></Task>
        ))}
      </div>
    </div>
    <AddTaskModal 
         show={modalShow}
         onHide={() => setModalShow(false)}
         getdata={dataHandler}
         />
    </>
  );
}

export default App;
