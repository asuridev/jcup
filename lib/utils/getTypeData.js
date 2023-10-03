
const TYPES_DATA = {
  'UUID': 'String',
  'IDENTITY': 'Long',
  'SEQUENCE' : 'Long'
}


const getTypeData = ( strategyId ) =>{

  return TYPES_DATA[strategyId];

};

module.exports = {
  getTypeData
}