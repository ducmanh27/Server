import React from "react";
import { useState, useEffect, memo } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from '../../theme';

const FilterParameter = ({setParaFilter}) => 
{
	const theme = useTheme();
    const colors = tokens(theme.palette.mode);
	const [paraState, setParaState] = useState(1)
	const handleChange = (event) => {
		setParaState(event.target.value);
		setParaFilter(paraState);
		// setNodeIdFilter(event.target.value);
	};
    const para_filter_dict = [
        {index: 0, value: "All"}, 
        {index: 1, value: "Temperature"}, 
        {index: 2, value: "Humidity"}, 
        {index: 3, value: "CO2"}, 
        {index: 4, value: "TVOC"},
        {index: 5, value: "Light"},
        {index: 6, value: "Dust"},
    ];

  return (
	<FormControl fullWidth style={{maxWidth: '150px'}} size='small'>
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
						<MenuItem disabled={i.index === 0 ? true : false} value={i.index}>{i.value}</MenuItem>
					);		
				})
			}
		</Select>
	</FormControl>
  );
}

export default React.memo(FilterParameter);