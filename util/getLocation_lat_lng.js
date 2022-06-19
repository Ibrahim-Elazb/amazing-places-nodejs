const axois=require("axios").default;
const GOOGLE_API_KEY='AIzaSyAuL2CBCv09w5PU2s3aMrO2va1qn33XOF4';

const getLocationLatLng=(address)=>{
    const url=`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${GOOGLE_API_KEY}`;

}