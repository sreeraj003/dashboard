
import { useCallback, useEffect, useState } from 'react'
import './dash.css'
import getData from '../../components/Api'
import Likelihood from '../../components/PestleGraph/pestleGraph'
import MyD3Chart from '../../components/CountryChart/regCountry'
import TotalCard from '../../components/TotalCard/TotalCard'
import Sector from '../../components/Sector.jsx/sector'

function Dashboard() {
    const [data, setData] = useState(null)

    const fetchData = useCallback(async () => {
        try {
            const chartData = await getData("reg-country")
            setData(chartData.data)
        } catch (error) {
            console.log(error);
        }
    }, [])
    useEffect(() => {
        fetchData()
    }, [fetchData])

    return (

        <div className="row p-0 m-0 ">
            <div className="col-12 col-sm-6 p-3 m-0  ">
                <TotalCard></TotalCard>
            </div>
            <div className=" col-12  col-sm-6 p-3">
                <Likelihood></Likelihood>
            </div>
            <div className="col-12 svg p-3  col-sm-6 ">
                {data && <MyD3Chart data={data}></MyD3Chart>}
            </div>
            <div className="col-12 p-3  col-sm-6  ">
                <div className="row">
                    <div className="col-12 p-0">
                        <Sector></Sector>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Dashboard
