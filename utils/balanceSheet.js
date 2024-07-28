const generateBalanceSheet = (users, expenses) => {
    const balanceSheet = {};

    // Initialize balance sheet for each user
    users.forEach(user => {
        balanceSheet[user._id] = {
            user: user.name,
            email: user.email,
            totalOwes: 0,
            totalOwed: 0,
            netBalance: 0
        };
    });

    // Calculate the balances
    expenses.forEach(expense => {
        const totalAmount = expense.amount;
        const splitMethod = expense.splitMethod;
        const splits = expense.splits;

        if (splitMethod === 'equal') {
            const splitAmount = totalAmount / splits.length;
            splits.forEach(split => {
                balanceSheet[split.user._id].totalOwed += splitAmount;
                balanceSheet[split.user._id].netBalance -= splitAmount;
            });
        } else if (splitMethod === 'exact') {
            splits.forEach(split => {
                balanceSheet[split.user._id].totalOwed += split.amount;
                balanceSheet[split.user._id].netBalance -= split.amount;
            });
        } else if (splitMethod === 'percentage') {
            splits.forEach(split => {
                const splitAmount = (totalAmount * split.amount) / 100;
                balanceSheet[split.user._id].totalOwed += splitAmount;
                balanceSheet[split.user._id].netBalance -= splitAmount;
            });
        }

        // Add the amount each user paid to the balance sheet
        splits.forEach(split => {
            balanceSheet[split.user._id].totalOwes += split.amount;
            balanceSheet[split.user._id].netBalance += split.amount;
        });
    });

    return balanceSheet;
};
module.exports = generateBalanceSheet;
