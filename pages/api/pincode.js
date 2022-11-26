// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {

  let pincodes = {
    "721302" : [ "Khagarpur", "West Bengal"],
    "110003" : [ "Delhi", "Delhi"],
    "560017" : [ "Banglore", "Karnataka"],
  }
  res.status(200).json(pincodes);
}
 