"use server"

import { serialize } from 'cookie'

export default async function handler(req,res)
{
    if(req.method !== "POST")
    {
      res.status(405).send("Only POST requests allowed")
      return;
    }
    const body = req.body;

    const loginData = {
        username : body.username,
        password : body.password,
      };
  
      try
      {
        const apiRes = await fetch(`${process.env.BACKEND_URL}/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(loginData),
        });
  
        const data = await apiRes.json();
        let token = data.data.token;

        if ( apiRes.status === 200 && token )
        {
          const cookie = serialize('gsnap-auth', token, {
            httpOnly : true,
            path : '/'
          });

          res.setHeader("Set-Cookie", cookie);
          res.status(200).json({ 
            user : {
              username : data.data.user.username,
              role : data.data.user.role,
            } });
        }
      } catch (error) 
      {
        console.error("Error:", error);
        res.status(500).json({ data : error });
      }
}