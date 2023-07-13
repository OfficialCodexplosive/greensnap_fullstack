import { parse } from 'cookie';

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
            // get Lat and Long from address
        }

        var payload = {
            type : typeOfItem,
            size : Number(sizeOfItem),
            sizeUnit : 'cm',
            latitude : Number(lat),
            longitude : Number(lon),
        }

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

            const apiRes = await fetch('http://localhost:3000/item', {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${authToken}`
                },
                body : JSON.stringify(payload)
            });

            const data = await apiRes.json();
            res.status(200).json(data);
            return;
        
        }catch(err)
        {
            console.error(err)
            res.status(500).json({ data : err });
            return;
        }
    }
}