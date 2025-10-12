import { Spin } from "antd";
import { Bar } from "react-chartjs-2";

const OEEFactorsChart = ({ factorTitle="",dataSource = [], isLoading = false }) => {
  const rows = Array.isArray(dataSource) ? dataSource : [];

  const labels = rows.map((r) => r?.period);
  const factor = rows.map((r) => r?.percent ?? 0);

  const hasAnyValue = factor.some((v) => v !== 0);

  const data = {
    labels,
    datasets: [
      {
        label: factorTitle,
        data: factor,
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
