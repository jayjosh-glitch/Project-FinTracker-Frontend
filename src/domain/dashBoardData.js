

const currentFY = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    if (month >= 4) {
        return `${year}-${year + 1}`;
    } else {
        return `${year - 1}-${year}`;
    }
}

const expenseYear = (expenseList) => {

    const year = currentFY()
    const [startYear, endYear] = year.split('-').map(Number);
    const fyStart = `${startYear}-04-01`;
    const fyEnd = `${endYear}-03-31`;
    const currentFYData = expenseList.filter(expense => {
        const expenseDate = expense.date.split("T")[0];
        return expenseDate >= fyStart && expenseDate <= fyEnd;
    });
    return currentFYData;
}

const incomeYear = (incomeList) => {

    const year = currentFY()
    const [startYear, endYear] = year.split('-').map(Number);
    console.log(year)
    const fyStart = `${startYear}-04-01`;
    const fyEnd = `${endYear}-03-31`;

    const currentFYData = incomeList.filter(income => {
        const dateOnly = income.date.split("T")[0];
        const incomeDateI = (dateOnly);
        return incomeDateI >= fyStart && incomeDateI <= fyEnd;
    });
    return currentFYData;
}

const monthFYData = (expenseList, incomeList) => {

    let itemListE = {}
    let itemListI = {}
    let FY = currentFY()
    let currentFYExpenseList = expenseList.filter(e => e.financialYear === FY)
    let currentFYIncomeList = incomeList.filter(i => i.financialYear === FY)
    currentFYExpenseList.forEach((item) => {
        const month = item.month;
        if (month in itemListE) {
            itemListE[month] += item.amount;
        } else {
            itemListE[month] = item.amount;
        }

    });

    currentFYIncomeList.forEach((item) => {
        const month = item.month;
        if (month in itemListI) {
            itemListI[month] += item.amount;
        } else {
            itemListI[month] = item.amount;
        }
    })

    const allMonths = new Set([
        ...Object.keys(itemListE),
        ...Object.keys(itemListI)
    ]);

    let monthlyData = Array.from(allMonths).map(month => ({
        month,
        expense: itemListE[month] || 0,
        income: itemListI[month] || 0
    }));
    const monthOrder = [
        "April", "May", "June", "July", "August", "September",
        "October", "November", "December", "January", "February", "March"
    ];

    const sortedData = [...monthlyData].sort((a, b) => {
        return monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month);
    });
    return sortedData
}

const categoryData = (expenseList) => {

    let itemListE = {}
    const currentyear = currentFY()
    let listFY = expenseList.filter(e => e.financialYear === currentyear)
    listFY.forEach((item) => {
        const category = item.category;
        if (category in itemListE) {
            itemListE[category] += item.amount;
        } else {
            itemListE[category] = item.amount;
        }

    });


    let monthlyData = Object.entries(itemListE).map(([category, amount]) => {
        return {
            category: category,
            value: amount,
        };
    });
    console.log(monthlyData)
    return monthlyData
}

const currmonthData = (expenseList, incomeList) => {

    const monthlyData = monthFYData(expenseList, incomeList);
    const currentMonth = new Date().toLocaleString('en-US', { month: 'long' });
    const currentData = monthlyData.find(d => d.month === currentMonth);

    if (!currentData) {
        return {
            totalsaving: 0,
            msg: "No data available for this month"
        };
    }
    const income = currentData.income || 0;
    const expense = currentData.expense || 0;
    const totalsaving = income - expense;
    // console.log(totalsaving)
    return {totalsaving, income, expense};
};

export { currentFY, expenseYear, incomeYear, monthFYData, categoryData, currmonthData };
