import { useEffect, useState } from "react";
import "./style.css";
function Task() {
  const [list, setList] = useState(() => {
      const savedlist = localStorage.getItem("list");
      try {
          return savedlist
            ? JSON.parse(savedlist)
            : ["what to do", "go for work"];    
      } catch (error) {
          console.error("error parsing saved list from local storage");
        return ["what to do","go for work"];
      }
     
  });

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);
  function additem() {
    const val = document.querySelector("#inp").value;
    if (val.length < 10) {
      alert("Enter valid task please atleast bigger than 15 character");
      return;
    }
    setList((l) => [...l, val]);
    document.querySelector("#inp").value = "";
  }
  function removeItem(index) {
    setList(list.filter((_, i) => index !== i));
  }
  return (
    <div className="tasklist">
      <h1 className="taskHeader">Your Task List</h1>
      <div className="inpbox">
        <input type="text" id="inp" />
        <button onClick={additem}>Add</button>
      </div>

      <ul>
        {list.map((item, index) => (
          <li key={index}>
            {item}
            <div>
              <button id={index} onClick={() => removeItem(index)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Task;
