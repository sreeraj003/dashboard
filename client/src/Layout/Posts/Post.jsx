/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from "react"
import PostCard from "../../components/PostCard/PostCard"
import "./post.css"
import getData from "../../components/Api"

function Post() {
    const [post, setPost] = useState([])
    const [page, setPage] = useState(1)
    const [filter, setFilter] = useState("")
    const [filterData, setFilterData] = useState([])
    const [filterField, setField] = useState("")
    useEffect(() => {
        const fetchData = async () => {
            const data = await getData(`postData?pageNo=${page}&filterField=${filterField}&filter=${filter}`)
            setPost(data.data)
            console.log(filter);
        }
        fetchData()
    }, [filter, page])

    const handleField = useCallback(async (el) => {
        setField(el.target.textContent)
        const data = await getData(`filterField?filterField=${el.target.textContent}`)
        setFilterData(data.data)

    }, [])
    const handleFilter = useCallback(async (el) => {
        setPage(1)
        setFilter(el)
    }, [])


    return (
        <>
            <div style={{
                display: "flex", flexDirection: "row",
            }}>
                < div className="dropdown  m-3">
                    < button className="btn dropButton dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        {filterField ? filterField.split("")[0].toUpperCase() + filterField.split("").slice(1).join("") : " Filter By"}
                    </button>
                    <ul className="dropdown-menu drops p-3" aria-labelledby="dropdownMenuButton1">

                        < li onClick={(e) => handleField(e)}>Country</li>
                        < li onClick={(e) => handleField(e)}>Intensity</li>
                        < li onClick={(e) => handleField(e)}>Likelihood</li>
                        < li onClick={(e) => handleField(e)}>Region</li>
                        < li onClick={(e) => handleField(e)}>Relevance</li>
                        < li onClick={(e) => handleField(e)}>Topics</li>
                        < li onClick={(e) => handleField(e)}>End_Year</li>
                    </ul>

                </div >
                <div className="dropdown m-3">
                    <button className="btn dropButton  dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        {filter ? filter : "Filter By"}
                    </button>
                    <ul className="dropdown-menu drops p-3" aria-labelledby="dropdownMenuButton1" >
                        {filterData.length ? filterData.map((el, ind) => (
                            < li key={ind} onClick={() => handleFilter(el)}>{el ? el : 'Unknown'}</li>
                        ))
                            : "No recored found"
                        }
                    </ul>

                </div >
                <button className="btn m-3 cls" style={{ height: "35px" }} onClick={() => {
                    setFilter("")
                    setField("")
                }}>Clear</button>

            </div >

            <div>
                <PostCard post={post} />
            </div>
            <div style={{
                display: "flex"
            }}>

                {
                    page > 1 ? < button className="btn m-3 next" onClick={() => setPage(page - 1)}>Prev</button > : ""
                }
                {
                    post.length >= 10 ? < button className="btn m-3 next" onClick={() => setPage(page + 1)}>Next</button > :
                        ""
                }
            </div>
        </>
    )
}

export default Post