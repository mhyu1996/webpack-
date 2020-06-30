const projectName = require('./project')

const config = {
  //项目1
  projectA:'projectA',
  //项目2
  projectB:'projectB',
  //项目3
  projectC:'projectC'
}

const configObj = (function () {
  if (!projectName.name || projectName.name.toLowerCase() === 'all') {
    return 'projectA|projectB|projectC';
  }
  return config[projectName.name];
})()
console.log('configObj:'+configObj);
module.exports = configObj
