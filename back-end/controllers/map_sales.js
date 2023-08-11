// const r = arr
//   .reduce((acc, curr) => {
//     const index = acc.findIndex(({ id }) => id === curr.id);
//     if (index >= 0) {
//       acc[index] = { ...acc[index], quantidade: acc[index].quantidade + curr.quantidade };
//       return [...acc];
//     }
//     return [...acc, curr];
//   }, []);

// Agrupa todos os produtos repetidos em um único ID

const mapCashier = (arr) => {
  const idMap = {};

  arr.forEach((curr) => {
      if (idMap[curr.id]) {
        idMap[curr.id].quantidade = Number(idMap[curr.id].quantidade);
        idMap[curr.id].quantidade += Number(curr.quantidade);
      } else {
        idMap[curr.id] = { ...curr,
            quantidade: Number(curr.quantidade),
            preco: Number(curr.preco),
        };
      }
    });
    
    return Object.values(idMap);
};

module.exports = mapCashier;
