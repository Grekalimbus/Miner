import { TableData } from "src/app/store/tableSlice";

export function filterLVL(e: React.MouseEvent<HTMLButtonElement>, table: TableData[], setTable: React.Dispatch<React.SetStateAction<TableData[] | null>> ) {
    const id = e.currentTarget.id;
    if (id === '1' && setTable) {      
      const filter: TableData[] = table?.filter(item => item.lvl === 'Простой (8х8)');
      
      setTable(filter);
    }
    if (id === '2' && setTable) {
      const filter: TableData[] = table?.filter(item => item.lvl === 'Средний (16х16)');
      setTable(filter);
    }
    if (id === '3' && setTable) {
      const filter: TableData[] = table?.filter(item => item.lvl === 'Сложный (32х32)');
      setTable(filter);
    }
  }