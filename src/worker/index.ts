import workerpool from 'workerpool';

const pool = workerpool.pool();

function add(a = 1, b = 2) {
  let sum = 0;
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 100; j++) {
      sum = i + j;
    }
    console.log(i);
  }
  return sum + a + b;
}

export const addPool = (): void => {
  pool
    .exec(add, [3, 4])
    .then(function (result) {
      console.log('result', result);
    })
    .catch(function (err) {
      console.error(err);
    })
    .then(function () {
      pool.terminate();
    });
};
