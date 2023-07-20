import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";

const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({
    item: "",
    date: "",
    amount: "",
    category: "Food and Drink"
  });
  const [editIndex, setEditIndex] = useState(-1);

  const handleInputChange = (e) => {
    setNewExpense({
      ...newExpense,
      [e.target.name]: e.target.value
    });
  };

  const addExpense = () => {
    const { item, date, amount, category } = newExpense;
    if (item.trim() !== "" && date !== "" && amount !== "") {
      if (editIndex !== -1) {
        const updatedExpenses = [...expenses];
        updatedExpenses[editIndex] = newExpense;
        setExpenses(updatedExpenses);
        setEditIndex(-1);
      } else {
        setExpenses([...expenses, newExpense]);
      }
      setNewExpense({
        item: "",
        date: "",
        amount: "",
        category: "Food and Drink"
      });
    }
  };

  const deleteExpense = (index) => {
    const updatedExpenses = [...expenses];
    updatedExpenses.splice(index, 1);
    setExpenses(updatedExpenses);
  };

  const editExpense = (index) => {
    const expenseToEdit = expenses[index];
    setNewExpense(expenseToEdit);
    setEditIndex(index);
  };

  return (
    <div className="expense-tracker">
      <h1 className="Header">Expense Tracker</h1>
      <Container>
        <Row>
          <Col md={6}>
            <div className="input-section">
              <input
                type="text"
                placeholder="Item or service"
                name="item"
                value={newExpense.item}
                onChange={handleInputChange}
                className="input"
              />
              <br />
              <input
                type="date"
                name="date"
                value={newExpense.date}
                onChange={handleInputChange}
                className="input"
              />
              <br />
              <input
                type="number"
                placeholder="Amount paid"
                name="amount"
                value={newExpense.amount}
                onChange={handleInputChange}
                className="input"
              />
              <br />
              <select
                name="category"
                value={newExpense.category}
                onChange={handleInputChange}
                className="input"
              >
                <option value="Food and Drink">Food and Drink</option>
                <option value="Accommodation">Accommodation</option>
                <option value="Transportation">Transportation</option>
                <option value="Housing and Rent">Housing and Rent</option>
                <option value="Miscellaneous">Miscellaneous</option>
              </select>
              <br />
              <button onClick={addExpense} className="Add">
                {editIndex !== -1 ? "Update" : "Add"}
              </button>
            </div>
          </Col>
          <Col md={6}>
            <ul>
              {expenses.map((expense, index) => (
                <li key={index}>
                  <div>
                    <strong>Item or Service:</strong> {expense.item}
                  </div>
                  <div>
                    <strong>Date Purchased:</strong> {expense.date}
                  </div>
                  <div>
                    <strong>Amount Paid:</strong> {expense.amount}
                  </div>
                  <div>
                    <strong>Category:</strong> {expense.category}
                  </div>
                  <div className="actions">
                    <button
                      onClick={() => editExpense(index)}
                      className="Edit"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteExpense(index)}
                      className="Delete"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ExpenseTracker;
