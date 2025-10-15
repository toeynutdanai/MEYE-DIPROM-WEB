import { Spin } from "antd";
import { Bar } from "react-chartjs-2";

const OEEFactorsChart = ({dataSource = [], isLoading = false,factor="" }) => {
  const rows = Array.isArray(dataSource) ? dataSource : [];

  const labels = rows.map((r) => r?.period);
  // const factor = rows.map((r) => r?.percent ?? 0);

  let factorList = [];
  if("Availability"==factor){
    factorList = rows.map((r) => r?.availabilityPercent ?? 0);
  }else if("Performance"==factor){
    factorList = rows.map((r) => r?.performancePercent ?? 0);
  }else if("Quality"==factor){
    factorList = rows.map((r) => r?.qualityPercent ?? 0);
  }

  const hasAnyValue = factorList.some((v) => v !== 0);

  const data = {
    labels,
    datasets: [
      {
        label: factor,
        data: factorList,
        borderColor: "#ffb1c1",
        backgroundColor: "#ffb1c1",
        type: "bar",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
      title: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) =>
            `${ctx.dataset.label}: ${(ctx.parsed.y ?? 0).toLocaleString()}`,
        },
      },
    },
    scales: {
      x: { stacked: false },
      y: {
        beginAtZero: true,
        suggestedMax: hasAnyValue ? undefined : 1, // ถ้าทั้งหมดเป็น 0 ให้เห็นแกน
        ticks: { callback: (v) => Number(v).toLocaleString() },
      },
    },
  };

  

  return (
    <div style={{ width: "100%", height: "25vh", position: "relative" }}>
      <Spin spinning={isLoading} size="large">
        <div style={{ width: "100%", height: "25vh" }}>
          <Bar data={data} options={options}  />
        </div>
      </Spin>
    </div>
  );
};

export { OEEFactorsChart };
