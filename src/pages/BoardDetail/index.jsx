import BoardDetail from "./BoardDetail";

export default {
  routeProps: {
    path: "/board/:id",
    exact: false,
    component: BoardDetail
  },
  name: "Board detail"
};
