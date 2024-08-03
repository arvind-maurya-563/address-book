import React from "react";
import * as crc32 from "crc-32";
const CRC_KEY = process.env.REACT_APP_CRC_KEY;

export const getApiUrl = ()=>{
    return "https://address-book-backend.onrender.com";
}
export const getSecureKey = (data)=>{
    const jsonString = JSON.stringify(data);
    const dataWithSecret = jsonString + CRC_KEY;
    return crc32.str(dataWithSecret).toString(16);
}