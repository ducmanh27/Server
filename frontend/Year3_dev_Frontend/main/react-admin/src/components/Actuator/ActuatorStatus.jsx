import { useState, useEffect } from "react";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { host } from "../../App";
import { createContext } from "react";
import Slider from '@mui/material/Slider';
import Header from "../Header";


const ActuatorStatus = ({room_id, setActuatorStatus, callbackSetSignIn,
    node_id, actuatorStatus}) => 
{
    const [status, setStatus] = useState(null);
    const [speed, setSpeed] = useState(0);
    const url = `http://${host}/api/actuator_status?room_id=${room_id}&node_id=${node_id}`;
    const url_set_command = `http://${host}/api/actuator_command`;
    const [isLoading, setIsLoading] = useState(true);
    const [flip, setFlip] = useState(true);

    const get_status = async (url, access_token) => 
    {
        const headers = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${access_token}`,
        }
        const fetch_option = {
            "method": "GET",
            "headers": headers,
            "body": null,
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
            console.log("Error while getting actuator status! Error Code: " + err );
        }
        if(response.status == 200)
        {
            if(data_response["Response"]["speed"] > 0 || data_response["Response"]["temp"] > 0)
            {
                setStatus(1);
                let newActuatorStatus = actuatorStatus;
                newActuatorStatus[node_id] = 1;
                setActuatorStatus(newActuatorStatus);
                if(data_response["Response"]["speed"] > 0)
                {
                    setSpeed(data_response["Response"]["speed"]);
                }
                else if(data_response["Response"]["temp"] > 0)
                {
                    setSpeed(data_response["Response"]["temp"]);
                }
                console.log(status);
                setIsLoading(false);
            }
            else
            {
                setStatus(0);
                let newActuatorStatus = actuatorStatus;
                newActuatorStatus[node_id] = 0;
                setActuatorStatus(newActuatorStatus);
                setSpeed(0);
                console.log(status);
                setIsLoading(false);
            }
        }
        else
        {
            console.log("Some error happened with Backend!")
            setStatus(0);
            setIsLoading(false);
        }

    }

    const send_actuator_command = async (url, access_token, command) => 
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
              "power": command, 
              "temp": 25, 
              "start_time": -1, 
              "end_time": -1, 
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
            console.log("Error while getting actuator status! Error Code: " + err );
        }
        if(response.status == 200)
        {
            console.log("Result:" + data_response["Response"]);
            alert("Sent!");
        }
        else
        {
            console.log("Some error happened with Backend! Error: " + data_response["Response"])
        }

    }

    const verify_and_get_data = async (fetch_data_function, callbackSetSignIn, backend_host, url, command) => 
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
            const verify_refresh_token_API_endpoint = `http://${backend_host}/api/token/refresh`;
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
            if(url === url_set_command)
            {
                fetch_data_function(url, token["access_token"], command);
            }
            else
            {
                fetch_data_function(url, token["access_token"])
            }
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
                if(url === url_set_command)
                {
                    fetch_data_function(url, token["access_token"], command);
                }
                else
                {
                    fetch_data_function(url, token["access_token"])
                }
            }
            else
            {
                callbackSetSignIn(false);
            }
        }

    }



    setInterval(async () => verify_and_get_data(get_status, callbackSetSignIn, host, url), 10000);

    // useEffect(()=>{
    //     if(status === null)
    //     {
    //         verify_and_get_data(get_status, callbackSetSignIn, host, url);
    //     }
    //     else
    //     {
    //         const timer = setTimeout(()=>{
    //             verify_and_get_data(get_status, callbackSetSignIn, host, url);
    //         }, 2000);
    //         return () => clearTimeout(timer);
    //     }
    // });


    return (
        <>
        {
        isLoading ?
        <h1>Loading ...</h1>
        :
        <Box
            display = "flex"
            flexDirection= "row"
        >

        
            <Box
                display="flex" flexDirection="column" alignItems="center" justifyContent="center" 
                >
                    <Box
                        sx={{
                            width: '80px',
                            height: '80px',
                            borderRadius: '50%',
                            border: "solid 2px",
                            backgroundColor: status == 0 ? 'red' : "green",
                        }}
                        display="flex" flexDirection="row" alignItems="center" justifyContent="center"      
                    >
                        <h1>{status == 0 ? "Off" : "On"}</h1>
                    </Box>
                    <Box m="5px" />
                    {
                    status === 0 ?
                    <Button
                        sx={{
                            backgroundColor: "black",
                            fontSize: "14px",
                            fontWeight: "bold",
                            padding: "8px 18px",
                            
                            }}

                            
                        variant="contained"
                        onClick={
                            () => { 
                                verify_and_get_data(send_actuator_command, callbackSetSignIn, host, url_set_command, 1);
                            }
                        }
                    >
                        {/* <DownloadOutlinedIcon sx={{ mr: "10px" }} /> */}
                        Turn On
                    </Button>
                    :
                    <Button
                        sx={{
                            backgroundColor: "black",
                            fontSize: "14px",
                            fontWeight: "bold",
                            padding: "8px 18px",
                            }}
                        variant="contained"
                        onClick={() => { 
                            verify_and_get_data(send_actuator_command, callbackSetSignIn, host, url_set_command, 0);
                        }
                        }
                    >
                        {/* <DownloadOutlinedIcon sx={{ mr: "10px" }} /> */}
                        Turn off
                    </Button>
                    }
                </Box>

                <Box m="15px"/>

                <Box sx={{ height: 150 }}
                    display="flex"
                    flexDirection="row"
                    alignItems="center"
                >
                <Slider
                    sx={{
                    '& input[type="range"]': {
                        WebkitAppearance: 'slider-vertical',
                    },
                    }}
                    orientation="vertical"
                    defaultValue={speed}
                    aria-label="Temperature"
                    valueLabelDisplay="auto"
                    disabled
                    // onKeyDown={preventHorizontalKeyboardNavigation}
                />
                <Header title={`Speed/Temperature: ${speed}`} fontSize="15px"/>

                </Box>
            </Box>
        }
        </>
    );
}

export default ActuatorStatus;