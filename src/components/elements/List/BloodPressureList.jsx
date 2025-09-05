import { Divider, List, Skeleton } from "antd";
import moment from "moment";
import { useCallback, useEffect, useState } from "react"; // Fix the import here
import InfiniteScroll from "react-infinite-scroll-component";

const BloodPressureList = ({
  height = "",
  data = [],
  totalDataCount,
  boolean,
  onCheckboxChange,
}) => {
  const [loading, setLoading] = useState(false);

  const getColorForLevel = (level) => {
    switch (level) {
      case "WARNING1":
      case "WARNING2":
        return "#FFC107";
      case "DANGER":
        return "#FF4747";
      default:
        return "inherit";
    }
  };

  const loadMoreData = useCallback(() => {
    // Fix the function name here
    if (loading) {
      return;
    }
    setLoading(true);
    if (data.length >= totalDataCount) {
      setLoading(false);
      return;
    }
  }, [data, loading, totalDataCount]); // Make sure to include all dependencies in the dependency array

  useEffect(() => {
    loadMoreData();
  }, [loadMoreData]);

  return (
    <div
      id="scrollableDiv"
      style={{
        height: height,
        overflow: "auto",
        padding: "0 16px",
      }}
    >
      <InfiniteScroll
        dataLength={data.length}
        next={loadMoreData}
        hasMore={data.length < totalDataCount}
        loader={
          <Skeleton
            avatar
            paragraph={{
              rows: 1,
            }}
            active
          />
        }
        endMessage={<Divider plain>No More</Divider>}
        scrollableTarget="scrollableDiv"
      >
        <List
          dataSource={data}
          renderItem={(item) => (
            <List.Item
              key={item.email}
              style={{
                backgroundColor: getColorForLevel(item.level),
                fontWeight: "bold",
                fontSize: "1.1rem",
              }}
            >
              <List.Item.Meta
                title={
                  <h3>
                    <div style={{ marginLeft: 0 }}>
                      Sys : {item.systolicPressure} / Dia :{" "}
                      {item.diastolicPressure} / Pul : {item.pulseRate}
                    </div>
                  </h3>
                }
              />
              <div style={{ marginRight: "1rem" }}>
                {moment
                  .utc(item?.updateDate ? item?.updateDate : item?.createDate)
                  .utcOffset("+0700")
                  .add(543, "years")
                  .format("DD/MM/YYYY - HH:mm:ss")}
              </div>
            </List.Item>
          )}
        />
      </InfiniteScroll>
    </div>
  );
};

export default BloodPressureList;
