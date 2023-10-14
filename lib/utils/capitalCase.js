
const toCapitalCase = ( name )=>{
    const word = name.toLowerCase();
    return word[0].toUpperCase() + word.slice(1)
}

module.exports ={
  toCapitalCase
}