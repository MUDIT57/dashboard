"use client";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { useSelector } from "react-redux";

Chart.register(...registerables);

export default function SimpleAnalytics() {
  const employees=useSelector((state)=>state.user.employees)||[];

  const getDepartmentRatings = () => {
    const departments = ["HR", "Engineering", "Marketing", "Sales", "Finance"];
    const departmentStats = {};

    departments.forEach(dept => {
      departmentStats[dept] = {
        count: 0,
        totalRating: 0
      };
    });

    employees.forEach(employee => {
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
        borderWidth: 1,
        borderRadius: 8,
        barThickness: 40
      }]
    };
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-purple-800">
        📊 Department Analytics
      </h1>

      <div className="bg-gradient-to-br from-white to-purple-50 p-6 rounded-xl shadow-lg">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">
          Department-wise Average Ratings
        </h2>

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
                    text: 'Average Rating (1-5)',
                    color: '#555',
                    font: { size: 14 }
                  },
                  ticks: {
                    stepSize: 1
                  },
                  grid: {
                    color: '#eee'
                  }
                },
                x: {
                  title: {
                    display: true,
                    text: 'Department',
                    color: '#555',
                    font: { size: 14 }
                  },
                  grid: {
                    display: false
                  }
                }
              },
              plugins: {
                tooltip: {
                  callbacks: {
                    label: (context) => `Avg: ${context.raw}`
                  }
                },
                legend: {
                  display: false
                }
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
