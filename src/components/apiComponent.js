import React from "react";
import * as crc32 from "crc-32";
const CRC_KEY = process.env.REACT_APP_CRC_KEY;

export const getApiUrl = ()=>{
    return "http://localhost:5000";
}
export const getSecureKey = (data)=>{
    const jsonString = JSON.stringify(data);
    const dataWithSecret = jsonString + CRC_KEY;
    return crc32.str(dataWithSecret).toString(16);
}