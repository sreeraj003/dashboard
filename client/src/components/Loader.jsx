import { BallTriangle } from "react-loader-spinner"

function Loader() {
    return (
        <div className="loader" style={{ display: "flex", justifyContent: "center" }}>
            <BallTriangle
                height={100}
                width={100}
                radius={5}
                color="var(--color)"
                ariaLabel="ball-triangle-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
        </div>
    )
}

export default Loader