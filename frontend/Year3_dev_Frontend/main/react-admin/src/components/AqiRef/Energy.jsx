import { React, useEffect, useState } from "react";
import { Grid, Paper, Tooltip, Typography, useTheme } from "@mui/material";
import { host } from "../../App";

export default function Energy()
{
    return (
                <Grid container textAlign='center'>
                <Grid xs={12} sm={12} md={12} textAlign="center" columnSpacing={2}>
                    <Typography variant='h3' fontWeight="bold">
                        Energy Data
                    </Typography>
                </Grid>
                <Grid container spacing={1} margin={1}>
                    <Grid item xs={2}>
                        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <Paper style={{ flex: 1, backgroundColor: 'white', padding: '10px' }}>
                            <Grid container display="flex" flexDirection="column" justifyItems='center' textAlign='center'>
                                <Grid container item justifyContent='center' alignContent='center'>
                                    <Typography variant='h4'>Voltage</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant='h5'>num</Typography>
                                </Grid>
                            </Grid>
                        </Paper>
                        </div>
                    </Grid>
                    <Grid item xs={2}>
                        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <Paper style={{ flex: 1, backgroundColor: 'white', padding: '10px' }}>
                            <Grid container display="flex" flexDirection="column" justifyItems='center' textAlign='center'>
                                <Grid container item justifyContent='center' alignContent='center'>
                                    <Typography variant='h4'>Current</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant='h5'>num</Typography>
                                </Grid>
                            </Grid>
                        </Paper>
                        </div>
                    </Grid>
                    <Grid item xs={2}>
                        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <Paper style={{ flex: 1, backgroundColor: 'white', padding: '10px' }}>
                            <Grid container display="flex" flexDirection="column" justifyItems='center' textAlign='center'>
                                <Grid container item justifyContent='center' alignContent='center'>
                                    <Typography variant='h4'>Frequency</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant='h5'>num</Typography>
                                </Grid>
                            </Grid>
                        </Paper>
                        </div>
                    </Grid>
                    <Grid item xs={2}>
                        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <Paper style={{ flex: 1, backgroundColor: 'white', padding: '10px' }}>
                            <Grid container display="flex" flexDirection="column" justifyItems='center' textAlign='center'>
                                <Grid container item justifyContent='center' alignContent='center'>
                                    <Typography variant='h4'>Active power</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant='h5'>num</Typography>
                                </Grid>
                            </Grid>
                        </Paper>
                        </div>
                    </Grid>
                    <Grid item xs={2}>
                        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <Paper style={{ flex: 1, backgroundColor: 'white', padding: '10px' }}>
                            <Grid container display="flex" flexDirection="column" justifyItems='center' textAlign='center'>
                                <Grid container item justifyContent='center' alignContent='center'>
                                    <Typography variant='h4'>Power factor</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant='h5'>num</Typography>
                                </Grid>
                            </Grid>
                        </Paper>
                        </div>
                    </Grid>
                    <Grid item xs={2}>
                        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <Paper style={{ flex: 1, backgroundColor: 'white', padding: '10px' }}>
                            <Grid container display="flex" flexDirection="column" justifyItems='center' textAlign='center'>
                                <Grid container item justifyContent='center' alignContent='center'>
                                    <Typography variant='h4'>Active energy</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant='h5'>num</Typography>
                                </Grid>
                            </Grid>
                        </Paper>
                        </div>
                    </Grid>
                </Grid>
                <Grid xs={12} textAlign='center' spacing={1} margin={1}>
                    <Typography textAlign='center' variant='h5'>updated on xxx</Typography>
                </Grid>
            </Grid>
    );
}