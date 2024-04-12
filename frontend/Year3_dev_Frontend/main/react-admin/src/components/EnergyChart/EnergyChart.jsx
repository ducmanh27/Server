import React, { useState } from "react";
import { Grid, Typography, Stack, Button } from "@mui/material";
import { VictoryBar, VictoryChart, VictoryTheme, VictoryAxis, VictoryTooltip, Flyout } from "victory";

const EnergyChart = () => {
    const energyData = {
        "month": [
            "Jan 2023", "Feb 2023", "Mar 2023", "Apr 2023", "May 2023", "Jun 2023",
            "Jul 2023", "Aug 2023", "Sep 2023", "Oct 2023", "Nov 2023", "Dec 2023",
            "Jan 2024", "Feb 2024", "Mar 2024", "Apr 2024", "May 2024", "Jun 2024",
            "Jul 2024", "Aug 2024", "Sep 2024", "Oct 2024", "Nov 2024", "Dec 2024"
        ],
        "active_energy": [
            1324, 5678, 9012, 3456, 7890, 2345, 6789, 8901, 4567, 8901, 1234, 5678,
            9012, 3456, 7890, 2345, 6789, 8901, 4567, 8901, 1234, 5678, 9012, 3456
        ],
        "label": 'Total energy comsumed per month',
    }
    
    function getChartEnergyData() {
        const data = [];
        energyData["month"].forEach((month, index) => {
            let energy = energyData["active_energy"][index];
            if (energyData[index] === 'No data') energy = -1;
            data.push({ x: month, y: energy, y0: 0, label:`${month}\nEnergy: ${energy}kWh` });
        });
        return data;
    }
    const chartEnergyData = getChartEnergyData();

    const powerData = {
        'hour': [
            "1 am", "2 am", "3 am", "4 am", "5 am", "6 am", "7 am", "8 am", "9 am", "10 am", "11 am", "12 am",
            "1 pm", "2 pm", "3 pm", "4 pm", "5 pm", "6 pm", "7 pm", "8 pm", "9 pm", "10 pm", "11 pm", "12 pm"
        ],
        'active_power': [
            458, 512, 367, 782, 644, 734, 896, 921, 875, 699, 543, 456,
            789, 643, 765, 943, 732, 512, 684, 876, 921, 764, 598, 421
        ],
        'label': 'Average power'
    }
    function getChartPowerData() {
        const data = [];
        powerData["hour"].forEach((hour, index) => {
            let power = powerData['active_power'][index];
            if (powerData[index] === 'No data') power = -1;
            data.push({ x: hour, y: power, y0: 0, label:`${hour}\nEnergy: ${power}kWh` });
        });
        return data;
    }
    const array_filter = [
        {"name": "1D", "value": 1},
        {"name": "1W", "value": 2},
        {"name": "1M", "value": 3},
        {"name": "6M", "value": 4},
        {"name": "1Y", "value": 5},
    ]
    const chartPowerData = getChartPowerData();
    const [chartLabel, setChartLabel] = useState(energyData['label'])
    const [chartDataY, setChartDataY] = useState(energyData['active_energy'])
    const [chartDataX, setChartDataX] = useState(energyData['month'])

    return (
        <Grid container textAlign='center' justifyContent='center'>
        <Grid container display='flex' flexDirection='column' justifyContent='center' xs={12} marginY={1}>
            <Grid item>
                <Typography component='span' textAlign='center' fontSize='20px' color='black'>
                    Total energy comsumed per month
                </Typography>
            </Grid>
            <Grid item marginX={4}>
                <Stack justifyContent='space-between' alignItems='center' direction='row'>
                    <Stack spacing={1} direction='row' >
                        <Button size="small" sx={{
                                    "min-width": "30px",
                                    fontSize: "18px",
                                    fontWeight: "bold",
                                }}
                                variant='outlined'>
                            Energy
                        </Button>
                        <Button size="small" sx={{
                                    "min-width": "30px",
                                    fontSize: "18px",
                                    fontWeight: "bold",
                                }}
                                variant='outlined'>
                            Power
                        </Button>
                    </Stack>
                    <Stack direction='row' justifyContent='flex-end' pr={2} spacing={1}>
                    {array_filter.map((i)=>{
                        return (
                            <Button
                                sx={{
                                    "min-width": "30px",
                                    fontSize: "18px",
                                    fontWeight: "bold",
                                }}
                                size="small"
                                value={i.value}
                                variant='outlined'
                                // onClick={(e)=>{
                                //     setNumberOfData(e.target.value);
                                //     setIsLoading(true);
                                //     }}
                                >{i.name}
                            </Button>
                        );
                    })}
                </Stack>
                </Stack>
            </Grid>
        </Grid>
        <Grid style={{ width: '100%'}}>
        <VictoryChart
           theme={VictoryTheme.material}
           height={50}
           padding={{left: 20, right: 20, bottom: 12}}
           domain={{y: [0, Math.max(...energyData['active_energy'])]}}
       >
           <VictoryAxis  
               fixLabelOverlap={true}  
               // tickValues specifies both the number of ticks and where
               // they are placed on the axis
               dependentAxis={false}       //x-axis
               tickLength={0}
               gridComponent={<></>}
               style={{
                   data: { width: 10 },
                   labels: { padding: 20 },
                   axis: { stroke: "black" },
                   ticks: { stroke: "black", size: 0},
                   tickLabels: {fontSize: 4, padding: 3} //size of label of x-axis value and position of them
               }}
               tickCount={2}
           />
           <VictoryAxis
               fixLabelOverlap={false}  
               dependentAxis={true}   //y_axis
               gridComponent={<></>}
               style={{
                   axis: { stroke: "black" },
                   ticks: { stroke: "black", size: 0},
                   tickLabels: { fontSize: 4, padding: 3}       //size of label of y-axis value, padding: position of them
               }}
               tickCount={4}  //number of label on y-axis
           />
           <VictoryBar
               labelComponent=
               {<VictoryTooltip 
                   style={{fontSize: '2.7px', lineHeight: 1}}
                   cornerRadius={1}
                   pointerLength={0}
                   flyoutStyle={{
                       strokeWidth: 0.1,
                   }}
                   flyoutComponent={
                       <Flyout 
                           height={10}
                           width={30}
                       />
                   }
               />}
               alignment="start"
               style={{ data: { fill: "#c43a31"} }}
               data={chartEnergyData}
               barWidth={10}
               events={[{
               target: "data",
               eventHandlers: {
                   onMouseOver: () => {
                   return [
                       {
                       target: "data",
                       mutation: () => ({style: {fill: "red"}})
                       }, {
                       target: "labels",
                       mutation: () => ({ active: true })
                       }
                   ];
                   },
                   onMouseOut: () => {
                   return [
                       {
                       target: "data",
                       mutation: () => {}
                       }, {
                       target: "labels",
                       mutation: () => ({ active: false })
                       }
                   ];
                   }
               }
               }]}
           />
        </VictoryChart>
        </Grid>
        </Grid>
    )
}

export default EnergyChart;
