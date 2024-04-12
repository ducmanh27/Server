import React, {useState} from "react"
import { Box } from "@mui/material"
import Grid from "@mui/material/Grid"
import {Button} from "@mui/material";

const SmallFilter = ({setNumberOfData, setDataChart, setIsLoading}) => 
{
    const array_filter = [{"name": "1D", "value": 1},
                        {"name": "1W", "value": 2},
                        {"name": "1M", "value": 3},
                        {"name": "6M", "value": 4},
                        {"name": "1Y", "value": 5},]
    let time  = new Date().toLocaleTimeString()

    const [ctime,setTime] = useState(time)
    const UpdateTime=()=>{
        time =  new Date().toLocaleTimeString()
        setTime(time)
    }
    setInterval(UpdateTime)
    return (
        <Grid
            xs={12}
            sm={12}
            md={12}
            lg={12}
            item
            style={{width: "100%"}}
        // backgroundColor={colors.primary[400]}
        >
            <Box
                container="true"
                display="flex" 
                flexDirection="row" 
                justifyContent="right"
                mb={-3}
            >
                <Box
                display="flex" 
                flexDirection="row" 
                justifyContent="center"
                alignItems="center"
                >
                    {
                        array_filter.map((i)=>{
                            return (
                                <Button
                                    sx={{
                                        // backgroundColor: "black",
                                        // padding: "5px 8px",
                                        "min-width": "30px",
                                        fontSize: "18px",
                                        fontWeight: "bold",
                                        }}
                                    value={i.value}
                                    onClick={(e)=>{
                                        setNumberOfData(e.target.value);
                                        // setDataChart({co2: null, hum: null, temp: null, tvoc: null, light: null});
                                        setIsLoading(true);
                                        }}
                                    >{i.name}
                                    </Button>
                            );
                        })
                    }
                
                    <Box m={1}/>
                    <Box
                    sx={{
                        fontSize: "20px",
                        fontWeight: 800,
                        }}>{ctime}
                    </Box>
                </Box>
            </Box>
        </Grid>
    );
}

export default SmallFilter;