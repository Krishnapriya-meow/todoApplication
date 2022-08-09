import { DeleteForever, ChatBubbleOutline } from '@mui/icons-material';
import { Divider, List, ListItemButton, ListItemIcon, ListSubheader, Switch, TextField } from '@mui/material';
import { pink } from '@mui/material/colors';
import { Fragment, useState } from 'react';
import {
    Button,
    Grid,
    ListItemText,

} from "@material-ui/core";
import SendIcon from '@mui/icons-material/Send';
import DraftsIcon from '@mui/icons-material/Drafts'
import StarBorder from '@mui/icons-material/StarBorder';
import { ITodo, Comment } from '../models/todo';

interface IProps {
    todos: ITodo[],
    completeTodo(index: number): void,
    deleteTodo(index: number): void,
    setTodos(value: ITodo[]): void

}

export const TodoList = (props: IProps) => {
  
    const label = { inputProps: { 'aria-label': 'Switch demo' } };


    let Comment: Comment = {
        isOpen: false,
        index: 0,
    };

    const [open, setOpen] = useState<Comment>(Comment);
    const [custom, setCustom] = useState<Comment>(Comment)
    const [comment, setComment] = useState<string>('');
    const [field,setField] = useState<string>('')

    const handleComment = (index: number, value: string) => {
        const newTodos: ITodo[] = [...props.todos];
        newTodos[index].comments.push(value);
        props.setTodos(newTodos);
        setComment('');
    }

    const handleField = (index: number, value: any) => {
        const newTodos: ITodo[] = [...props.todos];
        if(newTodos[index].customData !== undefined)
        newTodos[index].fieldValue = value
        props.setTodos(newTodos);
        setField('');
          }

    return (

        <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
                <List
                    sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', marginLeft: '300px' }}
                    component='nav'
                    aria-labelledby="nested-list-subheader"
                    subheader={
                        <ListSubheader component="div" id="nested-list-subheader">
                            LIST OF TASK
                        </ListSubheader>
                    }
                >
                    {props.todos.length > 0 && props.todos.map((todo: ITodo, index: number) => {
                        return (
                            <div key={index} className='container'>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <SendIcon />
                                    </ListItemIcon>

                                    <ListItemText
                                        style={{ textDecoration: todo.complete ? 'line-through' : '' }}>
                                        <strong> Task :</strong> {todo.text}
                                    </ListItemText>
                                </ListItemButton>

                                <ListItemButton color='Primary' onClick={(): void => props.completeTodo(index)}>
                                    <ListItemIcon>
                                        <StarBorder />
                                    </ListItemIcon>
                                    <ListItemText> {todo.complete ? 'In Complete' : 'Complete'}</ListItemText>

                                </ListItemButton>

                                <ListItemButton onClick={() => setOpen({ isOpen: !open.isOpen, index: index })}>
                                    <ListItemIcon>
                                        <DraftsIcon />
                                    </ListItemIcon>
                                    <ListItemText>Add Comment</ListItemText>
                                </ListItemButton>
                                {open.isOpen && open.index === index &&

                                    <form onSubmit={() => {
                                        handleComment(open.index, comment)
                                        setOpen({ ...open, isOpen: false })
                                    }}>

                                        <TextField
                                            type='text'
                                            value={comment}
                                            onChange={e => setComment(e.target.value)}
                                            required
                                            label="Comment"
                                            placeholder='Enter Comment Here...'

                                        />
                                        <Button variant="contained" size="small" type='submit' className='button' color='secondary'>
                                            Add
                                        </Button>
                                    </form>}
                                <ListItemButton>

                                    <ListItemIcon>
                                        {todo.comments.length}<ChatBubbleOutline className='icon' />
                                    </ListItemIcon>
                                    <ListItemText> <strong>Comments:</strong>{todo.comments.length > 0 ? todo.comments + ',' : ' -'}</ListItemText>

                                </ListItemButton>
                                <ListItemButton onClick={(): void => props.deleteTodo(index)}>
                                    <ListItemIcon>
                                        <DeleteForever sx={{ color: pink[500] }} />
                                    </ListItemIcon>
                                    <ListItemText>Delete</ListItemText>
                                </ListItemButton>
                                <ListItemButton onClick={() => setCustom({ isOpen: !custom.isOpen, index: index })}>
                                    <ListItemIcon>
                                        <SendIcon />
                                    </ListItemIcon>
                                    <ListItemText>
                                        <strong>{todo.customData?.fieldName} </strong> {(todo.fieldValue )?':'+ todo.fieldValue:'-'}
                                    </ListItemText>
                                </ListItemButton>
                                {custom.isOpen && custom.index === index &&

                                    <form onSubmit={() => {
                                        handleField(custom.index, field)
                                        setCustom({ ...custom, isOpen: false })
                                    }}>
                                       {todo.customData?.fieldType === 'string'?(<Switch {...label} onChange={e => setField(e.target.value)} />):(
                                        <TextField
                                            type={todo.customData?.fieldType}
                                            value={field}
                                            onChange={e => setField(e.target.value)}
                                            required
                                            label="Field"
                                            placeholder='Enter Field Here...'

                                        />)}
                                        <Button variant="contained" size="small" type='submit' className='button' color='secondary'>
                                            Add Value
                                        </Button>
                                    </form>}
                                <Divider />
                            </div>
                        );
                    })}
                </List>
            </Grid>
            <Grid item xs={12} md={6}>

            </Grid>
        </Grid>
    )
}
