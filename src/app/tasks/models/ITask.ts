export interface ITask {
  id: number;
  titulo: string;
  descricao?: string;
  dataVencimento: Date;
  tarefaCompletada: boolean;
}