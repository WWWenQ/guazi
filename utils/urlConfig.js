const domain = "https://tool.bitefu.net";
const interfaces = {
  carBrands: domain + "/car/?type=brand&from=[0|1|2|...]&pagesize=300",
  carTypes: domain +"/car/?type=info&from=[0|1|2|...]&pagesize=3000"
}
module.exports = interfaces;