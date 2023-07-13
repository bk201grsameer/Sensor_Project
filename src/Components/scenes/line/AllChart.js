import { useTheme } from '@emotion/react';
import React from 'react';
import { tokens } from '../../../theme';
import { mockLineData } from '../../../data/mockData';
import { ResponsiveLine } from '@nivo/line';
import { Box, Skeleton, Typography } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios';
import { useEffect } from 'react';


const AllChart = ({ isCustomLineColors = false, isDashboard = false }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [id, setId] = React.useState(10);
    const [data, setData] = React.useState([]);
    const handleChange = (event) => {
        console.log(event.target.value);
        setId(event.target.value);
    };

    const fetch_Data = async (id) => {
        try {
            const { data } = await axios.get(`http://localhost:8000/api/chart/emailchart/${id}`);
            console.log(data);
            if (data.status === true)
                setData(data.message);
            //     setData(data.message);
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        fetch_Data(id / 10);
    }, [id]);
    return (
        <>
            <Box ml='30px'>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Chart</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={id}
                        label="Chart"
                        onChange={handleChange}
                    >
                        <MenuItem value={10}>Email Variations</MenuItem>
                        <MenuItem value={20}>Distance Variations</MenuItem>
                        <MenuItem value={30}>Humidity Variations</MenuItem>
                        <MenuItem value={40}>Temperature Variations</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            {
                data.length !== 0 ?
                    <ResponsiveLine
                        data={data}
                        theme={{
                            axis: {
                                domain: {
                                    line: {
                                        stroke: colors.grey[100],
                                    },
                                },
                                legend: {
                                    text: {
                                        fill: colors.grey[100],
                                    },
                                },
                                ticks: {
                                    line: {
                                        stroke: colors.grey[100],
                                        strokeWidth: 1,
                                    },
                                    text: {
                                        fill: colors.grey[100],
                                    },
                                },
                            },
                            legends: {
                                text: {
                                    fill: colors.grey[100],
                                },
                            },
                            tooltip: {
                                container: {
                                    color: colors.primary[500],
                                },
                            },
                        }}
                        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                        xScale={{ type: 'point' }}
                        yScale={{
                            type: 'linear',
                            min: 'auto',
                            max: 'auto',
                            stacked: true,
                            reverse: false
                        }}
                        yFormat=" >-.2f"
                        axisTop={null}
                        axisRight={null}
                        axisBottom={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: 'Date',
                            legendOffset: 36,
                            legendPosition: 'middle'
                        }}
                        axisLeft={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: 'count',
                            legendOffset: -40,
                            legendPosition: 'middle'
                        }}
                        pointSize={10}
                        pointColor={{ theme: 'background' }}
                        pointBorderWidth={2}
                        pointBorderColor={{ from: 'serieColor' }}
                        pointLabelYOffset={-12}
                        useMesh={true}
                        legends={[
                            {

                                anchor: 'top-left',
                                direction: 'column',
                                justify: false,
                                translateX: 100,
                                translateY: 0,
                                itemsSpacing: 0,
                                itemDirection: 'left-to-right',
                                itemWidth: 90,
                                itemHeight: -30,
                                itemOpacity: 1,
                                symbolSize: 14,
                                symbolShape: 'diamond',
                                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                                effects: [
                                    {
                                        on: 'hover',
                                        style: {
                                            itemBackground: 'rgba(0, 0, 0, .03)',
                                            itemOpacity: 1
                                        }
                                    }
                                ]
                            }
                        ]}
                    /> :
                    <Box
                        mt={5}
                        ml={4}
                        display={'flex'}
                        alignItems={'center'}
                    >
                        <Typography variant='h3'>Loading Data...</Typography>
                        <Skeleton variant='circular' width={60} height={60}></Skeleton>
                    </Box>
            }
        </>
    );
};

export default AllChart;