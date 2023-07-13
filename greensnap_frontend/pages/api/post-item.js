import { parse } from 'cookie';
import { Client } from "@googlemaps/google-maps-services-js";

export default async function handler(req, res)
{
    if(req.method === "POST")
    {
        const { typeOfItem, sizeOfItem, street, streetNumber, postalCode, city, localizationType } = req.body;

        var lat = 0;
        var lon = 0;

        if(localizationType === "gps")
        {
            // get Lat and Long from GPS data
        }else
        {
            const address = `Germany, ${postalCode} ${city}, ${street} ${streetNumber}`;

            const args = {
                params: {
                    key : process.env.GOOGLE_MAPS_API_KEY,
                    address : address
                }
            };
            const client = new Client();
            const apiRes = await client.geocode(args);

            if(apiRes.status === 200)
            {
                const data = apiRes.data.results[0].geometry.location;
                lat = data.lat;
                lon = data.lng;
            }
        }

        var payload = {
            type : typeOfItem,
            size : Number(sizeOfItem),
            sizeUnit : 'cm',
            latitude : Number(lat),
            longitude : Number(lon),
        }

        console.log(payload);

        try
        {
            const cookies = req.headers.cookie;
            if(!cookies)
            {
                res.status(401).json({message:"Unauthorized"});
                return;
            }

            const parsedCookies = parse(cookies);
            if(!parsedCookies['gsnap-auth'])
            {
                return res.status(401).json({message:"Unauthorized"});
            }

            let authToken = parsedCookies['gsnap-auth'];

            const apiRes = await fetch(`${process.env.BACKEND_URL}/item`, {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${authToken}`
                },
                body : JSON.stringify(payload)
            });

            const data = await apiRes.json();
            res.status(apiRes.status).json(data);
            return;
        
        }catch(err)
        {
            console.error(err)
            res.status(500).json({ data : err });
            return;
        }
    }
}