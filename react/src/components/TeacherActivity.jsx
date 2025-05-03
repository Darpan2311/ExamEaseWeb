import React, { useEffect, useState } from "react";
import axiosInstance from "../axiosConfig";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from "recharts";

const TeacherActivityChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axiosInstance.get("/api/exams/teacher/activity")  // Adjust the URL if needed
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.error("Error fetching teacher activity data", err);
      });
  }, []);

  return (
    <div style={{ width: '100%', height: 300 }}>
      <h2>Exam Activity Overview</h2>
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="examName" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="submissionCount" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TeacherActivityChart;
