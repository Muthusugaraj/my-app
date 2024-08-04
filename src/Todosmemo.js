import { useState } from "react";
import Todos from "./Todos";

function Todosmemo(){
    const [count, setCount] = useState(0);
    const [todos, setTodos] = useState(["todo 1", "todo 2"]);
  
    const increment = () => {
    const newCount = count + 1;
    setCount(newCount);
      setTodos([...todos,"todo "+newCount]);
    };
  
    return (
      <>
        <Todos todos={todos} />
        <hr />
        <div>
          Count: {count}
          <button onClick={increment}>+</button>
        </div>
      </>
    );
  }
  
  export default Todosmemo;