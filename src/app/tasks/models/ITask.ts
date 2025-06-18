export interface ITask {
  id: number;
  titulo: string;
  descrição?: string;
  dataVencimento: Date;
  tarefaCompletada: boolean;
}