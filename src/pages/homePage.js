import { useEffect } from "react";

const { useNavigate } = require("react-router-dom")

export const HomePage = ()=>{
     const navigate = useNavigate();
     useEffect(()=>{
        navigate('/login');
     })
    return (
        <div>

        </div>
    )
}