import { useTheme } from '@emotion/react';
import React from 'react';
import { tokens } from '../../../theme';
import { SocketState } from '../../../Context/SocketProvider';
import { useState } from 'react';
import { ResponsiveLine } from '@nivo/line';
import { useEffect } from 'react';
import { Box, Skeleton, Typography } from '@mui/material';



const DashBoardLineChart = ({ isCustomLineColors = false, isDashboard = false }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { socket } = SocketState();
    // line data config
    const [lineDataArr, setLineDataArr] = useState([{
        id: "DangerAlert",
        color: tokens("dark").greenAccent[500],
        data: [

        ],
    }]);

    useEffect(() => {
        // top 10 distance intrusion readings
        const top_reading_distance_Data = (data) => {
            if (data) { console.log(data.data); setLineDataArr([data.data]); }
        };

        socket.on('top_reading_distance_event', top_reading_distance_Data);
        return () => {
            socket.off('top_reading_distance_event', top_reading_distance_Data);
        };
    }, [socket]);

    return <>{
        lineDataArr[0].data.length !== 0 ?
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
                mt={5}
                ml={4}
                display={'flex'}
                alignItems={'center'}
            >
                <Typography variant='h3'>Loading Data...</Typography>
                <Skeleton variant='circular' width={60} height={60}></Skeleton>
            </Box>
    }
    </>;
};

export default DashBoardLineChart;