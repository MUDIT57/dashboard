"use client";
import { useBookmark } from "@/context/BookmarkContext";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

export default function SimpleAnalytics() {
  const { allEmployees } = useBookmark();
  const getDepartmentRatings = () => {
    const departments = ["HR", "Engineering", "Marketing", "Sales", "Finance"];
    const departmentStats = {};
    

    departments.forEach(dept => {
      departmentStats[dept] = {
        count: 0,
        totalRating: 0
      };
    });
    

    allEmployees.forEach(employee => {
      if (departments.includes(employee.department) && employee.rating) {
        departmentStats[employee.department].count++;
        departmentStats[employee.department].totalRating += employee.rating;
      }
    });
    
    const labels = [];
    const averages = [];
    const backgroundColors = [];
    
    departments.forEach(dept => {
      if (departmentStats[dept].count > 0) {
        labels.push(dept);
        const avg = departmentStats[dept].totalRating / departmentStats[dept].count;
        averages.push(parseFloat(avg.toFixed(1))); 
        
        const hue = (avg / 5) * 120; 
        backgroundColors.push(`hsl(${hue}, 70%, 60%)`);
      }
    });
    
    return {
      labels,
      datasets: [{
        label: "Average Rating",
        data: averages,
        backgroundColor: backgroundColors,
        borderColor: "rgba(0, 0, 0, 0.1)",
        borderWidth: 1
      }]
    };
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Department Analytics</h1>
      
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="font-semibold mb-3">Department-wise Average Ratings</h2>
        <div className="h-96"> 
          <Bar 
            data={getDepartmentRatings()}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                y: {
                  beginAtZero: true,
                  max: 5,
                  title: {
                    display: true,
                    text: 'Average Rating (1-5)'
                  }
                },
                x: {
                  title: {
                    display: true,
                    text: 'Department'
                  }
                }
              },
              plugins: {
                tooltip: {
                  callbacks: {
                    label: (context) => {
                      return `Avg: ${context.raw}`;
                    }
                  }
                }
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}