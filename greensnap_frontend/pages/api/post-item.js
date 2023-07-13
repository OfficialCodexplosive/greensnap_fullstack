export default async function handler(req, res)
{
    if(req.method === "POST")
    {
        return res.status(200).json({message:"Success", data : req.body});
    }
}