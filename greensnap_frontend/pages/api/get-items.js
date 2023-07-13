import { parse } from 'cookie';

export default async function handler(req, res)
{
    if(req.method === "GET")
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

        try
        {
            const userRes = await fetch(`${process.env.BACKEND_URL}/user/`, {
                method : 'GET',
                headers : {
                    'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${authToken}`,
                },
            })
            const userData = await userRes.json();            
            let municipality_url = `${process.env.BACKEND_URL}/item/municipality/` + userData.data.jurisdiction;
            
            const muniRes = await fetch(municipality_url, {
                method : 'GET',
                headers : {
                    'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${authToken}`
                }
            });
            
            const itemData = await muniRes.json();
            res.status(muniRes.status).json(itemData);
            return;
        }catch(error)
        {
            console.error(error);
            res.status(500).json({ data : error });
            return;
        }
    }
}