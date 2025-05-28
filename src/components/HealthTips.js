import React, { useEffect, useState } from "react";
import "./css/healthtips.css";

import { db } from "./firebase/firebase"; // Adjust path if needed
import { collection, getDocs, query, orderBy } from "firebase/firestore";

const HealthTips = () => {
  const [tips, setTips] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTips = async () => {
      try {
        const q = query(collection(db, "health_tips"), orderBy("timestamp", "desc"));
        const snapshot = await getDocs(q);

        const categorizedTips = {};

        snapshot.forEach(doc => {
          const data = doc.data();
          const category = data.category || "Uncategorized";
          if (!categorizedTips[category]) {
            categorizedTips[category] = [];
          }
          categorizedTips[category].push(data.title + ": " + data.description);
        });

        setTips(categorizedTips);
      } catch (error) {
        console.error("Error fetching health tips:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTips();
  }, []);

  if (loading) return <p>Loading health tips...</p>;

  return (
    <div className="health-tips-container">
      <h2>🧠 Health & Wellness Tips</h2>

      {Object.entries(tips).map(([category, tipList]) => (
        <div key={category} className="tip-section">
          <h3>{category.replace(/([A-Z])/g, " $1").trim()}</h3>
          <ul>
            {tipList.map((tip, index) => (
              <li key={index}>✅ {tip}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default HealthTips;
