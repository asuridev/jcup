
const dockerIgnore = ()=>{

  return `.gradle/
bin/
build/
.idea
.git
.gitignore
Dockerfile
compose.yaml
  `;

};



module.exports = {
  dockerIgnore
}