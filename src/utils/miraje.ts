import { createServer } from "miragejs";

export function makeServer({ environment = "test" }) {
  createServer({
    routes() {
      this.get("/api/orders", () => ({
        orders: [
          {
            description: "doaskdosa",
            title: "title 1",
            details: "dasdsdsadas",
            status: "open",
            id: 4,
          },
          {
            title: "dsdsadsa",
            description: "dsadasdasdasdsa",
            details: "dasddasddsadas",
            status: "open",
            id: 5,
          },
          {
            title: "odksaopdskadop",
            description: "odsaopdasopdko",
            details: "dsadsaodjsiodsajd",
            status: "open",
            id: 6,
          },
          {
            title: "dakdod",
            description: "odasodao",
            status: "open",
            id: 23,
          },
          {
            title: "dakdod",
            description: "odasodao",
            status: "open",
            id: 441,
          },
          {
            title: "dakdod",
            description: "odasodao",
            status: "open",
            id: 56,
          },
          {
            title: "dakdod",
            description: "odasodao",
            status: "open",
            id: 77,
          },
          {
            title: "dakdod",
            description: "odasodao",
            status: "open",
            id: 7,
          },
          {
            title: "2222",
            description: "odasodao",
            status: "open",
            id: 7,
          },
          {
            title: "Chamado 2",
            description: "Um chamado",
            status: "in_progress",
            id: 12,
          },
          {
            title: "2222",
            description: "odasodao",
            status: "in_progress",

            id: 123,
          },
        ],
      }));
    },
  });
}
