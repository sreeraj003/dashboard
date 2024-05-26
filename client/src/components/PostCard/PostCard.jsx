/* eslint-disable react/prop-types */
import { useEffect } from "react"
import "./postcard.css"
// eslint-disable-next-line react/prop-types
function PostCard({ post }) {
    useEffect(() => { window.scrollTo(0, 0); }, [post])
    return (
        <>
            {post.map((el, ind) => (

                < div className="postCard row" key={ind}>
                    <div className="col-12">
                        <h5>{el.title}</h5>
                    </div>
                    <div className="col-md-6">
                        <h6>{el.topic ? el.topic.split("")[0].toUpperCase() + el.topic.split("").slice(1).join("") : "Unknown"}</h6>
                        <span><i>Relevence rate: {el.relevance}</i></span><br />
                        <span><i>Intensity rate : {el.intensity}</i></span ><br />
                        <span><i>Likelihood:{el.likelihood}</i></span><br />
                        <span><a target="_blank" href={el.url}>Check</a></span>
                    </div >
                    <div className="col-md-6 right">
                        <div>
                            <span>Region : {el.region ? el.region : "Unknown"}</span><br />
                            <span>Country : {el.country ? el.country : "Unknown"}</span>
                        </div>
                        <div>
                            <span>Added : {el.added ? el.added : "Unknown"}</span><br />
                            <span>Published : {el.published ? el.published : "Unknown"}</span><br />
                            <span>End Date : {el.end_date ? el.end_date : "Unknown"}</span>
                        </div>
                    </div>
                </div >
            ))
            }
        </>
    )
}

export default PostCard