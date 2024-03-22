import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import HistoryToggleOffOutlinedIcon from '@mui/icons-material/HistoryToggleOffOutlined';
import { LineChartApex } from "../../components/ApexChart/LineChartApex";
import { BarChartApex } from "../../components/ApexChart/BarChartApex";
import { useState, useContext } from "react";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import Control  from "../../components/Actuator/GaugeChart/Control";
import { UserContext } from "../../App";
import ControlPanel from "../../components/ControlPanel/ControlPanel";
import MultipleYAxis from "../../components/ApexChart/MixChartApex";
import { DatePicker } from "@mui/x-date-pickers";
import Chart from "../../data/Chart";
import {host} from "../../App";
import InformationTag from "../../components/InformationTag";
import { useLocation } from "react-router-dom"; 
import RoomMap from "../../components/RoomMap/RoomMap";
import FilterNode from "../../components/RoomMap/FilterNode";
import FilterParameter from "../../components/RoomMap/FilterParameter";
import AQI from "../../components/AQI";
import SetTimer from "../../components/Actuator/SetTimer";
import ActuatorStatus from "../../components/Actuator/ActuatorStatus";
import AqiRef from "../../components/AqiRef/AqiRef";
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
        {/* COntainer of Header Dashboard and onverall condition */}
        {/* <Container
        >
            <Grid
                container="true"
                spacing={0}
                style={{
                    display: "flex",
                    height: "100%",
                }}
                

            >
                <Grid
                    item="true"
                    xs={12}
                    sm={12}
                    md={4}
                    lg={4}
                >

                </Grid>
                <Grid
                    item="true"
                    xs={12}
                    sm={12}
                    md={12}
                    lg={4}
                    mt="20px"
                >
                    <Box display="flex" 
                        flexDirection="column" 
                        // justifyContent="center" 
                        alignItems="center"
                        mt="40px"
                    >
                        <Header title="Dashboard" fontSize="60px"/>
                    </Box>
                </Grid>

                <Grid
                    item="true"
                    xs={12}
                    sm={12}
                    md={4}
                    lg={4}
                >
                    <Box width="100%" 
                            // sx={{backgroundColor: colors.blueAccent[800]}} 
                            alignItems="center">
                                
                                <AQI room_id={room_id} callbackSetSignIn={callbackSetSignIn}/>

                        </Box>
                </Grid>
            </Grid>
        </Container> */}

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
                <Grid
                    p="10px"
                    xs={12}
                    sm={12}
                    md={12}
                    lg={4}
                    container="true"
                    // display="flex"
                    // direction="column"
                    // width="100%"
                    // height="100%"
                    // alignItems="center"
                    // justifyItems="center"

                    

                >
                    <Box 
                        sx={{boxShadow: 1,
                            borderRadius: '5px', 
                            backgroundColor: "white"}}
                        width="100%"
                        height="100%"
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        // justify="center"

                            justifyContent="center"
                    >
                            <AqiRef callbackSetSignIn={callbackSetSignIn} time_delay={60000}/>
                        </Box>

                    
                </Grid>
                {/* Container of everything except image of room, this is set to the most left */}
                <Grid
                    p="10px"
                    xs={12}
                    sm={12}
                    md={12}
                    lg={4}
                    container="true"
                    // display="flex"
                    // direction="column"
                    // width="100%"
                    // height="100%"
                    // alignItems="center"
                    // justifyItems="center"

                    

                >

                    {/* <Grid
                        container={true}
                        spacing={0}
                        style={{
                                display: "flex", 
                                height: "100%", 
                                // backgroundColor: "red"
                            }}

                    >
                        <Grid
                            item={true}
                            xs={12}
                            sm={12}
                            md={12}
                            lg={8}
                            alignItems="center"
                            justify="center"
                            spacing={0}
                            width="100%"
                            >
                            </Grid>

                    </Grid> */}
                    {/* Information */}
                    
                    {/* <Box
                        width="100%"
                        // ml="80px"
                        // mt="20px"
                        height="100%"
                        sx={{boxShadow: 1,
                            borderRadius: '5px', 
                            backgroundColor: "white"}}
                        display="flex"
                        alignItems="center"
                        justifyItems="center"    
                        > */}
                    <Box 
                        // sx={{boxShadow: 1,
                        //     borderRadius: '5px', 
                        //     backgroundColor: "white"}}
                        // width="100%"
                        // height="100%"
                        // display="flex"
                        // flexDirection="column"
                        // alignItems="center"
                        // justify="center"

                        //     justifyContent="center"
                        sx={{boxShadow: 1,
                            borderRadius: '5px', 
                            backgroundColor: "white"}}
                        width="100%"
                        height="100%"
                        // display="flex"
                        // flexDirection="column"
                        // alignItems="center"
                        // // justify="center"

                        //     justifyContent="center"
                    >

                        
                                <InformationTag url={apiInformationTag} 
                                    callbackSetSignIn={callbackSetSignIn} 
                                    time_delay={5000}
                                    room_id={room_id}
                                    setActuatorInfoOfRoom={setActuatorInfoOfRoom}/>
                                
                    </Box>
                    

                    {/* Controling */}
                    {/* <Box mt="20px"

                    >
                    
                        <Grid
                            container={true}
                            spacing={1}
                            // style={{display: "flex", height: "100%"}}
                        >
                                <Grid
                                paddingRight="10px"
                                    item={true}
                                    xs={12}
                                    sm={12}
                                    md={12}
                                    lg={12}
                                    display="flex"
                                    flexDirection="column"
                                    alignItems="center"
                                    justify="center"
                                    spacing={0}
                                    width="100%"
                                    
                                    // sx={{boxShadow: 1,
                                    //     borderRadius: '5px', 
                                    //     backgroundColor: "white"}}
                                    
                                    // sx={{backgroundColor: "blue"}}
                                >
                                    <Box 
                                        sx={{boxShadow: 1,
                                            borderRadius: '5px', 
                                            backgroundColor: "white"}}
                                        width="100%"
                                        height="100%"
                                        display="flex"
                                        flexDirection="column"
                                        alignItems="center"
                                        justify="center"
                                    >
                                        <Box mt="10px">
                                        <Header title="Control Panel" fontSize="20px"/>
                                        <ControlPanel/>
                                        </Box>
                                    </Box>

                                </Grid>
                                
                                  
                        </Grid>
                    </Box> */}

                </Grid>

                {/* Container of image */}
                <Grid 
                    p="10px"
                    xs={12}
                    sm={12}
                    md={12}
                    lg={4}
                    direction="column"
                    alignItems="center"
                    justify="center"
                    // style={{ height: "100%",}}
                    spacing={0}
                >
                    <Box 
                        sx={{boxShadow: 1,
                            borderRadius: '5px', 
                            backgroundColor: "white"}}
                        width="100%"
                        height="100%"
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

            </Grid>

            {/* COntainer of data option and charts */}
            {/* <Container maxWidth="xl"
            
            
                
            > */}


            <div>
                <Actuator 
                    room_id={room_id} 
                    callbackSetSignIn={callbackSetSignIn}
                    />
            </div>

            {/* Container of set timer */}
            {/* <Box 
                sx={{
                    marginTop: '20px',
                    boxShadow: 1,
                    borderRadius: '5px', 
                    backgroundColor: "white"}}
                    >
                <SetTimer room_id={room_id}/>
            </Box> */}
            

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
                
                {/* <Box
                    container={true}
                    display="flex"
                    direction="row"
                    justifyContent="center"
                >
                    <Box 
                        display="flex" 
                        justifyContent="center" 
                        alignItems="center"
                    >
                        
                        <Box>
                            <Header title="Start Time" fontSize="15px"/>
                            <DatePicker onChange={(new_value)=>{
                                                        setUnixTimestampStart(Date.parse(new_value)/1000);
                                                    }
                                                }
                            />
                        </Box>
                        <Box m={1} mt="5vh">
                        </Box>
                        <Box>
                            <Header title="End Time" fontSize="15px"/>
                            <DatePicker onChange={(new_value)=>{
                                                        setUnixTimestampEnd(Date.parse(new_value)/1000)
                                                    }
                                                }
                            />
                        </Box>
                    </Box>

                    <Box m={4}/>
                    <Box 
                        display="flex" 
                        justifyContent="center" 
                        alignItems="center"
                        mt="22px"
                        >
                            <Button
                                // sx={{
                                //     backgroundColor: colors.blueAccent[400],
                                //     color: colors.grey[100],
                                //     fontSize: "15px",
                                //     fontWeight: "bold",
                                //     padding: "8px 18px",
                                //     }}
                                sx={{
                                    backgroundColor: "black",
                                    fontSize: "14px",
                                    fontWeight: "bold",
                                    padding: "8px 18px",
                                    }}
                                variant="contained"
                                onClick={()=>{
                                    if(checkTimeOption(unixTimestampStart, unixTimestampEnd, 'year'))
                                    {
                                        setOptionData("year")
                                        setOptionChartData("year")
                                        console.log("Set option to Year")
                                        setApiHistoryChartState(`http://${backend_host}/api/v1.1/monitor/data/history?farm_id=1&time_start=${unixTimestampStart}&time_end=${unixTimestampEnd}&option=${optionChartData}`)
                                    }
                                    else
                                    {
                                        alert("Invalid optionnnnn!!!!!!")    
                                    }
                                }}
                            >
                                <HistoryToggleOffOutlinedIcon sx={{ mr: "10px" }} />
                                Year
                            </Button>                                    
                            <Box m={0.5} />
                            <Button
                                // sx={{
                                //     backgroundColor: colors.blueAccent[400],
                                //     color: colors.grey[100],
                                //     fontSize: "15px",
                                //     fontWeight: "bold",
                                //     padding: "8px 18px",
                                //     }}
                                sx={{
                                    backgroundColor: "black",
                                    fontSize: "14px",
                                    fontWeight: "bold",
                                    padding: "8px 18px",
                                    }}
                                variant="contained"
                                onClick={()=>{
                                    if(checkTimeOption(unixTimestampStart, unixTimestampEnd, 'month'))
                                    {
                                        setOptionData("month")
                                        setOptionChartData("month")
                                        console.log("SSSSSSSSSSSSSSSSset option to month")
                                        setApiHistoryChartState(`http://${backend_host}/api/v1.1/monitor/data/history?farm_id=1&time_start=${unixTimestampStart}&time_end=${unixTimestampEnd}&option=${optionChartData}`)
                                    }
                                    else
                                    {
                                        alert("Invalid optionnnnn!!!!!!")    
                                    }
                                }}
                            >
                                <HistoryToggleOffOutlinedIcon sx={{ mr: "10px" }} />
                                Month
                            </Button>
                            <Box m={0.5} />
                            <Button
                                // sx={{
                                //     backgroundColor: colors.blueAccent[400],
                                //     color: colors.grey[100],
                                //     fontSize: "15px",
                                //     fontWeight: "bold",
                                //     padding: "8px 18px" ,
                                //     }}
                                sx={{
                                    backgroundColor: "black",
                                    fontSize: "14px",
                                    fontWeight: "bold",
                                    padding: "8px 18px",
                                    }}
                                variant="contained"
                                onClick={async() => {
                                    if(checkTimeOption(unixTimestampStart, unixTimestampEnd, 'day'))
                                    {
                                        setOptionData("day")
                                        setOptionChartData("day")
                                        console.log("SSSSSSSSSSSSSSSSset option to day")
                                        setApiHistoryChartState(`http://${backend_host}/api/v1.1/monitor/data/history?farm_id=1&time_start=${unixTimestampStart}&time_end=${unixTimestampEnd}&option=${optionChartData}`)
                                    }
                                    else
                                    {
                                        alert("Invalid optionnnnn!!!!!!")    
                                    }
                                }}
                                    
                                    
                            >
                                <HistoryToggleOffOutlinedIcon sx={{ mr: "10px" }} />
                                Day
                            </Button>
                            <Box m={0.5} />
                            <Button
                                // sx={{
                                //     backgroundColor: colors.blueAccent[400],
                                //     color: colors.grey[100],
                                //     fontSize: "15px",
                                //     fontWeight: "bold",
                                //     padding: "8px 18px",
                                //     }}
                                sx={{
                                    backgroundColor: "black",
                                    fontSize: "14px",
                                    fontWeight: "bold",
                                    padding: "8px 18px",
                                    }}
                                variant="contained"
                                onClick={(e) =>
                                    {
                                        console.log("set option to now")
                                        setOptionChartData("now")
                                    }
                                }
                                    
                                    
                            >
                                <HistoryToggleOffOutlinedIcon sx={{ mr: "10px" }} />
                                Now
                            </Button>

                    
                    </Box>
                </Box> */}
                {/* End option chase back */}

                

                {/* Container of Chart */}
                <Grid
                   container={true}
                   spacing={0}
                   style={{display: "flex", height: "100%",}} 
                   mt="20px"
                   mb="30px"
                >
                    
                    <>
                            {
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

