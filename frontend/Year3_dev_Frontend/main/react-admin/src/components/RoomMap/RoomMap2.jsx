import Header from "../Header";
import { Box, Grid } from "@mui/material";
import plan from "../../assets/plan.svg";
import plan_409 from "../../assets/409.svg";
import plan_410 from "../../assets/410.svg";
import plan_411 from "../../assets/411.svg";
import { host } from "../../App";
import { React, useState, useEffect, useRef } from "react";
import { styled } from "@mui/material";
import h337 from "heatmap.js";
import Node from "../Node2";
import HeatmapComponent from "./HeatmapComponent";

/**
 * @brief This component RoomMap will render out the image room with all node 
 *          sticks to it in real position according to the x and y axises provided
 *          in database backend.
 */
const RoomMap = ({room_id, callbackSetSignIn, backend_host}) => 
{
    const [imageWidth, setImageWidth] = useState(0);
    const boxRef = useRef(null);
    const [nodeData, setNodeData] = useState([]);
    const [nodeList, setNodeList] = useState(null);
    const [nodeFunction, setNodeFunction] = useState(null);
    
    /**
     * @brief nodePosition is an array of all node in this room with informations,
     *        the information will contains whether it is sensor or actuator, the positions
     *        of it according to the real size of the box it is gonna be rendered, which is    
     *        the "px" from left and the "px" from above.
     *        The image of the room will be positioned so that the main door will facing above,
     *        the left of the room will be the x_axis and the bottom of the room will be the y_axis.
     *        The array will be like:
     *        [{"node_id": ..., "function": ..., "node_left": ..., "node_above": ...}, ...]
     * 
     *  node_info -> sensor(array 7) -> x_axis, y_axis, node_id
     */
    const[isLoading, setIsLoading] = useState(false);
    const api_to_fetch = `http://${backend_host}/api/room/information_tag?room_id=${room_id}`;
    // const api_to_fetch_heatmap_data = `http://${backend_host}/api/room/kriging?room_id=${room_id}`;

    const dict_plan = {
        1: plan_409,
        2: plan_410,
        3: plan_409,
        4: plan_411,
    }
    const pic_resolution = {
        1: [321,351],
        2: [321,351],
        3: [321,351],
        4: [322,352],
    }

    const fetch_data_function = async (url, access_token) =>
    {
        const headers = 
        {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${access_token}`,
        }
        const option_fetch = 
        {
            "method": "GET",
            "headers": headers,
            "body": null,
        }

        let response;
        try
        {
            response = await fetch(url, option_fetch);
        }
        catch(err)
        {
            console.log("Error happend while getting data. Error: " + err);
        }
        if(response && response.status === 200)
        {   
            // const data_response = await response.json();
            console.log('YESYES');
            const data_response = [
                [1, 2, 3, 4],                               // node_id
                ['sensor', 'actuator', 'actuator', 'fan'],   // node_function
                [50, 100, 210, 420],                        // x_axis
                [200, 900, 700, 500],                       // y_axis
                [25.1, 26.2, 27.3, 28.4]                    // temp
            ];
            console.log(data_response);
            let newNodePosition = [];
            setNodeList(data_response[0]);
            setNodeFunction(data_response[1]);
            for (let i = 0; i < data_response[2].length; i++) {
                const newObj = {
                    x: data_response[2][i],
                    y: data_response[3][i],
                    value: data_response[4][i]
                };
                newNodePosition.push(newObj);
            }
            // [
            //     {x: x_axis, y: y_axis, value: temp},
            //     ...
            // ]
            setNodeData(newNodePosition);
            console.log(nodeData);
            console.log(nodeList);
            console.log(nodeFunction);
            setIsLoading(false);
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

    // const HeatmapComponent = ({ pic_src, pic_height, pic_width }) => {
    //     const HeatmapContainer = styled('div')({
    //         position: 'relative',
    //         width: `${pic_width}`,
    //         height: `${pic_height}`,
    //     });
            
    //     const HeatmapImg = styled('img')({
    //         width: '100%',
    //         height: '100%',
    //         objectFit: 'cover',
    //     });
            
    //     const HeatmapOverlay = styled('div')({
    //         position: 'absolute',
    //         top: 0,
    //         left: 0,
    //         width: '100%',
    //         height: '100%',
    //     });

    //     useEffect(() => {
    //         const heatmapInstance = h337.create({
    //             container: boxRef.current,
    //         });
            
    //         const data = {
    //             max: 60,
    //             data: nodeData,
    //         };
            
    //         heatmapInstance.setData(data);
    //     }, [nodeData]);
        
    //     return (
    //         <HeatmapContainer>
    //             <HeatmapImg src={pic_src} alt="Map view" />
    //                 <Node nodeData={nodeData} nodeList={nodeList} nodeFunction={nodeFunction}/>
    //             <HeatmapOverlay ref={boxRef} />
    //         </HeatmapContainer>
    //     );
    // }

    const sensorData = [
        { x: 200, y: 100, value: 16 },
        { x: 400, y: 200, value: 32 },
        { x: 300, y: 50, value: 24 },
        { x: 400, y: 100, value: 23 },
    ];
    
    useEffect(()=>{
        if(nodeData === null)            //!< this is for the total component always render the first time and then the next time will be setTimeOut
        {
            verify_and_get_data(fetch_data_function, callbackSetSignIn, host, api_to_fetch);
        }
        else
        {
            const timer = setTimeout(()=>{
                    verify_and_get_data(fetch_data_function, callbackSetSignIn, host, api_to_fetch); 
                }, 15000);
            return () => clearTimeout(timer);
        }
    },[]);

    return (
        <>
        {
            isLoading ? <h1>Loading...</h1> :
            <Grid container justifyContent='center'>
                <HeatmapComponent
                    sensorData={sensorData}
                    // pic_src={dict_plan[room_id]}
                    // pic_width={pic_resolution[room_id][0]}
                    // pic_height={pic_resolution[room_id][1]}
                />
            </Grid>
        }
        </>
    );
}


export default RoomMap;
