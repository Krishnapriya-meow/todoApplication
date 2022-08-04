import { DeleteForever, ChatBubbleOutline } from '@mui/icons-material';
import { Divider, List, ListItemButton, ListItemIcon, ListSubheader, TextField } from '@mui/material';
import { pink } from '@mui/material/colors';
import React, { Fragment, useState } from 'react';
import {
  Button,
  Grid,
  Paper,
  ListItemText,

} from "@material-ui/core";
import SendIcon from '@mui/icons-material/Send';
import DraftsIcon from '@mui/icons-material/Drafts'
import StarBorder from '@mui/icons-material/StarBorder';
type FormElement = React.FormEvent<HTMLFormElement>;

interface ITodo {
  text: string;
  complete: boolean;
  comments: string[]
}
interface Comment {
  isOpen: boolean;
  index: number;
}

//JSX.Element: TS custom definition
function App(): JSX.Element {
  let Comment: Comment = {
    isOpen: false,
    index: 0,
  }
  const [value, setValue] = useState<string>('');
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [open, setOpen] = useState<Comment>(Comment);
  const [comment, setComment] = useState<string>('');

  const handleSubmit = (e: FormElement): void => {
    e.preventDefault();
    addTodo(value);
    setValue('');
  };

  const addTodo = (text: string): void => {
    const newTodos: ITodo[] = [...todos, { text, complete: false, comments: [] }];
    setTodos(newTodos);
  };


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

  const handleComment = (index: number, value: string) => {
    const newTodos: ITodo[] = [...todos]
    newTodos[index].comments.push(value)
    setTodos(newTodos)
  }
  return (
    <div className='App'>

      <h1>Todo List</h1>
      <Paper style={{ padding: 16 }}>

        <form onSubmit={handleSubmit}>
          <Grid
            container
            justify='center'
            alignItems="center"
            style={{ padding: 12 }}
            spacing={1}
          >
            <TextField
              type='text'
              value={value}
              onChange={e => setValue(e.target.value)}
              required
              label="Outlined"
              placeholder='Enter Task Here...'

            />
            <Button variant="contained" size="large" type='submit' className='button' color="primary">
              Add
            </Button>
          </Grid>
        </form>

      </Paper>
      <br />
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>

          <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', marginLeft: '300px' }}
            component='nav'
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                LIST
              </ListSubheader>
            }
          >
            {todos.map((todo: ITodo, index: number) => {
              return (
                <Fragment key={index}>
                  <ListItemButton>
                    <ListItemIcon>
                      <SendIcon />
                    </ListItemIcon>

                    <ListItemText
                      style={{ textDecoration: todo.complete ? 'line-through' : '' }}>
                      <strong> Task :</strong> {todo.text}
                    </ListItemText>
                  </ListItemButton>
                  <ListItemButton>

                    <ListItemIcon>
                      {todo.comments.length}<ChatBubbleOutline style={{ marginTop: '20px' }} />
                    </ListItemIcon>
                    <ListItemText> <strong>Comments:</strong>{todo.comments + ','}</ListItemText>

                  </ListItemButton>
                  <ListItemButton color='Primary' onClick={(): void => completeTodo(index)}>
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText> {todo.complete ? 'Incomplete' : 'Complete'}</ListItemText>

                  </ListItemButton>

                  <ListItemButton onClick={() => setOpen({ isOpen: !open.isOpen, index: index })}>
                    <ListItemIcon>
                      <DraftsIcon />
                    </ListItemIcon>
                    <ListItemText>Add Comment</ListItemText>
                  </ListItemButton>

                  <ListItemButton onClick={(): void => deleteTodo(index)}>
                    <ListItemIcon>
                      <DeleteForever sx={{ color: pink[500] }} />
                    </ListItemIcon>
                    <ListItemText>Delete</ListItemText>
                  </ListItemButton>
                  <Divider />
                </Fragment>
              );
            })}
          </List>
        </Grid>
        <Grid item xs={12} md={6}>
          {open.isOpen &&

            <form onSubmit={() => {
              handleComment(open.index, comment)
              setOpen({ ...open, isOpen: false })
            }}>

              <TextField
                type='text'
                value={comment}
                onChange={e => setComment(e.target.value)}
                required
                label="Outlined"
                placeholder='Enter Comment Here...'

              />
              <Button variant="contained" size="small" type='submit' className='button' color='secondary'>
                Add
              </Button>
            </form>}
        </Grid>
      </Grid>

    </div>


  );
}
export default App;
