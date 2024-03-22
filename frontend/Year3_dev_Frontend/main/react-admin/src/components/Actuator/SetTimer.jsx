import { useState, useEffect } from "react";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { host } from "../../App";
import Grid from "@mui/material";
import TextField from "@mui/material/TextField";
import Header from "../Header";

const SetTimer = ({actuatorStatus,
    room_id,
    callbackSetSignIn,
    node_id,}) => 
{
    console.log("HERE");
    console.log(actuatorStatus);
    console.log(actuatorStatus[node_id]);
    const [startTimeInSetTimer, setStartTimeInSetTimer] = useState(null);
    const [endTimeInSetTimer, setEndTimeInSetTimer] = useState(null);
    // const [temperature, setTemperature] = useState(0);

    const url = `http://${host}/api/actuator_command`;


    const setActuatorCommandFunction = async (url, access_token) => 
    {
        const headers = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${access_token}`,
        }
        const data = { 
            "operator": 1, 
            "info": { 
              "room_id": room_id, 
              "node_id": node_id, 
              "power": null, 
              "temp": null, 
              "start_time": startTimeInSetTimer, 
              "end_time": endTimeInSetTimer, 
            } 
          } 
        const fetch_option = {
            "method": "POST",
            "headers": headers,
            "body": JSON.stringify(data),
        };
        let response;
        let data_response;
        try
        {
            response = await fetch(url, fetch_option);
            data_response = await response.json();
        }
        catch(err)
        {
            console.log("Error while setting actuator timer! Error Code: " + err );
        }
        if(response.status == 200)
        {
            alert("Successfully set timer!")
        }
        else
        {
            console.log("Some error happened with Backend! Error: " + data_response["Response"])
        }

    }

    const verify_and_get_data = async (fetch_data_function, callbackSetSignIn, backend_host, url) => 
    {

        const token = {access_token: null, refresh_token: null}
        // const backend_host = host;
        if(localStorage.getItem("access") !== null && localStorage.getItem("refresh") !== null)
        {
            token.access_token = localStorage.getItem("access"); 
            token.refresh_token = localStorage.getItem("refresh");
        }
        else
        {
            throw new Error("There is no access token and refresh token ....");
        }

        const verifyAccessToken  = async () =>
        {
            //call the API to verify access-token
            const verify_access_token_API_endpoint = `http://${backend_host}/api/token/verify`
            const verify_access_token_API_data = 
            {
                "token": token.access_token,
            }
            const verify_access_token_API_option = 
            {
                "method": "POST",
                "headers": 
                {
                    "Content-Type": "application/json",
                },
                "body": JSON.stringify(verify_access_token_API_data),

            }
            const verify_access_token_API_response = await fetch(verify_access_token_API_endpoint, 
                                                                verify_access_token_API_option,);
            if(verify_access_token_API_response.status !== 200)
            {
                return false;
            }
            return true;
        }

        /*
        *brief: this function is to verify the refresh-token and refresh the access-token if the refresh-token is still valid
        */
        const verifyRefreshToken  = async () =>
        {
            //call the API to verify access-token
            const verify_refresh_token_API_endpoint = `http://${backend_host}/api/token/refresh`
            const verify_refresh_token_API_data = 
            {
                "refresh": token.refresh_token,
            }
            const verify_refresh_token_API_option = 
            {
                "method": "POST",
                "headers": 
                {
                    "Content-Type": "application/json",
                },
                "body": JSON.stringify(verify_refresh_token_API_data),

            }
            const verify_refresh_token_API_response = await fetch(verify_refresh_token_API_endpoint, 
                                                                    verify_refresh_token_API_option,);
            const verify_refresh_token_API_response_data = await verify_refresh_token_API_response.json();
            if(verify_refresh_token_API_response.status !== 200)
            {
                return false;
            }
            else if(verify_refresh_token_API_response.status === 200 &&  verify_refresh_token_API_response_data.hasOwnProperty("access"))
            {
                localStorage.setItem("access", verify_refresh_token_API_response_data["access"]);
                localStorage.setItem("refresh", verify_refresh_token_API_response_data["refresh"]);
                return true
            }
            else
            {
                throw new Error("Can not get new access token ....");
            }
        }

        const  verifyAccessToken_response = await verifyAccessToken();

        if(verifyAccessToken_response === true)
        {
            // const response = await fetch(url)
            // const data = await response.json()
            fetch_data_function(url, token["access_token"])
        }
        else
        {
            let verifyRefreshToken_response = null;
            try
            {
                verifyRefreshToken_response = await verifyRefreshToken();
            }
            catch(err)
            {
                alert(err);
            }
            if(verifyRefreshToken_response === true)
            {
                fetch_data_function(url, token["access_token"]);
            }
            else
            {
                callbackSetSignIn(false);
            }
        }

    }
    

    return (

    <Box
        // display="flex" flexDirection="row" alignItems="center" justifyContent="space-between" 
        width="100%"
        height="100%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
    >    
        <Box
            // display="flex" flexDirection="row" alignItems="center" justifyContent="space-between" 
            width="100%"
            height="100%"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
        >

            <Header title="Air-conditioning start timer:" fontSize="20px"/>

            <Box
            display="flex" flexDirection="row" alignItems="center" justifyContent="space-between" 
            // gap="30px"
            // width="100%"
            // height="100%"
            // display="flex"
            // flexDirection="column"
            // alignItems="center"
            // justifyContent="center"
            >
                <MobileDateTimePicker onChange={(new_value)=>{
                                            setStartTimeInSetTimer(Date.parse(new_value)/1000 + 7*60*60);
                                        }
                                    }
                />
                    <Box m="25px" />
                    {
                    actuatorStatus[node_id] === 0 ?
                    <Button
                        sx={{
                            backgroundColor: "black",
                            fontSize: "14px",
                            fontWeight: "bold",
                            padding: "8px 18px",
                            }}
                        variant="contained"
                        onClick={()=>{
                            if(startTimeInSetTimer <= (new Date()).getTime()/1000 + 7*60*60 + 1*60)
                            {
                                alert("Start time is not valid! Only accept time 1 minute at least beyond current time!");
                            }
                            else
                            {
                                verify_and_get_data(setActuatorCommandFunction, callbackSetSignIn, host, url);
                                alert("Start timer accepted!")
                            }
                        }}
                    >
                        Submit
                    </Button>
                    :
                    <h3>Actuator is ON</h3>
                    }
            </Box>
            <Box m="10px"/>
            {/* <Box>
                <Box
                    mb="5px"
                    sx={{
                        fontSize: "18px",
                        fontWeight: 600,
                        }}
                > Temperature
                </Box>
                <TextField
                    required
                    id="temperature"
                    name="temperature"
                    label="Temperature"
                    fullWidth
                    autoComplete="temperature"
                    variant="outlined"
                    // value={dataCreateNode.x_axis}
                    onInput={(e)=>{e.target.value = e.target.value.replace(/[^0-9]/g, '')}}
                    onChange={(e)=>setTemperature(e.target.value)}
                />
            </Box> */}

            <Box m="10px"/>
            
        </Box>

        <Box
            // display="flex" flexDirection="row" alignItems="center" justifyContent="space-between" 
            width="100%"
            height="100%"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
        >

            <Header title="Air-conditioning end timer:" fontSize="20px"/>

            <Box
                display="flex" flexDirection="row" alignItems="center" justifyContent="space-between" 
            >
                <MobileDateTimePicker onChange={(new_value)=>{
                                            setEndTimeInSetTimer(Date.parse(new_value)/1000 + 7*60*60);
                                        }
                                    }
                />

                <Box m="10px"/>
                
                {
                    actuatorStatus[node_id] === 1 ?
                    <Button
                        sx={{
                            backgroundColor: "black",
                            fontSize: "14px",
                            fontWeight: "bold",
                            padding: "8px 18px",
                            }}
                        variant="contained"
                        onClick={()=>{
                            if(endTimeInSetTimer <= (new Date()).getTime()/1000 + 7*60*60 + 1*60)
                            {
                                alert("End time is not valid! Only accept time 1 minute at least beyond current time!");
                            }
                            else
                            {
                                verify_and_get_data(setActuatorCommandFunction, callbackSetSignIn, host, url);
                                alert("End timer accepted!");
                            }
                        }}
                    >
                        Submit
                    </Button>
                    :
                    <h3>Actuator is OFF</h3>
                }
            </Box>
            
        </Box>
    </Box>    
    );
}

export default SetTimer;