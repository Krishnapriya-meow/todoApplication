import { Button, Grid, MenuItem, Paper, TextField } from "@material-ui/core"
import Select, { SelectChangeEvent} from "@mui/material/Select"
import { useState } from "react"
import { ICustomData } from "../models/todo"

interface  Iprops{ 
    handleCustom(custom:ICustomData): void,
}

export const CustomForm = (props:Iprops) => {
    let intialCustomData = {
        fieldName: '',
        fieldType: ''
    }
    const [Field, SetField] = useState <ICustomData>( intialCustomData)

    const handleChange = (event: SelectChangeEvent) => {
        SetField({...Field,fieldType:event.target.value });
      };

    return (
        <div>
            <form onSubmit={(e) =>{
                e.preventDefault()
                props.handleCustom(Field)
            }} >
                <Grid
                    container
                    style={{justifyContent:"center",padding:12}}
                    alignItems="center"
                    spacing={3}
                >
                    <TextField
                        type='text'
                        value={Field.fieldName}
                        onChange={(e: any) => SetField({ ...Field, fieldName: e.target.value })}
                        required
                        label="Field Name"
                        placeholder='Enter Name Here...'
                    />
                    <br/>
                    <Select
                        id="demo-simple-select"
                        value={Field.fieldType}
                        label="Field Type"
                        onChange={handleChange}
                         style={{minWidth:"30px"}}
                    >
                        <MenuItem value='string'>String</MenuItem>
                        <MenuItem value='number'>Number</MenuItem>
                        <MenuItem value='boolean'>Boolean</MenuItem>
                    </Select>
                    <Button variant="contained" size="large" type='submit' className='button' color='secondary'>
                        Add Custom Field
                    </Button>
                </Grid>
            </form>
        </div>
    )
}