import React, { useEffect, useRef } from 'react';
import { styled } from '@mui/system';
import h337 from 'heatmap.js';
import Button from '@mui/material/Button';
import { AddCircleOutline } from '@mui/icons-material';
import plan_409 from "../../assets/409.svg";

const HeatmapContainer = styled('div')({
  position: 'relative',
  width: '321px',
  height: '351px',
  overflow: 'hidden'
});

const HeatmapImg = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

const HeatmapOverlay = styled('div')({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  overflow: 'hidden'
});

const SensorButton = styled(Button)({
  position: 'absolute',
  '& .MuiButton-startIcon': {
    position: 'relative',
  },
  '& .sensor-label': {
    position: 'absolute',
    top: '-6px',
    right: '-6px',
    backgroundColor: 'red',
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

// const sensorData = [
//   { x: 200, y: 100, value: 16 },
//   { x: 400, y: 200, value: 32 },
//   { x: 300, y: 50, value: 24 },
//   { x: 400, y: 100, value: 23 },
// ];

const HeatmapComponent = ({sensorData}) => {
  const heatmapRef = useRef(null);

  useEffect(() => {
    const heatmapInstance = h337.create({
      container: heatmapRef.current,
    });

    const data = {
      max: 60,
      data: sensorData,
    };

    heatmapInstance.setData(data);
  }, [sensorData]);

  return (
    <HeatmapContainer>
      <HeatmapImg src={plan_409} alt="Your Image" />
      <HeatmapOverlay ref={heatmapRef}>
        {sensorData.map((sensor, index) => (
          <SensorButton
            key={index}
            variant="contained"
            color="primary"
            style={{ top: `${(sensor.y / 351) * 100}%`, left: `${(sensor.x / 321) * 100}%` }} 
            startIcon={<AddCircleOutline />}
          >
            <span className="sensor-label">{index + 1}</span>
          </SensorButton>
        ))}
      </HeatmapOverlay>
    </HeatmapContainer>
  );
};

export default HeatmapComponent;