import { TableData } from "src/app/store/tableSlice";


export function cheksForUseEffect(tableResult: []|TableData[], setTable:React.Dispatch<React.SetStateAction<TableData[] | null>>): void{
    if (tableResult?.length) {
        const sortArr: TableData[] = [...tableResult].sort((a: TableData, b: TableData) => {
          return b.timeNum - a.timeNum;
        });
        setTable(sortArr);        
      }
}