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
          adress,
          number,
          city,
          state,
          last,
        });
        console.log(adrInstace);
        const userAddressExist = Address.findOne({ userId: req.user._id });
        if (userAddressExist) {
        } else {
          console.log(adrInstace);
        }
      }
    } catch (e) {
      console.log(e);
    }
  },
};
