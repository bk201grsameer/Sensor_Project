import React from 'react';
import { ResponsivePie } from '@nivo/pie';
import { useTheme } from '@emotion/react';
import { tokens } from '../theme';
import { mockPieData as data } from '../data/mockData';
import { useState } from 'react';
import Loading from './Loading/Loading';
import axios from 'axios';
import { useEffect } from 'react';




const PieChart = ({ isDashboard = false }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [pieDataArr, setPieDataArr] = useState([]);
    const [loading, setLoading] = useState(true);
    /* GET POLL DATA */
    const fetchPieData = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get('http://localhost:8000/api/poll/getpoll');
            if (data.status === false)
                throw new Error(data.message);
            setLoading(false);
            setPieDataArr(data.message);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    /*  */
    useEffect(() => {
        fetchPieData();
    }, []);
    return (
        loading ? <Loading /> : <ResponsivePie
            data={pieDataArr}
            //for theme //important for the data 
            theme={{
                // added
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
                    ticks:
                    {
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
                "tooltip": {
                    "container": {
                        //this will handle theme hover tooltip
                        "background": theme.palette.mode === "dark" ? "black" : "#ffffff",
                        "fontSize": 12
                    },
                    "basic": {},
                    "chip": {},
                    "table": {},
                    "tableCell": {},
                    "tableCellValue": {}
                }

            }}
            margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            activeOuterRadiusOffset={8}
            borderWidth={1}
            borderColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        0.2
                    ]
                ]
            }}
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsTextColor={theme.palette.mode === 'dark' ? '#fff' : '#000'}
            arcLinkLabelsThickness={2}
            arcLinkLabelsColor={{ from: 'color' }}
            arcLabelsSkipAngle={10}
            arcLabelsTextColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        2
                    ]
                ]
            }}
            arcLinkLabel={(arc) => arc.data.label}
            defs={[
                {
                    id: 'dots',
                    type: 'patternDots',
                    background: 'inherit',
                    color: 'rgba(255, 255, 255, 0.3)',
                    size: 4,
                    padding: 1,
                    stagger: true
                },
                {
                    id: 'lines',
                    type: 'patternLines',
                    background: 'inherit',
                    color: 'rgba(255, 255, 255, 0.3)',
                    rotation: -45,
                    lineWidth: 6,
                    spacing: 10
                }
            ]}

            legends={!isDashboard ? [
                {
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: false,
                    translateX: 0,
                    translateY: 56,
                    itemsSpacing: 0,
                    itemWidth: 100,
                    itemHeight: 18,
                    itemTextColor: theme.palette.mode === 'dark' ? '#fff' : "#000",
                    itemDirection: 'left-to-right',
                    itemOpacity: 1,
                    symbolSize: 18,
                    symbolShape: 'circle',
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemTextColor: 'green'
                            }
                        }
                    ]
                }
            ] : []}
        />
    );
};

export default PieChart;