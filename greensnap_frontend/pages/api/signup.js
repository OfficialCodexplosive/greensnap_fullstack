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

    const signupData = {
        firstName : body.firstName,
        lastName : body.lastName,
        email : body.email,
        username : body.username,
        password : body.password,
        age : Number(body.age)
      };
  
      try
      {
        const apiRes = await fetch('http://localhost:3000/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(signupData),
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
              firstName : data.data.firstName,
              lastName : data.data.lastName,
              email : data.data.email,
              username : data.data.username,
            } });
        }
      } catch (error) 
      {
        console.error("Error:", error);
        res.status(500).json({ data : error });
      }
}