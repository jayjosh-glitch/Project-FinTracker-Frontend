import React, { useEffect } from 'react';
import { useFetchExpenses } from '../../shared/hooks/useFetchExpenses';
import Navbar from '../../shared/components/Navbar';
import { useState } from 'react';
import '../expense/expense.css';
import { useAuth } from '../auth/Authcontext';


const Expense = () => {

	const { expenseList, glerror, loading, updateExpenses, deleteExpenses } = useFetchExpenses();
	const [expense, setexpense] = useState([]);
	const { currentuser } = useAuth();
	const [edit, setedit] = useState(false)
	const [selectedExpense, setselectedExpense] = useState(null)
	const [showDeleteModal, setShowDeleteModal] = useState(false)
	const [expenseToDelete, setExpenseToDelete] = useState(null)


	console.log(expenseList)
	useEffect(() => {
		const getUserExpense = () => {
			if (currentuser) {
				const userExpense = expenseList;
				setexpense(userExpense);
			}
		};
		getUserExpense();
	}, [currentuser, expenseList]);

	//Adding pagees for expense list to avoid everything on single page
	const [page, setpage] = useState(1)
	const itemsPerPage = 8;
	const startIndex = (page - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const currentExpenseList = expense.slice(startIndex, endIndex);
	const totalPages = Math.ceil(expense.length / itemsPerPage);
	const startRecord = startIndex + 1;
	const endRecord = Math.min(endIndex, expense.length);


	const handleEdit = (expense) => {
		setedit(true)
		setselectedExpense(expense)
	}

	const handleUpdateSubmit = async () => {
		// call update function here with selectedExpense data
		console.log(selectedExpense)
		const updatedExpense = {
			id: selectedExpense.id,
			date: new Date(selectedExpense.date).toISOString(), expenseType: selectedExpense.expenseType,
			description: selectedExpense.description,
			amount: selectedExpense.amount,
			month: selectedExpense.month,
			financialYear: selectedExpense.financialYear,
			category: selectedExpense.category
		}
		await updateExpenses(selectedExpense.id, updatedExpense)
		setedit(false)
		// 	await addExpenses(selectedExpense)
	}

	const handleDeleteConfirm = async () => {
		await deleteExpenses(expenseToDelete.id)
		setShowDeleteModal(false)
		setExpenseToDelete(null)
	}
	return (
		<>
			<Navbar />
			<main className='expense-main'>
				<h1>Expense Page</h1>
				{loading && <p>Loading...</p>}
				<section className='expense-section'>
					<table className='expense-table'>
						<thead>
							<tr>
								<th>Sr No</th>
								<th>Date</th>
								<th>Month</th>
								<th>Expense Type</th>
								<th>Description</th>
								<th>Amount</th>
								<th colSpan={3}></th>
							</tr>
						</thead>
						<tbody>
							{currentExpenseList.map((expense, index) => (
								<tr key={expense.id}>
									<td>{(page - 1) * itemsPerPage + index + 1}</td>
									<td>{new Date(expense.date).toLocaleDateString()}</td>
									<td>{expense.month}</td>
									<td>{expense.expenseType}</td>
									<td>{expense.description}</td>
									<td>${expense.amount}</td>
									<td><button className='update' onClick={() => handleEdit(expense)} >Update</button></td>
									<td><button
										className="delete"
										id='delete'
										onClick={() => {
											setExpenseToDelete(expense)
											setShowDeleteModal(true)
										}}
									>
										Delete
									</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
					{glerror && <p className='error'>{glerror}</p>}
					{!loading && expenseList.length === 0 && <p>No expenses found.</p>}
					<div className="pagination">
						<button disabled={page === 1} onClick={() => setpage(page - 1)}>Prev</button>
						<span>Page {page} of {totalPages}</span>
						<button disabled={page === totalPages} onClick={() => setpage(page + 1)}>Next</button>
					</div>
					<div className="table-footer">
						<span>
							Showing {startRecord}–{endRecord} of {expense.length} expenses
						</span>
					</div>
				</section>


				{edit && selectedExpense && (
					<div className="modal-overlay">
						<div className="modal">

							<h2>Edit Expense</h2>

							<input
								type="date"
								value={selectedExpense.date?.split("T")[0]}
								onChange={(e) =>
									setselectedExpense({ ...selectedExpense, date: e.target.value })
								}
							/>

							<input
								placeholder="Month"
								value={selectedExpense.month}
								onChange={(e) =>
									setselectedExpense({ ...selectedExpense, month: e.target.value })
								}
							/>

							<input
								placeholder="Expense Type"
								value={selectedExpense.expenseType}
								onChange={(e) =>
									setselectedExpense({ ...selectedExpense, expenseType: e.target.value })
								}
							/>

							<input
								placeholder="Description"
								value={selectedExpense.description}
								onChange={(e) =>
									setselectedExpense({ ...selectedExpense, description: e.target.value })
								}
							/>

							<input
								placeholder="Amount"
								type="number"
								value={selectedExpense.amount}
								onChange={(e) =>
									setselectedExpense({ ...selectedExpense, amount: e.target.value })
								}
							/>

							<div className="modal-buttons">

								<button
									type="button"
									disabled={loading}
									onClick={handleUpdateSubmit}
									className="update-btn"
								>
									{loading ? <span className="loader"></span> : "Update"}
								</button>

								<button
									type="button"
									className="cancel-btn"
									onClick={() => setedit(false)}
								>
									Cancel
								</button>

							</div>

						</div>
					</div>
				)}

				{showDeleteModal && expenseToDelete && (
					<div className="delete-overlay">
						<div className="delete-modal">

							<h3>Confirm Delete</h3>

							<p>
								Are you sure you want to delete this expense?
							</p>

							<div className="delete-details">
								<p><strong>Type:</strong> {expenseToDelete.expenseType}</p>
								<p><strong>Description:</strong> {expenseToDelete.description}</p>
								<p><strong>Amount:</strong> ${expenseToDelete.amount}</p>
								<p><strong>Date:</strong> {new Date(expenseToDelete.date).toLocaleDateString()}</p>
							</div>

							<div className="delete-buttons">

								<button
									className="confirm-delete"
									onClick={handleDeleteConfirm}
								>
									Delete
								</button>

								<button
									className="cancel-delete"
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

export default Expense;