import {Button} from "@mui/material";
import SensorsIcon from '@mui/icons-material/Sensors';
import AirIcon from '@mui/icons-material/Air';
import {styled} from "@mui/material";

export default function Node({nodeData, nodeList, nodeFunction})
{
    const SensorButton = styled(Button)({
        position: 'absolute',
        '& .MuiButton-startIcon': {
            position: 'relative',
        },
        '& .sensor-label': {
            position: 'absolute',
            top: '-6px',
            right: '-6px',
            backgroundColor: (nodeFunction === 'sensor' ? 'red' : 'orange'),
            color: 'white',
            borderRadius: '50%',
            width: '18px',
            height: '18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '12px',
        },
    });

    return(
        <>
        {
            nodeData.map((value, index) => {
                return(
                    <SensorButton
                        key={index}
                        variant="contained"
                        color="primary"
                        style={{ top: value.y, left: value.x }}
                        startIcon={(nodeFunction === 'sensor') ? <SensorsIcon /> : <AirIcon />}
                    >
                        <span className="sensor-label">{nodeList[index]}</span>
                    </SensorButton>
                )
            })
        }
        </>
    )
}