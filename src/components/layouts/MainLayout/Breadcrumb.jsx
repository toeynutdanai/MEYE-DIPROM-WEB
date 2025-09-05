import { Breadcrumb as AntdBreadcrumb } from "antd";
import cx from "classnames";
import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";

const Breadcrumb = ({ className = "", breadcrumb = [] }) => {
  const navigate = useNavigate();

  const handleClick = (link) => {
    if (link === '/') {
      navigate("/");
    }
    else {
      navigate("/" + link);
    }
  };

  const renderBreadcrumb = useMemo(() => {
    if (breadcrumb.length > 0) {
      return (
        <AntdBreadcrumb
          className={cx(className)}
          items={breadcrumb.map((item) => {
            if (item.link) {
              return {
                title: (
                  <a onClick={() => handleClick(item.link)}>
                    {item.title}
                  </a>
                ),
              };
            }
            return {
              title: item.title,
            };
          })}
        />
      );
    }

    return <React.Fragment />;
  }, [breadcrumb, className]);

  return renderBreadcrumb;
};

export default Breadcrumb;
