import Header from "./Header";
import { Box } from "@mui/material";
import plan from "../assets/plan.svg";
import {Button, useMediaQuery} from "@mui/material";
import { host } from "../App";
import { useState, useEffect, useRef } from "react";

export default function Node({node})
{
    const description = node["function"];
    const [popUp, setPopUp] = useState(false);
    return (
        <Button
            style={{position: "absolute", 
                    left: `${(node["node_left"] <= 50 ? node["node_left"] + 7 : node["node_left"] - 7)}%`,
                    top: `${(node["node_above"] <= 50 ? node["node_above"] : node["node_above"] - 7)}%`,  
                    transform: `translate(-${node["node_left"]}%, -${node["node_above"]}%)`,     //!< translate(left, top)
                    borderRadius: "50%", 
                    width: "50px", height: "60px", backgroundColor: node["function"] === "sensor" ? "red" : "orange", 
                    zIndex: 1, //!< this makes sure the button stays above the image 
                    fontSize: "30px",
                    border: "1px solid",
                }}
                onMouseOver={(e)=>
                    {
                        setPopUp(true);
                    }}
                onMouseOut={(e)=>
                    {
                        setPopUp(false);
                    }}
                
        >
            {
            popUp && (
                <div
                style={{
                    borderRadius: "0%",
                    display: "block",
                    position: "absolute",
                    top: "0px",
                    left: "0px",
                    padding: "10px",
                    backgroundColor: "#f1f1f1",
                    border: "1px solid #ccc",
                    zIndex: 2,
                    fontSize: "15px",
                    // width: "20px", height: "20px"
                }}
                >
                    {description}
                </div>
                )
            } 
                {node["node_id"]}
        </Button>
    )
}