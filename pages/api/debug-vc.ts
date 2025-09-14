import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const vcSid = process.env.VC_SID;
  const vcPid = process.env.VC_PID;
  const yahooVcSid = process.env.YAHOO_VC_SID;
  const yahooVcPid = process.env.YAHOO_VC_PID;
  
  res.status(200).json({
    VC_SID: vcSid ? "set" : "not set",
    VC_PID: vcPid ? "set" : "not set", 
    YAHOO_VC_SID: yahooVcSid ? "set" : "not set",
    YAHOO_VC_PID: yahooVcPid ? "set" : "not set",
    NODE_ENV: process.env.NODE_ENV
  });
}
