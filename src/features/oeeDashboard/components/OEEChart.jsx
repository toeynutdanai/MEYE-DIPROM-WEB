import { Spin } from "antd";
import { Line } from "react-chartjs-2";

const OEEChart = ({ dataSource = [], isLoading = false }) => {
  const rows = Array.isArray(dataSource) ? dataSource : [];

  const labels = rows.map((r) => r?.period);
  const oee = rows.map((r) => r?.percent ?? 0);

  const hasAnyValue = oee.some((v) => v !== 0);

  const data = {
    labels,
    datasets: [
      {
        label: "Machine",
        data: oee,
        borderColor: "#ffb1c1",
        backgroundColor: "#ffb1c1",
        fill: true,
        tension: 0.4,
        cubicInterpolationMode: "monotone",
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
          <Line data={data} options={options} />
        </div>
      </Spin>
    </div>
  );
};

export { OEEChart };
