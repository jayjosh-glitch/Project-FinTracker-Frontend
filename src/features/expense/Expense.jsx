import { useState } from 'react';
import { useFetchExpenses } from '../../shared/hooks/useFetchExpenses';
import Layout from '../../shared/components/Layout';
import '../expense/expense.css';

const Expense = () => {

  const { expenseList, exloading, updateExpenses, deleteExpenses, addExpenses } = useFetchExpenses();
  console.log(exloading)
  const [error, setError] = useState(null);
  const [edit, setedit] = useState(false);
  const [add, setadd] = useState(false);
  const [selectedExpense, setselectedExpense] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [expenseToDelete, setExpenseToDelete] = useState(null);

  const [newExpense, setnewExpense] = useState({
    expenseType: "",
    amount: 0,
    date: "",
    month: "",
    category: "",
    description: "",
    financialYear: ""
  });

  const expense = expenseList;

  const [page, setpage] = useState(1);
  const itemsPerPage = 8;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentExpenseList = expense.slice(startIndex, endIndex);
  const totalPages = Math.ceil(expense.length / itemsPerPage);
  const startRecord = startIndex + 1;
  const endRecord = Math.min(endIndex, expense.length);

  const handleEdit = (expense) => {
    setedit(true);
    setselectedExpense(expense);
  };

  const handleaddExpense = async () => {
    try {
      const payload = {
        date: newExpense.date,
        expenseType: newExpense.expenseType,
        description: newExpense.description,
        amount: Number(newExpense.amount),
        month: newExpense.month,
        financialYear: newExpense.financialYear,
        category: newExpense.category
      };

      await addExpenses(payload);
      setadd(false);
      setError(null);

    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  const handleUpdateSubmit = async () => {
    try {
      const updatedExpense = {
        id: selectedExpense.id,
        date: new Date(selectedExpense.date).toISOString(),
        expenseType: selectedExpense.expenseType,
        description: selectedExpense.description,
        amount: selectedExpense.amount,
        month: selectedExpense.month,
        financialYear: selectedExpense.financialYear,
        category: selectedExpense.category
      };

      await updateExpenses(selectedExpense.id, updatedExpense);
      setedit(false);
      setError(null);

    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteExpenses(expenseToDelete.id);
      setShowDeleteModal(false);
      setExpenseToDelete(null);
      setError(null);

    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  return (
    <Layout>
      <main className='expense-main'>

        <h1>Expense Page</h1>

        {exloading && <p>Loading...</p>}
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
                <th colSpan={2}></th>
              </tr>
            </thead>

            <tbody>
              {currentExpenseList.map((expense, index) => (
                <tr key={expense.id}>
                  <td>{(page - 1) * itemsPerPage + index + 1}</td>
                  <td>
                    {new Date(expense.date)
                      .toLocaleDateString('en-GB')
                      .replace(/\//g, '-')}
                  </td>
                  <td>{expense.month}</td>
                  <td>{expense.expenseType}</td>
                  <td>{expense.description}</td>
                  <td>₹{expense.amount}</td>

                  <td>
                    <button
                      className='update'
                      onClick={() => handleEdit(expense)}
                    >
                      Update
                    </button>
                  </td>

                  <td>
                    <button
                      className='delete'
                      onClick={() => {
                        setExpenseToDelete(expense);
                        setShowDeleteModal(true);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!exloading && expense.length === 0 && <p>No expenses found.</p>}
          {error && <p className='error'>{error}</p>}
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

        <div className='expenseAdd-container'>
          <button className='expenseAdd-btn' onClick={() => setadd(true)}>Add Expense</button>
        </div>

        {edit && selectedExpense && (
          <div className="expenseModal-overlay">
            <div className="expenseModal-container">

              <h2>Edit Expense</h2>

              <input
                type="date"
                value={selectedExpense.date?.split("T")[0]}
                onChange={(e) =>
                  setselectedExpense({ ...selectedExpense, date: e.target.value })
                }
              />

              <input
                value={selectedExpense.month}
                onChange={(e) =>
                  setselectedExpense({ ...selectedExpense, month: e.target.value })
                }
              />

              <input
                value={selectedExpense.expenseType}
                onChange={(e) =>
                  setselectedExpense({ ...selectedExpense, expenseType: e.target.value })
                }
              />

              <input
                value={selectedExpense.description}
                onChange={(e) =>
                  setselectedExpense({ ...selectedExpense, description: e.target.value })
                }
              />

              <input
                type="number"
                value={selectedExpense.amount}
                onChange={(e) =>
                  setselectedExpense({ ...selectedExpense, amount: e.target.value })
                }
              />

              <button onClick={handleUpdateSubmit}>
                {exloading ? "Updating..." : "Update"}
              </button>

              <button onClick={() => setedit(false)}>Cancel</button>
            </div>
          </div>
        )}

        {showDeleteModal && expenseToDelete && (
          <div className="expenseDelete-overlay">
            <div className="expenseDelete-modal">

              <h3 className="expenseDelete-title">Confirm Delete</h3>

              <p className="expenseDelete-text">
                Are you sure you want to delete this expense?
              </p>

              <div className="expenseDelete-details">
                <p><strong>Type:</strong> {expenseToDelete.expenseType}</p>
                <p><strong>Description:</strong> {expenseToDelete.description}</p>
                <p><strong>Amount:</strong> ${expenseToDelete.amount}</p>
                <p><strong>Date:</strong> {new Date(expenseToDelete.date).toLocaleDateString()}</p>
              </div>

              <div className="expenseDelete-actions">

                <button
                  className="expenseDelete-confirm"
                  onClick={handleDeleteConfirm}
                >
                  Delete
                </button>

                <button
                  className="expenseDelete-cancel"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>

              </div>

            </div>
          </div>
        )}

        {add && (
          <div className="expenseModal-overlay">
            <div className="expenseModal-container">

              <h2>Add Expense</h2>

              <input type="date"
                value={newExpense.date}
                onChange={(e) =>
                  setnewExpense({ ...newExpense, date: e.target.value })
                }
              />

              <input
                placeholder="Month"
                value={newExpense.month}
                onChange={(e) =>
                  setnewExpense({ ...newExpense, month: e.target.value })
                }
              />

              <input
                placeholder="Expense Type"
                value={newExpense.expenseType}
                onChange={(e) =>
                  setnewExpense({ ...newExpense, expenseType: e.target.value })
                }
              />

              <input
                placeholder="Description"
                value={newExpense.description}
                onChange={(e) =>
                  setnewExpense({ ...newExpense, description: e.target.value })
                }
              />

              <input
                type="number"
                value={newExpense.amount}
                onChange={(e) =>
                  setnewExpense({ ...newExpense, amount: e.target.value })
                }
              />

              <input
                placeholder="Financial Year"
                value={newExpense.financialYear}
                onChange={(e) =>
                  setnewExpense({ ...newExpense, financialYear: e.target.value })
                }
              />

              <select
                value={newExpense.category}
                onChange={(e) =>
                  setnewExpense({ ...newExpense, category: e.target.value })
                }
              >
                <option value="">Select Category</option>
                <option value="Food">Food</option>
                <option value="Health">Health</option>
                <option value="Utilities">Utilities</option>
                <option value="Transportation">Transportation</option>
                <option value="Other">Other</option>
              </select>

              <button onClick={() => setadd(false)}>Cancel</button>
              <button onClick={handleaddExpense}>Save Expense</button>

            </div>
          </div>
        )}

      </main>
    </Layout>
  );
};

export default Expense;