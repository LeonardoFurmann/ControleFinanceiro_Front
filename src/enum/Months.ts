export const Months = {
  JANUARY: "Janeiro",
  FEBRUARY: "Fevereiro",
  MARCH: "Março",
  APRIL: "Abril",
  MAY: "Maio",
  JUNE: "Junho",
  JULY: "Julho",
  AUGUST: "Agosto",
  SEPTEMBER: "Setembro",
  OCTOBER: "Outubro",
  NOVEMBER: "Novembro",
  DECEMBER: "Dezembro",
} as const;

export type Months = (typeof Months)[keyof typeof Months];

export const MONTHS_INFO = {
  [Months.JANUARY]:   { index: 0, short: "Jan", full: "Janeiro" },
  [Months.FEBRUARY]:  { index: 1, short: "Fev", full: "Fevereiro" },
  [Months.MARCH]:     { index: 2, short: "Mar", full: "Março" },
  [Months.APRIL]:     { index: 3, short: "Abr", full: "Abril" },
  [Months.MAY]:       { index: 4, short: "Mai", full: "Maio" },
  [Months.JUNE]:      { index: 5, short: "Jun", full: "Junho" },
  [Months.JULY]:      { index: 6, short: "Jul", full: "Julho" },
  [Months.AUGUST]:    { index: 7, short: "Ago", full: "Agosto" },
  [Months.SEPTEMBER]: { index: 8, short: "Set", full: "Setembro" },
  [Months.OCTOBER]:   { index: 9, short: "Out", full: "Outubro" },
  [Months.NOVEMBER]:  { index: 10, short: "Nov", full: "Novembro" },
  [Months.DECEMBER]:  { index: 11, short: "Dez", full: "Dezembro" },
} as const;

export const MONTHS_ARRAY = Object.values(MONTHS_INFO);
