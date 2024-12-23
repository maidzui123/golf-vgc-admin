import { Pie } from "react-chartjs-2";

const PieChart = ({ data }) => {
  const PieOption = {
    data: {
      datasets: [
        {
          data: data?.bestSellingProduct?.map((selling) => selling.count),
          backgroundColor: ["#10B981", "#3B82F6", "#F97316", "#0EA5E9"],
          label: "Dataset 1",
        },
      ],
      labels: data?.bestSellingProduct?.map((selling) => selling._id),
    },
    options: {
      responsive: true,
      cutoutPercentage: 80,
      plugins: {
        legend: {
          position: "top", // or 'bottom', 'left', 'right'
          align: "start", // or 'center', 'end'
          labels: {
            font: {
              size: 15,
            },
          },
        },
      },
    },
  };

  return (
    <div>
      <Pie {...PieOption} className="chart" />
    </div>
  );
};

export default PieChart;
