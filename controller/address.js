const Address = require("../models/address");
module.exports = {
  postAddress: async (req, res) => {
    try {
      const { first, last, number, zipCode, address, city, state } = req.body;
      if (!first || !zipCode || !address || !city || !state || !number) {
        return res.status(404).json({ error: "please fill all fields" });
      } else {
        const adrInstace = new Address({
          first,
          zipCode,
          address,
          number,
          city,
          state,
          last,
          userId: req.user._id,
        });

        const save = await adrInstace.save();
        if (save) {
          return res.status(200).json({
            message: "address save successfully",
            status: 200,
            data: save,
          });
        } else {
          return res.status(500).json({ message: "address not save " });
        }
      }
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: "internal error" });
    }
  },
  getAddress: async (req, res) => {
    try {
      if (req.user === null) {
        return res.status(404);
      }
      const address = await Address.findOne({ userId: req.user._id });
      if (address) {
        return res.status(200).json({
          status: 200,
          data: address,
        });
      } else {
        return res.status(500);
      }
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: "internal error" });
    }
  },
  editAddress:async(req,res)=>{
    try{
      if (req.user === null) {
        return res.status(404);
      }

      const address = await Address.findOne({ userId: req.user._id });
      if (address) {
        address.first=req.body.first;
        address.last=req.body.last;
        address.zipCode=req.body.zipCode;
        address.address=req.body.address;
        address.city=req.body.city;
        address.number=req.body.number;
        address.state=req.body.state;

        address.save().then((addr)=>{
          return res.status(200).json({
            status: 200,
            data: address,
          });
        }).catch((e)=>{
          console.log(e);
          return res.status(500);
        })
        
      } else {
        return res.status(500);
      }

      

    }catch(err){
      console.log(err);
      return res.status(500).json({ message: "internal error" });
    }
  }
};
