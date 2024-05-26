import { useEffect, useMemo, useState } from "react";
import Chart from "react-apexcharts";
import getData from "../Api";
import Loader from "../Loader";

const Pestle = () => {
    const [pestleCount, setCount] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const data = await getData("getPestle");
            setCount(data.data);
        };
        fetchData();
    }, []);

    const options = useMemo(() => ({
        chart: {
            id: "basic-bar"
        },
        markers: {
            size: 3,
        },
        xaxis: {
            title: {
                text: "",
                style: {
                    marginTop: "-20px", // Adjust this value to move the text upwards
                    color: '#7367f0',
                    fontSize: '14px',
                    fontWeight: 'bold',
                },
            },
            categories: pestleCount.pestleArray,
            labels: {
                style: {
                    colors: '#7367f0',
                    fontSize: '12px',
                }
            }
        },
        yaxis: {
            title: {
                text: "Count",
                style: {
                    color: '#7367f0',
                    fontSize: '14px',
                    fontWeight: 'bold',
                },
            },
            labels: {
                style: {
                    colors: '#7367f0',
                    fontSize: '12px',
                }
            }
        },
        tooltip: {
            theme: 'dark',
            y: {
                title: {
                    formatter: function () {
                        return "Posts";
                    }
                },
                formatter: function (val) { return val },
            },
            style: {
                fontSize: '10px',
                fontFamily: 'Helvetica, Arial, sans-serif',
            },

        },
        colors: ['#7367f0']
    }), [pestleCount.pestleArray]);

    const series = useMemo(() => ([
        {
            data: pestleCount.countArray
        }
    ]), [pestleCount.countArray]);

    return pestleCount ?
        < div className="Pestle"  >
            < div className="row" >
                <div className="mixed-chart" >
                    <Chart style={{ border: "1px solid rgba(131, 131, 131, 0.309) ", borderRadius: "10px", padding: "10px" }} options={options} series={series} type="line" height={250} />
                </div>
            </div >
        </div > : <div className="loader p - 0 m - 0" style={{ border: "1px solid black ", borderRadius: "10px", padding: "10px" }}> < Loader /></div >;
};

export default Pestle;
