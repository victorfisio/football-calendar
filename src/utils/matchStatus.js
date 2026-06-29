export function getMatchStatus(match) {

  switch (match.strStatus) {

    case "NS":
      return {
        text: "Agendado",
        finished: false,
      };

    case "LIVE":
      return {
        text: "Ao vivo 🔴",
        finished: false,
      };

    case "FT":
      return {
        text: "Finalizado",
        finished: true,
      };

    case "AET":
      return {
        text: "Finalizado (Prorrogação)",
        finished: true,
      };

    case "PEN":
      return {
        text: "Finalizado (Pênaltis)",
        finished: true,
      };

    case "PST":
      return {
        text: "Adiado",
        finished: false,
      };

    case "CANC":
      return {
        text: "Cancelado",
        finished: false,
      };

    default:
      return {
        text: match.strStatus ?? "Desconhecido",
        finished: false,
      };

  }

}