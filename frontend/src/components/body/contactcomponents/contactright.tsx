import * as React from 'react';
import TextField from "@mui/material/TextField"
import Box from '@mui/material/Box'

var input_name = ['Name', 'Email', 'Subject']

export default function () {
    return (
        <div className="group_container">
            <Box
                component="form"
                sx={{ display: "grid", width: "100%", gap: 6 }}
            >{input_name.map((dt) => <TextField
                label={dt}
                variant="outlined"
                InputLabelProps={{
                    shrink: true,
                }}
            />)}
                <TextField
                    label="Message"
                    variant="outlined"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    multiline
                    rows={6}
                />
            </Box>
        </div>
    )
}