import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useState, useContext } from "react";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Energy from "../../components/AqiRef/Energy";

import Control  from "../../components/Actuator/GaugeChart/Control";
import { UserContext } from "../../App";
import ControlPanel from "../../components/ControlPanel/ControlPanel";
import MultipleYAxis from "../../components/ApexChart/MixChartApex";
import { DatePicker } from "@mui/x-date-pickers";
import Chart from "../../data/Chart";
import {host} from "../../App";
import InformationTag from "../../components/InformationTag2";
import { useLocation } from "react-router-dom"; 
import RoomMap from "../../components/RoomMap/RoomMap";
import FilterNode from "../../components/RoomMap/FilterNode";
import FilterParameter from "../../components/RoomMap/FilterParameter";
import AQI from "../../components/AQI";
import SetTimer from "../../components/Actuator/SetTimer";
import ActuatorStatus from "../../components/Actuator/ActuatorStatus";
import AqiRef from "../../components/AqiRef/AqiRef2";
import Actuator from "../../components/Actuator/Actuator";

const Dashboard = () => {
    const backend_host = host;
    const location = useLocation(); /*!< This is used to get the "state" component that is passed into <Link> */
    const data_passed_from_landingpage = location.state;
    let room_id = data_passed_from_landingpage == null ? 1 : data_passed_from_landingpage.room_id
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const callbackSetSignIn = useContext(UserContext);
    const [id, setId] = useState(1);
    const [optionData, setOptionData] = useState("now");        //change option to show different Chart
    const [optionChartData, setOptionChartData] = useState("now")
    const [unixTimestampStart, setUnixTimestampStart] = useState(0);
    const [unixTimestampEnd, setUnixTimestampEnd] = useState(0);
    const apiRealtimeChart = `http://${backend_host}/api/v1.1/monitor/data?room_id=${room_id}`; 

    // const apiHistoryChart = `http://${backend_host}/api/v1.1/monitor/data/history?room_id=${room_id}&node_id=${nodeIdFilter}&time_start=${unixTimestampStart}&time_end=${unixTimestampEnd}&option=${optionChartData}`;
    // const [apiHistoryChartState, setApiHistoryChartState] = useState(apiHistoryChart);
    const apiInformationTag = `http://${backend_host}/api/room/information_tag?room_id=${room_id}`;
    const [actuatorStatus, setActuatorStatus] = useState(0);
    const [actuatorInfoOfRoom, setActuatorInfoOfRoom] = useState([]);
    
    const checkUndefined = (object) => 
    {
        if(object === null)
        {
            return false;
        }
        let buffer = [];
        for(let i of Object.keys(object))
        {   
            buffer.push(object.i);
        }
        if(buffer.every((j) => {return (j === undefined)})){
            return false;
        }  
        else{
            return true;
        }
    }
    
    const checkTimeOption = (time_start, time_end, option) => 
    {
        console.log(time_start);
        console.log(time_end);
        if(option === 'day')
        {
            if(time_start === time_end)
            {
                return true;
            }
            return false;
        }
        else if(option === 'month')
        {
            if(Math.round((time_end - time_start)/(3600*24)) >= 30)
            {
                return true;
            }
            return false;
        }
        else if(option === 'year')
        {
            if(Math.round((time_end - time_start)/(3600*24*31)) >= 12)
            {
                return true;
            }
            return false;
        }
        else
        {
            return false;
        }
    }
    
    return (
    <>
    <Box 
        component="main"
        sx={{
            flexGrow: 1,
            // py: 8
        }}
        m="10px"
    >
        <Box m={4}/>
        {/* Container of all componment */}
        <Container 
            maxWidth="xl"
        >
        {/* <Box> */}
            {/* Container of Information, overall quality, controlling, image of room  */}
            <Grid
                container
                alignItems="stretch"
                spacing={0}
                style={{
                        display: "flex", 
                        height: "100%", 
                        // backgroundColor: "red"
                    }}
            >
                <Grid p="10px" xs={12} sm={12} md={12} lg={4} container="true">
                    <Box 
                        sx={{boxShadow: 1,
                            borderRadius: '5px', 
                            backgroundColor: "white"}}
                        width="100%"
                        height="100%"
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <AqiRef callbackSetSignIn={callbackSetSignIn} time_delay={60000}/>
                    </Box>
                </Grid>
                {/* Container of everything except image of room, this is set to the most left */}
                <Grid p="10px" xs={12} sm={12} md={12} lg={4} container="true">
                    <Box 
                        sx={{boxShadow: 1,
                            borderRadius: '5px', 
                            backgroundColor: "white"}}
                        width="100%"
                        height="100%"
                        alignContent="center"
                    >   
                        <InformationTag 
                            url={apiInformationTag} 
                            callbackSetSignIn={callbackSetSignIn} 
                            time_delay={5000}
                            room_id={room_id}
                            setActuatorInfoOfRoom={setActuatorInfoOfRoom}
                        />
                    </Box>
                </Grid>

                {/* Container of image */}
                <Grid p="10px" xs={12} sm={12} md={12} lg={4}
                    direction="column"
                    alignItems="center"
                    justify="center"
                    spacing={0}
                >
                    <Box 
                        sx={{boxShadow: 1,
                            borderRadius: '5px', 
                            backgroundColor: "white"}}
                        width="100%" height="100%"
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justify="center"
                    >
                        <Header title="Map view" fontSize="20px"/>
                        <RoomMap 
                            room_id={room_id} callbackSetSignIn={callbackSetSignIn}
                        />
                    </Box>
                </Grid>
                <Grid xs={12} sm={12} md={12} lg={12}>
                    <Energy />
                </Grid>

            </Grid>

            {/* COntainer of data option and charts */}
            {/* <Container maxWidth="xl"> */}
            <div>
                <Actuator 
                    room_id={room_id} 
                    callbackSetSignIn={callbackSetSignIn}
                />
            </div>

            <Box 
            sx={{
                p: "20px",
                marginTop: '10px',
                boxShadow: 1,
                borderRadius: '5px', 
                backgroundColor: "white"}}
                >

                <Box
                p="2px"
                m="10px"
                >
                {/* Container of Chart */}
                <Grid
                   container={true}
                   spacing={0}
                   style={{display: "flex", height: "100%",}} 
                   mt="20px"
                   mb="30px"
                >
                    
                    <>
                        {   // bo phan optionChartData
                            optionChartData === "now" ?
                            <Chart 
                                    room_id={room_id}
                                    callbackSetSignIn={callbackSetSignIn} 
                                    timedelay={1000} 
                                    optionData={optionChartData}
                                    apiInformationTag={apiInformationTag}
                            />
                            :
                            <Chart 
                                    room_id={room_id} 
                                    callbackSetSignIn={callbackSetSignIn} 
                                    timedelay={0} 
                                    optionData={optionChartData}
                                    apiInformationTag={apiInformationTag}
                            />
                        }
                    </>
                </Grid>

                </Box>
            {/* </Box> */}
            {/* </Container> */}
                                    
            </Box>
                
        </Container>    
    </Box>
    </>
    );
}

export default Dashboard;

