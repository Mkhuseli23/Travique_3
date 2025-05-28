import React, { useState, useEffect } from "react";
import { db, auth } from "./firebase/firebase";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  onSnapshot,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import "./css/expenses.css";

const Expenses = () => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("General");
  const [expenses, setExpenses] = useState([]);
  const [user, setUser] = useState(null);
  const [editingId, setEditingId] = useState(null);

  // Watch user login
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Listen for changes in expenses
  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "expenses"),
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const userExpenses = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setExpenses(userExpenses);
    }, (error) => {
      console.error("Error fetching expenses:", error);
    });

    return () => unsubscribe();
  }, [user]);

  // Add or Update expense
  const handleSubmit = async () => {
    if (!description || !amount || !user) return;

    const expenseData = {
      description,
      amount: parseFloat(amount),
      category,
      userId: user.uid,
      createdAt: serverTimestamp(),
    };

    try {
      if (editingId) {
        const expenseRef = doc(db, "expenses", editingId);
        await updateDoc(expenseRef, {
          ...expenseData,
          createdAt: serverTimestamp(), // update timestamp
        });
        setEditingId(null);
      } else {
        await addDoc(collection(db, "expenses"), expenseData);
      }
      setDescription("");
      setAmount("");
      setCategory("General");
    } catch (err) {
      console.error("Error adding/updating expense:", err);
    }
  };

  // Delete expense
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "expenses", id));
    } catch (err) {
      console.error("Error deleting expense:", err);
    }
  };

  // Start editing
  const handleEdit = (expense) => {
    setEditingId(expense.id);
    setDescription(expense.description);
    setAmount(expense.amount);
    setCategory(expense.category);
  };

  const total = expenses.reduce((sum, e) => sum + (e.amount || 0), 0);

  return (
    <div className="expenses-container">
      <h2>💸 Expense Tracker</h2>

      <div className="expense-form">
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount (R)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="General">General</option>
          <option value="Food">Food</option>
          <option value="Travel">Travel</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Utilities">Utilities</option>
        </select>
        <button onClick={handleSubmit}>
          {editingId ? "Update" : "Add"}
        </button>
      </div>

      <div className="expense-list">
        {expenses.map((expense) => (
          <div key={expense.id} className="expense-item">
            <span>{expense.description}</span>
            <span>R{expense.amount?.toFixed(2)}</span>
            <span className="category">{expense.category}</span>
            <div className="actions">
              <button onClick={() => handleEdit(expense)}>✏️</button>
              <button onClick={() => handleDelete(expense.id)}>🗑️</button>
            </div>
          </div>
        ))}
      </div>

      <div className="total">Total: R{total.toFixed(2)}</div>
    </div>
  );
};

export default Expenses;
