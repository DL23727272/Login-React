import React from "react"
import { useLocation, useNavigate } from "react-router-dom"

function Home (){

    const location = useLocation()


    return (
        <div className="homepage">
            <h1>Welcome to my website!</h1>
            <h2> Hello {location.state.id}</h2>

        </div>
    )
}

export default Home