import React, { useEffect, useState } from 'react'
import { monthFYData, categoryData, currmonthData } from '../../domain/dashBoardData.js'
import { useFetchExpenses } from '../../shared/hooks/useFetchExpenses'
import { useFetchIncomes } from '../../shared/hooks/useFetchIncomes.jsx';
import MonthlyFinanceChart from '../dashboard/MonthlyFinanceChart'
import ExpensePieChart from '../dashboard/ExpensePieChart'
import '../dashboard/dashboard.css';
import Layout from '../../shared/components/Layout.jsx';
import { useAuth } from '../auth/Authcontext.jsx'

const Dashboard = () => {

    const { expenseList } = useFetchExpenses();
    const { incomeList } = useFetchIncomes();
    const [monthlyData, setmonthlyData] = useState([])
    const [expenseCategory, setexpenseCategory] = useState([])
    const { currentuser } = useAuth()
    const monthData = currmonthData(expenseList, incomeList);

    useEffect(() => {
        const fetchData = () => {
            if (expenseList.length === 0 || incomeList.length === 0) {
                // console.log("Loading data...")
                return;
            } else {
                const monthFYDataList = monthFYData(expenseList, incomeList);
                const categoryMonthlydata = categoryData(expenseList)
                // console.log(monthFYDataList);
                setmonthlyData(monthFYDataList)
                setexpenseCategory(categoryMonthlydata)
            }
        }
        fetchData()
    }, [expenseList, incomeList])

    return (
        <>
            <Layout>
                <main className='dashboard'>
                    <section className='header-section'>
                        <div className='title'>
                            <h2>Welcome {currentuser.firstname + currentuser.lastname}</h2>
                            <p>Here’s your financial summary for this month</p>
                        </div>
                    </section>
                    <section className='numbers-section'>
                        <div className='expense-box'>
                            <h2>
                                <span>
                                    {monthData.expense}
                                </span>
                            </h2>
                            <p>
                                {monthData.expense > 0 ? "Total Expense for this month" : "No Expense Found"}
                            </p>
                        </div>
                        <div className='income-box'>
                            <h2>
                                <span >
                                    {monthData.income}
                                </span>
                            </h2>
                            <p>
                                {monthData.income > 0 ? "Total Income for this month" : "No Income found for this month"}
                            </p>
                        </div>
                        <div className='saving-box'>
                            <h2>
                                <span
                                    className={
                                        monthData.totalsaving > 0
                                            ? "green-text"
                                            : monthData.totalsaving < 0
                                                ? "red-text"
                                                : "neutral-text"
                                    }>
                                    {monthData.totalsaving > 0
                                        ? `₹${monthData.totalsaving}`
                                        : monthData.totalsaving < 0
                                            ? `-₹${Math.abs(monthData.totalsaving)}`
                                            : `₹0`
                                    }
                                </span>
                            </h2>
                            <p>
                                {monthData.totalsaving > 0
                                    ? "Saved this month"
                                    : monthData.totalsaving < 0
                                        ? "Overspent this month"
                                        : "No savings this month"}
                            </p>
                        </div>
                    </section>
                    <section className='chart-section'>
                        <div className='dashboard-container'>
                            <h2>Financial Overview</h2>
                            <div className="charts-row">
                                <div className="chart-card">
                                    <h2>Current FY Chart</h2>
                                    <MonthlyFinanceChart sortedData={monthlyData} />
                                </div>
                                <div className="chart-card">
                                    <h3>Expense Breakdown for current FY</h3>
                                    <ExpensePieChart expenseCategory={expenseCategory} />
                                </div>
                            </div>
                        </div>
                    </section>

                </main>

            </Layout>
        </>

    )
}

export default Dashboard