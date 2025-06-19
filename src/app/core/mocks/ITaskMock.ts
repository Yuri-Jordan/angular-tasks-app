import { ITask } from "../../tasks/models/ITask";

export const TASK_MOCKS: ITask[] = [
  {
    id: 1,
    titulo: 'Comprar mantimentos',
    descrição: 'Comprar leite, pão e ovos no supermercado',
    dataVencimento: new Date('2025-06-20'),
    tarefaCompletada: false
  },
  {
    id: 2,
    titulo: 'Enviar relatório',
    descrição: 'Enviar relatório mensal para o gerente',
    dataVencimento: new Date('2025-06-22'),
    tarefaCompletada: true
  },
  // {
  //   id: 3,
  //   titulo: 'Reunião com equipe',
  //   // descrição is optional
  //   dataVencimento: new Date('2025-06-25'),
  //   tarefaCompletada: false
  // }
];