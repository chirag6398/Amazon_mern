import axios from "axios";

const postAddress = async (data) => {
  try {
    const res = await axios.post("/postAddress", data);
    console.log(res);
    return res.data;
  } catch (e) {
    console.log(e);
  }
};
const getAddress = async () => {
  try {
    const res = await axios.get("/getAddress");
   
    return res.data;
  } catch (e) {
    console.log(e);
  }
};
const editAddress=async(data)=>{
  try{
   
   const res=await axios.put("/editAddress",data);
   
   return res.data;
  }catch(e){
    console.log(e);
  }
}
export { postAddress, getAddress,editAddress };
