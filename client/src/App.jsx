
import { useCallback, useEffect, useState } from 'react'
import './App.css'
import getData from './components/Api'
import NavBar from './components/Navbar/NavBar'
import Likelihood from './components/PestleGraph/pestleGraph'
import MyD3Chart from './components/CountryChart/regCountry'
import SideBar from './components/Sidebar/SideBar'
import TotalCard from './components/TotalCard/TotalCard'

function App() {
  const [data, setData] = useState(null)

  const fetchData = useCallback(async () => {
    try {
      const chartData = await getData("reg-country")
      setData(chartData.data)
      console.log(chartData.data);
    } catch (error) {
      console.log(error);
    }
  }, [])
  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <div className='row p-0 me-0'>
      <NavBar />
      <div className="row m-0  p-0">
        <div className=" col-lg-3 col-md-2 col-xl-2 col-sm-4   ps-3 pe-0 me-0">
          <SideBar />
        </div>
        <div className="col-12 mt-3 bod col-lg-9 col-xl-10 col-md-10 col-sm-8 p-0">
          <div className="row p-0 m-0 ">
            <div className="col-12 col-sm-6 p-3 m-0  ">
              <TotalCard></TotalCard>
            </div>
            <div className=" col-12  col-sm-6 p-3">
              <Likelihood></Likelihood>
            </div>
            <div className="col-12 svg p-3  col-sm-6 col-md-6 ">
              {data && <MyD3Chart data={data}></MyD3Chart>}
            </div>
            {/* <div className="totCard col-12  col-sm-6 col-md-4 col-lg-4 col-xl-3  ">

</div> */}
          </div>
        </div>
      </div>
    </div >
  )
}

export default App
