import React from 'react';
import { mockLineData as data } from '../data/mockData';
import { useTheme } from '@emotion/react';
import { tokens } from '../theme';
import { ResponsiveLine } from '@nivo/line';
import { SocketState } from '../Context/SocketProvider';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDistanceState } from '../Slices/sensorDataSlice';
import { Box, Skeleton, Typography } from '@mui/material';

const LineChart = ({ isCustomLineColors = false, isDashboard = false }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { socket } = SocketState();
    const dispatch = useDispatch();
    // line data config
    const [lineDataArr, setLineDataArr] = useState([{
        id: "DangerAlert",
        color: tokens("dark").greenAccent[500],
        data: [

        ],
    },]);
    console.log('get derived', lineDataArr[0].data.length);
    // console.log(`get derived`, { socket, lineDataArr: lineDataArr[0].data.length });
    useEffect(() => {
        const listen_For_Data = (data) => {
            dispatch(setDistanceState(data.distance));
            // console.log(data);
            setLineDataArr((prevData) => {
                const newData = [...prevData];
                const updatedData = [
                    ...newData[0].data,
                    {
                        x: new Date().toISOString(),
                        y: data.distance,
                    },
                ];
                // this will automatically remove the first element from the list
                if (updatedData.length > 10) {
                    updatedData.shift();
                }

                newData[0].data = updatedData;
                return newData;
            });

        };
        socket.on('distance_event_chart', listen_For_Data);
        return () => {
            socket.off('distance_event_chart', listen_For_Data);
        };
    }, []);
    return <>
        {lineDataArr[0].data.length !== 0 ?
            <ResponsiveLine
                data={lineDataArr}
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
                colors={isDashboard ? { datum: "color" } : { scheme: "nivo" }} // added
                margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                xScale={{ type: "point" }}
                yScale={{
                    type: "linear",
                    min: "auto",
                    max: "auto",
                    stacked: true,
                    reverse: false,
                }}
                yFormat=" >-.2f"
                curve="catmullRom"
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    orient: "bottom",
                    tickSize: 0,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: isDashboard ? undefined : "transportation", // added
                    legendOffset: 36,
                    legendPosition: "middle",
                }}
                axisLeft={{
                    orient: "left",
                    tickValues: 5, // added
                    tickSize: 3,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: isDashboard ? undefined : "count", // added
                    legendOffset: -40,
                    legendPosition: "middle",
                }}
                enableGridX={false}
                enableGridY={false}
                pointSize={8}
                pointColor={{ theme: "background" }}
                pointBorderWidth={2}
                pointBorderColor={{ from: "serieColor" }}
                pointLabelYOffset={-12}
                useMesh={true}
                legends={[
                    {
                        anchor: "bottom-right",
                        direction: "column",
                        justify: false,
                        translateX: 100,
                        translateY: 0,
                        itemsSpacing: 0,
                        itemDirection: "left-to-right",
                        itemWidth: 80,
                        itemHeight: 20,
                        itemOpacity: 0.75,
                        symbolSize: 12,
                        symbolShape: "circle",
                        symbolBorderColor: "rgba(0, 0, 0, .5)",
                        effects: [
                            {
                                on: "hover",
                                style: {
                                    itemBackground: "rgba(0, 0, 0, .03)",
                                    itemOpacity: 1,
                                },
                            },
                        ],
                    },
                ]}
            /> :
            <Box
                display={'flex'}
                alignItems={'center'}
            >
                <Typography variant='h3'>Loading...</Typography>
                <Skeleton variant='circular' width={60} height={60}></Skeleton>
            </Box>
        }
    </>;
};

export default LineChart;