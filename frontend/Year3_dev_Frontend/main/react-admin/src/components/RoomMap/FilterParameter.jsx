import React from "react";
import { useState, useEffect, memo } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from '../../theme';

const FilterParameter = ({setParaFilter, apiInformatiionTag, callbackSetSignIn, backend_host, setIsLoadingChart}) => 
{
	const theme = useTheme();
    const colors = tokens(theme.palette.mode);
	const [paraState, setParaState] = useState(1)
	const handleChange = (event) => {
		setParaState(event.target.value);
		console.log(event.target.value);
		// setNodeIdFilter(event.target.value);
	};
    const para_filter_dict = [
        {index: 0, value: "all"}, 
        {index: 1, value: "temperature"}, 
        {index: 2, value: "humidity"}, 
        {index: 3, value: "co2"}, 
        {index: 4, value: "tvoc"},
        {index: 5, value: "light"},
        {index: 6, value: "dust"},
    ];

  return (
		<Box
			container="true"
			display="flex"
			flexDirection="row"
			alignItems="center"
		>
			<Box sx={{ minWidth: 100 }}
				
				>
				<FormControl
					fullWidth
				>
					<InputLabel id="demo-simple-select-label">Parameter</InputLabel>
					<Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={paraState}
                        label="Sensor Node"
                        onChange={handleChange}
					>
						{
							para_filter_dict.map((i)=>{
                                return (
                                    <MenuItem value={i.index}>{i.value}</MenuItem>
                                );		
							})
						}
					</Select>
				</FormControl>
			</Box>

			<Box m={1} />
			
			<Button
				// sx={{
				// 	backgroundColor: colors.blueAccent[400],
				// 	color: colors.grey[100],
				// 	fontSize: "15px",
				// 	fontWeight: "bold",
				// 	padding: "8px 18px",
				// 	}}
                sx={{
                    backgroundColor: "black",
                    fontSize: "14px",
                    fontWeight: "bold",
                    padding: "8px 18px",
                    }}
                variant="contained"
				onClick={()=>{
					setParaFilter(paraState);
					// setApi(`http://${backend_host}/api/get/daily_data/${id}`)
				}}
			>
				Submit
			</Button>
		</Box>
  );
}

export default React.memo(FilterParameter);