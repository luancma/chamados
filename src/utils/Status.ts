class Status {

  constructor() {}

  static getCurrentOrderStatus(status: string){
    if (status === "open") return "Aberto";
    if (status === "closed") return "Concluído";
    return "Em andamento";
  };
}

export default Status;