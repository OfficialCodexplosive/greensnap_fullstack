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

    if(data[0].class !== "building")
    {
        isPrecise = false;
    }

    return {query : address, precise : isPrecise, data : data[0]};
}

export default async function handler(req, res)
{
    if(req.method === "POST")
    {
        const { street, streetNumber, postalCode, city, localizationType } = req.body;

        var lat = 0;
        var lon = 0;

        if(localizationType === "gps")
        {
            // get Lat and Long from GPS data
        }else
        {
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

            
        }
    }
}