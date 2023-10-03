//require('dotenv').config();
// const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI0ZDdiMThlMy0wODk3LTQyMGYtOGIxNy1mOThlODc0OWQ5OTAiLCJlbWFpbCI6ImpvbmUzM2RhdmlkQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiI2ZTY3YTYxYmYxZTdlMThiNDg2ZCIsInNjb3BlZEtleVNlY3JldCI6IjQxM2JkNTRmOWQ2ZmFmODZhODI3YjlmYmNkYjJlNmRjOGZkZDdiODRiMzFhNDQzYzZhYmYzMDFjMGZlZDEzYmQiLCJpYXQiOjE2OTYyOTkzNDB9.WFsmuI-6a8WknwV6sx7jVrkuIhlcjRWtc8yjLLnsqGI";
const secret = "63eb59049a856ace528963e425b8f7c3d3508c179453110c73964ce606e02b61";
const key = "1641739ca4cdad2c5e75"
const jwt= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI0ZDdiMThlMy0wODk3LTQyMGYtOGIxNy1mOThlODc0OWQ5OTAiLCJlbWFpbCI6ImpvbmUzM2RhdmlkQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiIxNjQxNzM5Y2E0Y2RhZDJjNWU3NSIsInNjb3BlZEtleVNlY3JldCI6IjYzZWI1OTA0OWE4NTZhY2U1Mjg5NjNlNDI1YjhmN2MzZDM1MDhjMTc5NDUzMTEwYzczOTY0Y2U2MDZlMDJiNjEiLCJpYXQiOjE2OTYyOTk2MjJ9.0z85pBnZy_W4FIfMB9js_4uqvUd2F3neh7BVKREaWPs"
const axios = require('axios');
const FormData = require('form-data');

export const uploadJSONToIPFS = async(JSONBody) => {
    const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
    //making axios POST request to Pinata ⬇️
    return axios 
        .post(url, JSONBody, {
            headers: {
                pinata_api_key: key,
                pinata_secret_api_key: secret,
            }
        })
        .then(function (response) {
           return {
               success: true,
               pinataURL: "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash
           };
        })
        .catch(function (error) {
            console.log(error)
            return {
                success: false,
                message: error.message,
            }

    });
};

export const uploadFileToIPFS = async(file) => {
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
    //making axios POST request to Pinata ⬇️
    
    let data = new FormData();
    data.append('file', file);

    const metadata = JSON.stringify({
        name: 'testname',
        keyvalues: {
            exampleKey: 'exampleValue'
        }
    });
    data.append('pinataMetadata', metadata);

    //pinataOptions are optional
    const pinataOptions = JSON.stringify({
        cidVersion: 0,
        customPinPolicy: {
            regions: [
                {
                    id: 'FRA1',
                    desiredReplicationCount: 1
                },
                {
                    id: 'NYC1',
                    desiredReplicationCount: 2
                }
            ]
        }
    });
    data.append('pinataOptions', pinataOptions);

    return axios 
        .post(url, data, {
            maxBodyLength: 'Infinity',
            headers: {
                'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                pinata_api_key: key,
                pinata_secret_api_key: secret,
            }
        })
        .then(function (response) {
            console.log("image uploaded", response.data.IpfsHash)
            return {
               success: true,
               pinataURL: "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash
           };
        })
        .catch(function (error) {
            console.log(error)
            return {
                success: false,
                message: error.message,
            }

    });
};