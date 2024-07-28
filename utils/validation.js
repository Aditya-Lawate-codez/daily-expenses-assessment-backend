exports.validateSplitMethod = (method, splits, amount) => {
    if (method === 'equal') {
        const splitAmount = amount / splits.length;
        return splits.every(split => split.amount === splitAmount);
    } else if (method === 'exact') {
        const totalAmount = splits.reduce((acc, split) => acc + split.amount, 0);
        return totalAmount === amount;
    } else if (method === 'percentage') {
        const totalPercentage = splits.reduce((acc, split) => acc + split.amount, 0);
        return totalPercentage === 100;
    }
    return false;
};
