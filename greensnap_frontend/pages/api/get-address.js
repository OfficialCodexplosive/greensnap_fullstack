async function getAddress(geoData)
{
    if(geoData.length == 0)
    {
        return null;
    }

    const url = `https://nominatim.openstreetmap.org/reverse?lat=${geoData.lat}&lon=${geoData.lon}`;

    const apiRes = await fetch(url);
    const data = await apiRes.json();

    console.log(data);
    return data;
    //if(data[0].class !== "building")
    //{
    //    isPrecise = false;
    //}

    //return {query : address, precise : isPrecise, data : data[0]};
}

export default async function handler(req, res)
{
    if(req.method === "POST")
    {
        const { lat, lon, localizationType } = req.body;

        if(localizationType === "gps")
        {
            if(!process.env.NO_COST_MODE)
            {
                /*const args = {
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
                }*/
            }else
            {
                const geoData = [lat, lon];
                let data = await getAddress(geoData);

                console.log(data);
                return res.status(200).json(data);
            }
        }else
        {
            /* 
            console.log("GET COORDINATES", req.body);
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

                console.log(data);
                return res.status(200).json(data);
            }
            */
            
        }
    }
}