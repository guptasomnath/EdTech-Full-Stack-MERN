export const demoFilterDatas = [
    {
      filterName : "Ratings",
      filterOptionList : [
        {optionName : "4.0 or more", optionQueryCode : { $gte : 4 }},
        {optionName : "4.0 or less", optionQueryCode : { $lt : 4 }}
      ]
    },
  
    {
      filterName : "Price",
      filterOptionList : [
        {optionName : "Free", optionQueryCode : { $lte : 0 }},
        {optionName : "Paid", optionQueryCode : { $gt : 0 }}
      ]
    },
  
    {
      filterName : "Language",
      filterOptionList : [
        {optionName : "English", optionQueryCode : "English"},
        {optionName : "Hindi", optionQueryCode : "Hindi"},
        {optionName : "Bengli", optionQueryCode : "Bengli"}
      ]
    }
  ]