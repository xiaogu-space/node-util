function generatePositiveIntegers(totalSum, numIntegers, maxAttempts = 1000) {
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        // 限制每个数字的范围在1到10之间
        const randomNumbers = Array.from({ length: numIntegers - 1 }, () => Math.floor(Math.random() * 10) + 1);

        // 计算第 numIntegers 个数，使得总和等于 totalSum
        const lastNumber = totalSum - randomNumbers.reduce((acc, curr) => acc + curr, 0);

        // 如果所有数字都是正整数，返回结果
        if (randomNumbers.every(num => num > 0) && lastNumber > 0) {
            return [...randomNumbers, lastNumber];
        }
    }

    // 如果在一定次数内未找到合适的解，返回空数组或者根据需要进行处理
    return [];
}

// 设置总和和要生成的正整数个数
const totalSum = 100;
const numIntegers = 16;

// 生成满足条件的16个正整数
const result = generatePositiveIntegers(totalSum, numIntegers);

// 输出个数
console.log("生成的正整数为：", result);
console.log("它们的和为：", result.reduce((acc, curr) => acc + curr, 0));
