import { parse } from 'cookie';
import { Client } from "@googlemaps/google-maps-services-js";


async function getLatLon(addressData, isPrecise=true)
{
    if(addressData.length == 0)
    {
        return null;
    }

    const address = `Germany, ${addressData.join(", ")}`;

    const url = `https://nominatim.openstreetmap.org/search?q=${address}&format=json`;

    const apiRes = await fetch(url);
    const data = await apiRes.json();

    if(data.length == 0 || (data[0].lat == undefined || data[0].lon == undefined))
    {
        return await getLatLon(addressData.slice(0,-1),false);
    }

    return {query : address, precise : isPrecise, data : data[0]};
}

export default async function handler(req, res)
{
    if(req.method === "POST")
    {
        const { typeOfItem, sizeOfItem, street, streetNumber, postalCode, city, localizationType, latitude, longitude } = req.body;

        var lat = latitude;
        var lon = longitude;

        /*
        if(localizationType === "gps")
        {
            // get Lat and Long from GPS data
        }else
        {
            const address = `Germany, ${postalCode} ${city}, ${street} ${streetNumber}`;

            if(!process.env.NO_COST_MODE)
            {
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
            }else
            {
                const addressData = [postalCode, city, street, streetNumber];
                let data = await getLatLon(addressData);

                if(!data.precise)
                {
                    
                }

                console.log(data);
                return res.status(200).json(data);
            }

            
        }
        */
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