// const arr = [
//   {
//     id: 1,
//     nome: 'PAO FRANCES',
//     preco: '13.90',
//     unidade: 'UN',
//     estoque: 1,
//     categoria: 'Pães',
//     fornecedor: 'Fornecedor A',
//     quantidade: 1,
//   },
//   {
//     id: 1,
//     nome: 'PAO FRANCES',
//     preco: '13.90',
//     unidade: 'UN',
//     estoque: 1,
//     categoria: 'Pães',
//     fornecedor: 'Fornecedor A',
//     quantidade: 1,
//   },
//   {
//     id: 1,
//     nome: 'PAO FRANCES',
//     preco: '13.90',
//     unidade: 'UN',
//     estoque: 1,
//     categoria: 'Pães',
//     fornecedor: 'Fornecedor A',
//     quantidade: 1,
//   },
//   {
//     id: 4,
//     nome: 'BROA DE MILHO',
//     preco: '10.00',
//     unidade: 'UN',
//     estoque: 1,
//     categoria: 'Pães',
//     fornecedor: 'Fornecedor B',
//     quantidade: 1,
//   },
//   {
//     id: 4,
//     nome: 'BROA DE MILHO',
//     preco: '10.00',
//     unidade: 'UN',
//     estoque: 20,
//     categoria: 'Pães',
//     fornecedor: 'Fornecedor B',
//     quantidade: 1,
//   },
//   {
//     id: 4,
//     nome: 'BROA DE MILHO',
//     preco: '10.00',
//     unidade: 'UN',
//     estoque: 20,
//     categoria: 'Pães',
//     fornecedor: 'Fornecedor B',
//     quantidade: 1,
//   },
// ];

// const r = arr
//   .reduce((acc, curr) => {
//     const index = acc.findIndex(({ id }) => id === curr.id);
//     if (index >= 0) {
//       acc[index] = { ...acc[index], quantidade: acc[index].quantidade + curr.quantidade };
//       return [...acc];
//     }
//     return [...acc, curr];
//   }, []);

// const idMap = {};

// arr.forEach((curr) => {
//   if (idMap[curr.id]) {
//     idMap[curr.id].quantidade += curr.quantidade;
//   } else {
//     idMap[curr.id] = { ...curr };
//   }
// });

// const result = Object.values(idMap);

// console.log(idMap);
