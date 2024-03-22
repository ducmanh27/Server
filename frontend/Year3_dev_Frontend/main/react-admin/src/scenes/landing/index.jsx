import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import { LineChartApex } from "../../components/ApexChart/LineChartApex";
import { BarChartApex } from "../../components/ApexChart/BarChartApex";
import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DetailsIcon from '@mui/icons-material/Details';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import logo_lab from "../../assets/logo_lab.png";
import {host, UserContext} from "../../App";
import room1 from "../../assets/room1.png";
import plan from "../../assets/plan.svg";

import plan_409 from "../../assets/409.svg";
import plan_410 from "../../assets/410.svg";
import plan_411 from "../../assets/411.svg";


const Item = ({ title, to, icon, selected, setSelected }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
      <MenuItem
        active={selected === title}
        style={{
          color: colors.grey[100],
        }}
        onClick={() => setSelected(title)}
        icon={icon}
      >
        <Typography>{title}</Typography>
        <Link to={to}/>
      </MenuItem>
    );
  };

const Landing = () => {
    const callbackSetSignIn = useContext(UserContext);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    /** 
     * @brief state "room_data"
     *          room_data will be a list of dictionary that has a form like this 
     *          [{
     *               "name": `room ${room["id"]} ${room["construction_name"]}`,
     *               "image": image_room[`room_${room["id"]}_${room["construction_name"]}`],
     *               "room_id": room.id,
     *          }, ... ]
     *          When a button is clicked, it will also send the room information to that page. 
     */
    const [room_data, setRoom_data] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const image_room = 
    {
        1: plan_409,
        2: plan_410,
        3: plan_411,
        4: plan_409,
    }

    const backend_host = host;
    const api_room_data = `http://${backend_host}/api/room`;

    const get_room_data = async (url, access_token) => 
    {
        const headers = {
            'Content-Type':'application/json',
            "Authorization": `Bearer ${access_token}`
            };
        const option_room_data = {
            'method':'GET',
            "headers": headers,
            "body": null,
            };
        const response_room_data = await fetch(url, option_room_data);
        if(response_room_data.status === 200)   /*!< if the fetch is successful*/  
        {
            const response_room_data_json_dispatch = await response_room_data.json();
            if(response_room_data_json_dispatch) /*!< if there is data in response */
            {
                const new_room_data = [];
                const all_keys_in_response_room_data_json_dispatch = Object.keys(response_room_data_json_dispatch);
                all_keys_in_response_room_data_json_dispatch.forEach((each_key) => 
                {
                    response_room_data_json_dispatch[each_key].forEach((room) => 
                    {
                        const key = `room_${room["id"]}_${room["construction_name"]}`;
                        new_room_data.push({
                            "name": `room ${room["room_id"]} ${room["construction_name"]}`,
                            "image": image_room[room["room_id"]],
                            "room_id": room["room_id"],
                            "info": room["information"]
                        })
                    })
                })
                setRoom_data(new_room_data);    
                setIsLoading(false);
            }
            else
            {
                alert("No room data!");
            }
        }
        else
        {
            alert(`Can not call to server! Error code: ${response_room_data.status}`);
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




    useEffect(()=>{
        verify_and_get_data(get_room_data, callbackSetSignIn, backend_host, api_room_data);
    },[]);

    
    return (
        <Box m="20px">

            {/* HEADER */}
            <Container sx={{ py: 1 }} maxWidth="lg">
            {/* <Box mb="50px"> */}

                {/* <Box display="flex" justifyContent="center" alignItems="center">
                    <Header title="Dashboard" fontSize="60px"/>
                </Box> */}
                <Box display="flex" justifyContent="center" alignItems="center" >
                    
                    {/* <p sx={{
                        textAlignVertical: "center",
                        textAlign: "center"
                        }}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                        Tenetur saepe rem pariatur doloremque soluta consectetur enim? 
                        Optio accusantium quo quasi assumenda. 
                        Sed totam debitis quasi aspernatur voluptatibus, eum accusamus voluptatem!
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
                        Nostrum voluptates nobis id in, 
                        commodi repudiandae dolore eveniet deserunt ab quam 
                        voluptatem consectetur accusantium ducimus tenetur vero fugit voluptas amet sequi.
                    </p> */}

                    {/* <Box
                        sx={{
                            // position: 'relative',
                            // backgroundColor: 'grey.800',
                            // color: '#fff',
                            mb: 2,
                            boxShadow: 1,
                            borderRadius: '5px',
                            // backgroundImage: "logo_lab",
                        }}
                        >
                        {<img src={logo_lab} alt="NOT FOUND" />}

                    </Box> */}
                </Box>

                   {/* Readmore button  */}
                {/* <Box display="flex" justifyContent="center" alignItems="center">
                    <Link to="/about">
                                    <Button
                                        sx={{
                                        backgroundColor: colors.blueAccent[700],
                                        color: colors.grey[100],
                                        fontSize: "14px",
                                        fontWeight: "bold",
                                        padding: "10px 20px",
                                        }}
                                    >
                                        <DetailsIcon sx={{ mr: "10px" }} />
                                        Read more   
                                    </Button>
                    </Link> 
                </Box>   */}
            {/* </Box> */}
            </Container>
            {/* End HEADER */}


            {/* Body */}
            <main>
            <Container sx={{ py: 6 }} maxWidth="lg">    {/* This container is the most ouside*/}
                <Grid container spacing={5}>            {/* This Grid container is the one that make every child Grid inside in order*/}
                {
                    isLoading ? 
                    <h1>Loading...</h1>
                    :
                    <>
                    {
                    room_data.map((room) => (
                        // {/* This function return an array of Grid component*/}          
                        <Grid item key={room.name} xs={12} sm={12} 
                                md={
                                    (() => {
                                        const room_data_length = room_data.length;
                                        if(room_data_length === 1){return 12;}
                                        else if(room_data_length === 2){return 6;}
                                        else{return 4;}
                                    })()
                                }
                        >  
                        {/* xs=collum's width sm={16} md={4} */}
                            <Card
                            sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                            >
                            {/* <CardMedia
                                component="div"
                                sx={{
                                // 16:9
                                pt: '100%',
                                }}
                                height="100%"
                                image={room.image}
                            /> */}
                            <Box
                                container
                                display="flex"
                                flexDirection="row"
                                // alignItems="center"
                                justifyContent="center"
                                height="350px"
                                sx={{
                                    "object-fit": "cover",
                                    // backgroundColor: "blue",
                                }}
                                
                            >
                                <img src={room.image} alt="" />
                            </Box>
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography gutterBottom variant="h4" component="h2" sx={{fontWeight: "bold"}}>
                                    {room.name}
                                </Typography>
                                <Typography gutterBottom variant="h5" component="h3" sx={{fontWeight: 600}}>
                                    {room.info}
                                </Typography>
                                <Box display="flex" justifyContent="space-between">
                                    <Typography>
                                        Click the button below for more information!
                                    </Typography>
                                </Box>
                            </CardContent>
                            <CardActions>
                                <Link to="/landing/dashboard" 
                                    state= {room}
                                >
                                    <Button 
                                        size="small"
                                        sx={{
                                            backgroundColor: "black",
                                            color: "white",
                                            fontSize: "12px",
                                            fontWeight: "bold",
                                            padding: "5px 8px",
                                        }}
                                        >
                                        <DetailsIcon sx={{ mr: "10px" }} />
                                        Detail   
                                    </Button>
                                    {/* <Button size="small">View</Button>
                                    <Button size="small">Edit</Button> */}
                                </Link>
                            </CardActions>
                            </Card>
                        </Grid>
                    ))
                    }
                    </>
                }
                </Grid>
                </Container>
            </main>
            {/* End body */}

        </Box>
    )
}

export default Landing;