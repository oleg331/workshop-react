import React from "react";

const BoardDetail = () => <div>Board detail Module</div>;

export default {
  routeProps: {
    path: "/board/:id",
    exact: false,
    component: BoardDetail
  },
  name: "Board detail"
};
