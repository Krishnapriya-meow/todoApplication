import {
    Button,
    Grid,
    Paper,
    TextField,

} from "@material-ui/core";
import { useState } from "react";
import { ICustomData, ITodo } from "../models/todo";
import { CustomForm } from "./CustomForm";
import { TodoList } from "./TodoList";

export const Form = () => {

    type FormElement = React.FormEvent<HTMLFormElement>;

    const [value, setValue] = useState<string>('');

    const handleSubmit = (e: FormElement): void => {
        e.preventDefault();
        addTodo(value);
        setValue('');
    };

    const addTodo = (text: string): void => {
        const newTodos: ITodo[] = [...todos, { text, complete: false, comments: [] }];
        setTodos(newTodos);
    };

    const [todos, setTodos] = useState<ITodo[]>([]);

    const completeTodo = (index: number): void => {
        const newTodos: ITodo[] = [...todos];
        newTodos[index].complete = !newTodos[index].complete;
        setTodos(newTodos);
    };

    const deleteTodo = (index: number): void => {
        const newTodos: ITodo[] = [...todos];
        newTodos.splice(index, 1);
        setTodos(newTodos);
    };

    const handleCustomData =(custom:ICustomData) =>{
        const newTodos = todos.map(object => {
            return {...object, customData: custom};
          });
          setTodos(newTodos) 
    }

    return (
        <div>
            <Paper className="paper">
                <form onSubmit={handleSubmit}>
                    <Grid
                        container
                        alignItems="center"
                        style={{ padding: 12 ,justifyContent:"center"}}
                        spacing={1}
                    >
                        <TextField
                            type='text'
                            value={value}
                            onChange={e => setValue(e.target.value)}
                            required
                            label="Task"
                            placeholder='Enter Task Here...'

                        />
                        <Button variant="contained" size="large" type='submit' className='button' color="primary">
                            Add
                        </Button>
                    </Grid>
                </form>
                <CustomForm handleCustom={handleCustomData}/>
            </Paper>
           
            <br />
            <TodoList todos={todos} completeTodo={completeTodo} deleteTodo={deleteTodo} setTodos={setTodos} />
        </div>
        
    )
}