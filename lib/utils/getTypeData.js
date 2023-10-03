
const TYPES_DATA = {
  'UUID': 'String',
  'IDENTITY': 'Long',
  'SEQUENCE' : 'Long',
  'NONE-STRING' : 'String',
  'NONE-NUMBER': 'Long'
}


const getTypeData = ( strategyId ) =>{

  return TYPES_DATA[strategyId];

};

module.exports = {
  getTypeData
}