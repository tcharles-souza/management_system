const fs = require('fs/promises');
const path = require('path');

const FILE_PATH = path.join(__dirname, '../db/mock.json');

const readFile = async () => {
  const resolve = await fs.readFile(FILE_PATH, { encoding: 'utf-8' });
  
  const data = JSON.parse(resolve);

  return data;
};

module.exports = {
  readFile,
};
