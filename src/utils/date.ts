// A API devolve a data sem fuso ("2026-10-01T03:00:00"). Para o usuário a transação é só um dia do
// calendário, então usamos apenas a parte AAAA-MM-DD e montamos a meia-noite no horário local.
// Ler a string inteira com new Date() a interpretaria como horário local e deslocaria a hora a cada edição.
export function parseApiDate(date: string): Date {
  const [year, month, day] = date.slice(0, 10).split("-").map(Number);
  return new Date(year, month - 1, day);
}
