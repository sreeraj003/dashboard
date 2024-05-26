/* eslint-disable no-undef */
import { useEffect, useState } from 'react';
import "./sector.css";
import getData from '../Api';
import Loader from '../Loader';

function Sector() {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await getData("sectors");
            setChartData(response.data);

            // Load the Google Charts script
            const script = document.createElement('script');
            script.src = 'https://www.gstatic.com/charts/loader.js';

            document.body.appendChild(script)

        };

        fetchData();
    }, []);

    useEffect(() => {
        if (chartData.length) {
            // Initialize the chart
            google.charts.load('current', { packages: ['corechart'] });
            google.charts.setOnLoadCallback(drawChart);
        }
        console.log(chartData);
        function drawChart() {
            const data = google.visualization.arrayToDataTable(chartData);

            const options = {
                title: 'Sectors',
                fontSize: "20px",
                titleTextStyle: {
                    color: "6458f0",
                    bold: true,
                    fontSize: "40px",
                    italic: false
                },
                legend: {
                    textStyle: {
                        color: '6458f0' // Custom color for legend text
                    }
                },
                is3D: true,
                backgroundColor: 'transparent',
                chartArea: { width: '100%', height: '100%', left: "12%", top: "10%" },
            };

            const chart = new google.visualization.PieChart(document.getElementById('piechart_3d'));
            chart.draw(data, options);
        }
    }, [chartData]);

    return (
        chartData ?
            <div className='p-2 m-0 pt-0'>
                < div id="piechart_3d" className="chart-container " style={{ borderRadius: "10px" }} ></div >
            </div>
            :
            <Loader />
    );
}

export default Sector;
