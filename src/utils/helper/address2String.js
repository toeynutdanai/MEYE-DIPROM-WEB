function address2String(address = {}, lang = "en") {
  const {
    subdistrict = {},
    district = {},
    province = {},
    zipCode = null,
  } = address;
  if (lang === "en") {
    return `${[
      address.address,
      subdistrict.subDistrictNameEn,
      district.districtNameEn,
      province.provinceNameEn,
    ].join(", ")} ${zipCode}`;
  }
  return `${[
    address.address,
    subdistrict.subDistrictName,
    district.districtName,
    province.provinceName,
  ].join(", ")} ${zipCode}`;
}

export default address2String;
