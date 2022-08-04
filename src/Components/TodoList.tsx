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
import { ITodo, Comment } from '../models/todo';

interface IProps {

    todos: ITodo[],
    completeTodo(index: number): void,
    deleteTodo(index: number): void,
    setTodos(value: ITodo[]): void

}

export const TodoList = (props: IProps) => {

    let Comment: Comment = {

        isOpen: false,
        index: 0,

    }

    const [open, setOpen] = useState<Comment>(Comment);
    const [comment, setComment] = useState<string>('');

    const handleComment = (index: number, value: string) => {
        const newTodos: ITodo[] = [...props.todos]
        newTodos[index].comments.push(value)
        props.setTodos(newTodos)
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
                            LIST
                        </ListSubheader>
                    }
                >
                    {props.todos.map((todo: ITodo, index: number) => {
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
                                <ListItemButton color='Primary' onClick={(): void => props.completeTodo(index)}>
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

                                <ListItemButton onClick={(): void => props.deleteTodo(index)}>
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
    )
}