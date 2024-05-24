import { useLayoutEffect, useState } from "react"
import "./totalCard.css"
import getData from "../Api"
import Loader from "../Loader"

function TotalCard() {
    const [data, setData] = useState("")
    useLayoutEffect(() => {
        const fetchData = async () => {
            const count = await getData("count")
            setData(count.data[0])
        }
        fetchData()
    }, [])
    console.log(data);
    return (
        <div className='totalcard'>
            {data ?
                <div className="row p-0">
                    <div className="col-12 col-md-6 p-0 left">
                        <div className="col-12 p-0">
                            <h4 className="m-0">Website Analytics</h4>
                            <span className="m-0">Total <b>{data.postCount}</b> Posts added from:</span>
                        </div>
                        <div className="row">
                            <div className="col-6 counts p-0">
                                <span><b>{data.topicCount}</b> Topics</span>
                                <span><b>{data.sectorCount}</b> Sectors</span>
                            </div>
                            <div className="col-6 counts p-0">
                                <span><b>{data.countryCount}</b> Country</span>
                                <span><b>{data.regionCount}</b> Region</span>
                            </div >
                        </div>
                    </div >
                    <div className="col-0 col-md-6 imgClass">
                        <img src="/glob-removebg-preview.png" alt="" />
                    </div>
                </div >
                : <div className="loadingEl">< Loader /></div>
            }

        </div >
    )
}

export default TotalCard