import React, {useEffect, useState} from "react";
import styled from "styled-components";

export default function Todo() {
    const [tasks,setTasks] = useState([
        {
            id:1,
            title: "Buy 1 Kg Tomato",
        },
        {
            id:2,
            title: "Visit Friends",
        },      
      

    ])
    const [completed,setComplete] = useState([
        {
            id:3,
            title: "Washing Coloths",
        },
        {
            id:4,
            title: "Play Cricket",
        },
   
    ])

    const [newTask, setNewTask] = useState("");
    const [itemCount,setItemCount] = useState()

    useEffect(() =>{
        setItemCount(completed.length + tasks.length);
    }, [])
    
    const deleteTasks = (id) => {
        let new_list = tasks.filter((tasks) => tasks.id !== id);
        setTasks(new_list);
    }
    const deleteComplete = (id) => {
        let new_list = completed.filter((completed) => completed.id !== id);
        setComplete(new_list);
    }

    const completeTask = (id) =>{
        let current_task = tasks.find((tasks) => tasks.id == id);
        setComplete ([...completed, current_task]);

        let new_list = tasks.filter((tasks) => tasks.id !== id);
        setTasks(new_list);

    }
    const undo=(id) =>{
        let current_task = completed.find((tasks) => tasks.id == id);
        let new_list = completed.filter((tasks) => tasks.id !== id);
        setComplete(new_list);
        setTasks([...tasks,current_task])
    }
    
    const renderTasks = () =>{
        return tasks.map((tasks) =>(
            <TodoList>
            <Items>
                <LeftContainer onClick={() => completeTask(tasks.id)}>
                    <RoundContainer></RoundContainer>
                    <ListContent>{tasks.id},{tasks.title} </ListContent>
                </LeftContainer>
                <RightContainer>
                    <DeleteButton onClick={()=>(deleteTasks(tasks.id))}>
                        <Delete src={require("../assets/delete.svg").default} alt="image" />
                    </DeleteButton>
                </RightContainer>
            </Items>
        </TodoList>
        ))
    }
    const renderCompleted = () =>{
        return completed.map((completed) =>(
            <TodoList>
                 <Items>
                     <LeftContainer>
                         <RoundContainerCompleted>
                             <GreenTick src={require("../assets/tick-green.svg").default} alt="image" />
                         </RoundContainerCompleted>
                         <ListContentCompleted>{completed.id},{completed.title}</ListContentCompleted>
                     </LeftContainer>
                     <RightContainer>
                     <RevertButton onClick={() => undo(completed.id)}>
                             <Revert src={require("../assets/revert.svg").default} alt="image" />
                         </RevertButton> 
                         <DeleteButton onClick={()=> deleteComplete(completed.id)}>
                             <Delete src={require("../assets/delete.svg").default} alt="image" />
                         </DeleteButton>
                     </RightContainer>
                 </Items>
             </TodoList>
        ))
    }

     const addNewTask = (event) =>{
         event.preventDefault();
         let new_task = {
             id:itemCount + 1,
             title:newTask,
         }
         setTasks([...tasks, new_task])
         setNewTask("");
         setItemCount((prev)=> prev + 1);
     }
  return (
    <>
      <Container>
        <Heading>TODO list</Heading>
         <TodoContainer>
             <SubHeading>Things to be done</SubHeading>
             <TodoList>{renderTasks()}</TodoList>
         </TodoContainer>
        <NewTodoForm>
            <FormInput value ={newTask}
              onChange ={(e) => setNewTask(e.target.value)}
              placeholder="Type New Task . . .  ." 
            />
            <AddNewButton onClick={(e)=> addNewTask(e)}>Add New</AddNewButton>
        </NewTodoForm>
        <TodoContainer>
             <SubHeading>Completed</SubHeading>
             <TodoList>{renderCompleted()}</TodoList>
         </TodoContainer>
      </Container>
    </>
  );
}
const Container = styled.div`
    width: 90%;
    margin: 0 auto;
    max-width: 1000px;
    padding: 50px 10%;
    border-left: 2px solid #f5f5f5;
    border-right: 2px solid #f5f5f5;
    min-height: 100vh;
`;
const Heading = styled.h1`
    font-size: 54px;
    text-align: center;
    margin-bottom: 40px;
`;
const TodoContainer = styled.div``;
const SubHeading = styled.h3`
    color: #040241;
    font-size: 40px;
`;
const TodoList = styled.ul``;
const Items = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
`;
const LeftContainer = styled.div`
    display: flex;
    align-items: center;
`;
const RoundContainer = styled.span`
    width: 32px;
    height: 32px;
    border-radius:50%;
    border: 2px solid #050241;
    display: inline-block;
    margin-right: 15px;
    cursor: pointer;
`; 
const ListContent = styled.span`
    font-size: 30px;
    cursor: pointer;
`;
const RightContainer = styled.div``;
const DeleteButton = styled.button`
    border: none;
    background: none;
    cursor: pointer;
    margin-right: 20px;
`;
const Delete = styled.img``;
const NewTodoForm = styled.form`
    display: flex;
    margin-left: 40px;
    margin-top: 50px;
`;
const FormInput = styled.input`
    display: block;
    width: 80%;
    border: 1px solid #c6c6c6;
    font-size: 20px;
    padding: 10px 10px 10px 20px ;
`;
const AddNewButton = styled.button`
    width: 20%;
    background: #050241;
    color: white;
    font-size: 20px;
    border: none;
    cursor: pointer;
`;
const RoundContainerCompleted = styled(RoundContainer)`
    display: flex;
    align-items: center;
    justify-content: center;
    border-color: #06c692;
`;
const GreenTick = styled.img``;
const ListContentCompleted = styled(ListContent)`
    color:#06c692 ;
`;
const RevertButton = styled.button`
    border: none;
    background: none;
    cursor: pointer;
    margin-right: 30px;
`;
const Revert = styled.img``;



