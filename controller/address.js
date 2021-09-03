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
};
