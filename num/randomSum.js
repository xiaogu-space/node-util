function generatePositiveIntegers(totalSum, numIntegers) {
    // 生成 numIntegers - 1 个随机正整数
    const randomNumbers = Array.from({ length: numIntegers - 1 }, () => Math.floor(Math.random() * (totalSum - numIntegers + 1)) + 1);

    // 计算第 numIntegers 个数，使得总和等于 totalSum
    const lastNumber = totalSum - randomNumbers.reduce((acc, curr) => acc + curr, 0);

    // 输出这 numIntegers 个数
    const allNumbers = [...randomNumbers, lastNumber];
    return allNumbers;
}

// 设置总和和要生成的正整数个数
const totalSum = 100;
const numIntegers = 8;

// 生成满足条件的正整数
let result = generatePositiveIntegers(totalSum, numIntegers);

// 确保没有负数
while (result.some(num => num < 0)) {
    result = generatePositiveIntegers(totalSum, numIntegers);
}

// 输出全部数
console.log("生成的正整数为：", result);
console.log("它们的和为：", result.reduce((acc, curr) => acc + curr, 0));
