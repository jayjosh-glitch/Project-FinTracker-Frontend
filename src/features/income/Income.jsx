import React from 'react';
import { useEffect } from 'react';
import { useFetchIncomes } from '../../shared/hooks/useFetchIncomes';
import Navbar from '../../shared/components/Navbar';
import { useAuth } from '../auth/Authcontext';
import { useState } from 'react';
import '../income/income.css';

const Income = () => {

	const { incomeList, glerror, loading, updateIncomes, deleteIncomes, addIncomes } = useFetchIncomes();
	const [income, setincome] = useState([]);
	const { currentuser } = useAuth();
	const [edit, setedit] = useState(false)
	const [selectedIncome, setselectedIncome] = useState(null)
	const [showDeleteModal, setShowDeleteModal] = useState(false)
	const [incomeToDelete, setIncomeToDelete] = useState(null)
	const [add, setadd] = useState(false)
	const [newIncome, setnewIncome] = useState({
		incomeType: "",
		amount: 0,
		date: "",
		month: "",
		remarks: "",
		financialYear: ""
	})
	console.log(incomeList)

	useEffect(() => {
		const getUserIncome = () => {
			if (currentuser) {
				const userIncome = incomeList
				setincome(userIncome);
			}
		};
		getUserIncome();
	}, [currentuser, incomeList]);

	//Adding pagees for expense list to avoid everything on single page
	const [page, setpage] = useState(1)
	const itemsPerPage = 8;
	const startIndex = (page - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const currentIncomeList = income.slice(startIndex, endIndex);
	const totalPages = Math.ceil(income.length / itemsPerPage);
	const startRecord = startIndex + 1;
	const endRecord = Math.min(endIndex, income.length);

	const handleEdit = (income) => {
		setedit(true)
		setselectedIncome(income)
	}

	const handleaddExpense = async () => {
		const addIncome = {
			date: newIncome.date,
			incomeType: newIncome.incomeType,
			remarks: newIncome.remarks,
			amount: Number(newIncome.amount),
			month: newIncome.month,
			financialYear: newIncome.financialYear,
		}
		console.log(addIncome)
		await addIncomes(addIncome)
		setadd(false)
	}

	const handleUpdateSubmit = async () => {
		// call update function here with selectedExpense data
		console.log(setselectedIncome)
		const updatedIncome = {
			id: setselectedIncome.id,
			date: new Date(setselectedIncome.date).toISOString(), incomeType: setselectedIncome.incomeType,
			remarks: setselectedIncome.remarks,
			amount: setselectedIncome.amount,
			month: setselectedIncome.month,
			financialYear: setselectedIncome.financialYear,
			category: setselectedIncome.category
		}
		await updateIncomes(setselectedIncome.id, updatedIncome)
		setedit(false)
		// 	await addExpenses(selectedExpense)
	}

	const handleDeleteConfirm = async () => {
		await deleteIncomes(incomeToDelete.id)
		setShowDeleteModal(false)
		setIncomeToDelete(null)
	}

	return (
		<>
			<Navbar />
			<main className='income-main'>
                  <h1>Income Page</h1>
				{loading && <p>Loading...</p>}
				<section className='income-section'>
					<table className='income-table'>
						<thead>
							<tr>
								<th>Sr No</th>
								<th>Date</th>
								<th>Month</th>
								<th>Income Type</th>
								<th>remarks</th>
								<th>Amount</th>
								<th colSpan={3}></th>
							</tr>
						</thead>
						<tbody>
							{currentIncomeList.map((income, index) => (
								<tr key={income.id}>
									<td>{(page - 1) * itemsPerPage + index + 1}</td>
									<td>{new Date(income.date).toLocaleDateString('en-GB').replace(/\//g, '-')}</td>
									<td>{income.month}</td>
									<td>{income.incomeType}</td>
									<td>{income.remarks}</td>
									<td>₹{income.amount}</td>
									<td><button className='update' onClick={() => handleEdit(income)}>Update</button></td>
									<td><button className='delete' onClick={() => {
										setIncomeToDelete(income)
										setShowDeleteModal(true)
									}} >Delete</button></td>
								</tr>
							))}
						</tbody>
					</table>
					{glerror && <p className='error'>{glerror}</p>}
					{!loading && incomeList.length === 0 && <p>No incomes found.</p>}
					<div className="pagination">
						<button disabled={page === 1} onClick={() => setpage(page - 1)}>Prev</button>
						<span>Page {page} of {totalPages}</span>
						<button disabled={page === totalPages} onClick={() => setpage(page + 1)}>Next</button>
					</div>
					<div className="table-footer">
						<span>
							Showing {startRecord}–{endRecord} of {income.length} incomes
						</span>
					</div>
				</section>

				<div className='incomeAdd-container'>
					<button className="incomeAdd-btn" onClick={() => setadd(true)}>Add Income</button>
				</div>

				{add && (
					<div className="incomeModal-overlay">
						<div className="incomeModal-container">

							<h2 className="incomeModal-title">Add Income</h2>

							<input
								className="incomeModal-input"
								type="date"
								value={newIncome.date?.split("T")[0]}
								onChange={(e) =>
									setnewIncome({ ...newIncome, date: e.target.value })
								}
							/>

							<input
								className="incomeModal-input"
								placeholder="Month"
								value={newIncome.month}
								onChange={(e) =>
									setnewIncome({ ...newIncome, month: e.target.value })
								}
							/>

							<input
								className="incomeModal-input"
								placeholder="Income Type"
								value={newIncome.incomeType}
								onChange={(e) =>
									setnewIncome({ ...newIncome, incomeType: e.target.value })
								}
							/>

							<input
								className="incomeModal-input"
								placeholder="Remarks"
								value={newIncome.remarks}
								onChange={(e) =>
									setnewIncome({ ...newIncome, remarks: e.target.value })
								}
							/>

							<input
								className="incomeModal-input"
								placeholder="Amount"
								type="number"
								value={newIncome.amount}
								onChange={(e) =>
									setnewIncome({ ...newIncome, amount: e.target.value })
								}
							/>

							<input
								className="incomeModal-input"
								placeholder="Financial Year"
								type="text"
								value={newIncome.financialYear}
								onChange={(e) =>
									setnewIncome({ ...newIncome, financialYear: e.target.value })
								}
							/>

							<div className="incomeModal-actions">

								<button
									type="button"
									disabled={loading}
									onClick={handleaddExpense}
									className="incomeAddConfirm-btn"
								>
									{loading ? <span className="incomeLoader"></span> : "Add"}
								</button>

								<button
									type="button"
									className="incomeCancel-btn"
									onClick={() => setadd(false)}
								>
									Cancel
								</button>

							</div>

						</div>
					</div>
				)}

				{edit && selectedIncome && (
					<div className="incomeModal-overlay">
						<div className="incomeModal-container">

							<h2 className="incomeModal-title">Edit Income</h2>

							<input
								className="incomeModal-input"
								type="date"
								value={selectedIncome.date?.split("T")[0]}
								onChange={(e) =>
									setselectedIncome({ ...selectedIncome, date: e.target.value })
								}
							/>

							<input
								className="incomeModal-input"
								placeholder="Month"
								value={selectedIncome.month}
								onChange={(e) =>
									setselectedIncome({ ...selectedIncome, month: e.target.value })
								}
							/>

							<input
								className="incomeModal-input"
								placeholder="Income Type"
								value={selectedIncome.incomeType}
								onChange={(e) =>
									setselectedIncome({ ...selectedIncome, incomeType: e.target.value })
								}
							/>

							<input
								className="incomeModal-input"
								placeholder="Description"
								value={selectedIncome.remarks}
								onChange={(e) =>
									setselectedIncome({ ...selectedIncome, remarks: e.target.value })
								}
							/>

							<input
								className="incomeModal-input"
								placeholder="Amount"
								type="number"
								value={selectedIncome.amount}
								onChange={(e) =>
									setselectedIncome({ ...selectedIncome, amount: e.target.value })
								}
							/>

							<div className="incomeModal-actions">

								<button
									type="button"
									disabled={loading}
									onClick={handleUpdateSubmit}
									className="incomeUpdate-btn"
								>
									{loading ? <span className="incomeLoader"></span> : "Update"}
								</button>

								<button
									type="button"
									className="incomeCancel-btn"
									onClick={() => setedit(false)}
								>
									Cancel
								</button>

							</div>

						</div>
					</div>
				)}

				{showDeleteModal && incomeToDelete && (
					<div className="incomeDelete-overlay">
						<div className="incomeDelete-modal">

							<h3 className="incomeDelete-title">Confirm Delete</h3>

							<p>Are you sure you want to delete this income?</p>

							<div className="incomeDelete-details">
								<p><strong>Type:</strong> {incomeToDelete.incomeType}</p>
								<p><strong>Description:</strong> {incomeToDelete.remarks}</p>
								<p><strong>Amount:</strong> ${incomeToDelete.amount}</p>
								<p><strong>Date:</strong> {new Date(incomeToDelete.date).toLocaleDateString()}</p>
							</div>

							<div className="incomeDelete-actions">

								<button
									className="incomeDelete-confirm"
									onClick={handleDeleteConfirm}
								>
									Delete
								</button>

								<button
									className="incomeDelete-cancel"
									onClick={() => setShowDeleteModal(false)}
								>
									Cancel
								</button>

							</div>

						</div>
					</div>
				)}
			</main>
		</>
	);
};

export default Income;
