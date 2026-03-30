
import { useFetchExpenses } from '../../shared/hooks/useFetchExpenses';
import Navbar from '../../shared/components/Navbar';
// import { useAuth } from '../Auth/Authcontext';
import { useFetchIncomes } from '../../shared/hooks/useFetchIncomes';
import { useState } from 'react';
import '../history/history.css';
import Layout from '../../shared/components/Layout';

const Hisotry = () => {

	const {  inerror, inloading, filterIncomes, } = useFetchIncomes();
	const {  exloading, exerror, filterExpense } = useFetchExpenses();
    const [finalList, setfinalList] = useState([])
	const [error, seterror] = useState(false)
	const [msg, setmsg] = useState('')

	const [filters, setFilters] = useState({
		month: '',
		financialYear: ''
	});

	const handleFilterChange = (e) => {
		setFilters(prev => ({ ...prev, [e.target.name]: e.target.value }));
	};


	const handleFilterSubmit = async (e) => {
		e.preventDefault();
		// console.log(filters);
		if (filters.month === '' && filters.financialYear === '') {
			setmsg('Please select at least one filter')
			return
		} else if (filters.month !== '' && filters.financialYear === '') {
			setmsg('Please select a financial year')
			return
		} else if (filters.month === '' && filters.financialYear !== '') {
			setmsg('Please select a month')
			return
		}

		try {
			const expense = await filterExpense(filters.month, filters.financialYear)
			const income = await filterIncomes(filters.month, filters.financialYear)
			setfinalList([...expense, ...income])
		}
		catch (err) {
			seterror(err.response.data.message)
		}
	};

	const [page, setpage] = useState(1)
	const itemsPerPage = 8;
	const startIndex = (page - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const currentList = finalList.slice(startIndex, endIndex);
	const totalPages = Math.ceil(finalList.length / itemsPerPage);
	const startRecord = startIndex + 1;
	const endRecord = Math.min(endIndex, finalList.length);

	// console.log(finalList)

	const handleReset = () => {
		setFilters({ month: '', financialYear: '' });
	};

	return (
		<>
			<Layout><main className='history-main'>
				<div className='page-heading'>
					<h1>History</h1>
				</div>
				<section className='filter-section'>
					<div className='filter-container'>
						<form className="filter-form" onSubmit={handleFilterSubmit}>
							<div className="month">
								{(inloading || exloading) && <p>Loading...</p>}
								<label htmlFor="month">Select Month:</label>
								<select
									id="month"
									name="month"
									value={filters.month}
									onChange={handleFilterChange}>
									<option value="">All Months</option>
									<option value="January">January</option>
									<option value="February">February</option>
									<option value="March">March</option>
									<option value="April">April</option>
									<option value="May">May</option>
									<option value="June">June</option>
									<option value="July">July</option>
									<option value="August">August</option>
									<option value="September">September</option>
									<option value="October">October</option>
									<option value="November">November</option>
									<option value="December">December</option>
								</select>
							</div>

							<div className="financial-year">
								<label htmlFor="financial-year">Select Financial Year:</label>
								<select
									id="financial-year"
									name="financialYear"
									value={filters.financialYear}
									onChange={handleFilterChange}>
									<option value="">All Years</option>
									<option value="2022-2023">2022-2023</option>
									<option value="2023-2024">2023-2024</option>
									<option value="2024-2025">2024-2025</option>
									<option value="2025-2026">2025-2026</option>
								</select>
							</div>

							<div className="filter-actions">
								<button type="submit">Apply Filter</button>
								<button type="button" onClick={handleReset}>Reset</button>
								{msg && <p className='error'>{msg}</p>}
							</div>
						</form>
					</div>
				</section>
				<section className='history-section'>
					<h2> Financial History</h2>
					{finalList.length === 0 ? (<p>No Data available for given Month and Financial year </p>)
						: (
							<table className='history-table'>
								<thead>
									<tr>
										<th>Sr No</th>
										<th>Date</th>
										<th>Description/Remarks</th>
										<th>Month</th>
										<th>Type</th>
										<th colSpan={4}>Amount</th>
									</tr>
								</thead>
								<tbody>
									{currentList.map((item, index) => (
										<tr key={index}>
											<td>{(page - 1) * itemsPerPage + index + 1}</td>
											<td>{new Date(item.date).toLocaleDateString()}</td>
											<td>{item.description || item.remarks}</td>
											<td>{item.month}</td>
											<td>{item.incomeType || item.expenseType}</td>
											{/* <td>{item.category}</td> */}
											<td className={item.incomeType && item.incomeType !== "" ? "income" : "expense"} >
												₹{Number(item.amount).toLocaleString()}
											</td>
										</tr>
									))}
								</tbody>
							</table>
						)}
					{(inerror || exerror || error) && <p className='error'>{inerror || exerror || error}</p>}
					<div className="pagination">
						<button disabled={page === 1} onClick={() => setpage(page - 1)}>Prev</button>
						<span>Page {page} of {totalPages}</span>
						<button disabled={page === totalPages} onClick={() => setpage(page + 1)}>Next</button>
					</div>
					<div className="table-footer">
						<span>
							Showing {startRecord}–{endRecord} of {finalList.length}
						</span>
					</div>
				</section>
			</main ></Layout>

		</>
	);
};

export default Hisotry;
