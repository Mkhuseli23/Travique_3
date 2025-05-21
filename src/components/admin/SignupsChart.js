// src/components/admin/charts/SignupsChart.js

import React, { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { db } from '../firebase/firebase'; // adjust path if needed
import { collection, getDocs } from 'firebase/firestore';

const SignupsChart = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchSignups = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'users'));
        const monthCounts = Array(12).fill(0); // [Jan, Feb, ..., Dec]

        snapshot.forEach((doc) => {
          const data = doc.data();
          const createdAt = data.createdAt?.toDate?.(); // Convert Firestore timestamp

          if (createdAt) {
            const monthIndex = createdAt.getMonth(); // 0 = Jan, 11 = Dec
            monthCounts[monthIndex]++;
          }
        });

        const monthNames = [
          'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
          'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
        ];

        const formattedData = monthNames.map((month, index) => ({
          month,
          signups: monthCounts[index],
        }));

        setChartData(formattedData);
      } catch (error) {
        console.error('Error fetching signup data:', error);
      }
    };

    fetchSignups();
  }, []);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="signups"
          stroke="#246071"
          strokeWidth={2.5}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default SignupsChart;
