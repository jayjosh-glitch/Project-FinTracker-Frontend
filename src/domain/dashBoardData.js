
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

    // const financialYear = currentFY();
    const year = '2023-2024'
    const [startYear, endYear] = year.split('-').map(Number);
    // console.log(expenseList)
    const fyStart = `${startYear}-04-01`;
    const fyEnd = `${endYear}-03-31`;
    const currentFYData = expenseList.filter(expense => {
        const expenseDate = expense.date.split("T")[0];
        return expenseDate >= fyStart && expenseDate <= fyEnd;
    });
    // console.log(currentFYData[0])
    return currentFYData;
}

const incomeYear = (incomeList) => {

    // const financialYear = currentFY();
    const year = '2023-2024'
    const [startYear, endYear] = year.split('-').map(Number);
    // console.log(incomeList)
    const fyStart = `${startYear}-04-01`;
    const fyEnd = `${endYear}-03-31`;

    const currentFYData = incomeList.filter(income => {
        const dateOnly = income.date.split("T")[0];
        const incomeDateI = (dateOnly);
        return incomeDateI >= fyStart && incomeDateI <= fyEnd;
    });
    // console.log(currentFYData[0])
    return currentFYData;
}

const monthFYData = (expenseList, incomeList) => {
    let itemListE = {}
    let itemListI = {}
    let FY = currentFY()
    let currentFYExpenseList = expenseList.filter(e => e.financialYear === FY)
    let currentFYIncomeList = incomeList.filter(i => i.financialYear === FY)
    console.log(currentFYExpenseList)
    console.log(currentFYIncomeList)
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


    let monthlyData = Object.entries(itemListE).map(([month, amount]) => {
        return {
            month: month,
            expense: amount,
            income: itemListI[month]
        };
    });
    console.log(monthlyData)
    const monthOrder = [
        "April", "May", "June", "July", "August", "September",
        "October", "November", "December", "January", "February", "March"
    ];

    const sortedData = [...monthlyData].sort((a, b) => {
        return monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month);
    });
    console.log(sortedData)
    return sortedData
}

const categoryData = (expenseList) => {

    let itemListE = {}
    expenseList.forEach((item) => {
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
    return monthlyData
}

export { currentFY, expenseYear, incomeYear, monthFYData, categoryData };
