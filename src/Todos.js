import { memo } from "react";

const Todos = ({ todos }) => {
    console.log("child render");
    return (
      <>
        <h2>My Todos</h2>
        {todos.map((todo, index) => {
          return <p key={index} style={{color: "red"}}>{todo}</p>;
        })}
      </>
    );
  };
  
  export default memo(Todos);