# **Miner**

## [Link on application](https://miner-git-main-grekalimbus-s-team.vercel.app/)
<br />

## About this project

## RU
Это приложение - мини игра "Минёр". 
Многим известна эта десктопная игра. Думаю правила объяснять не нужно.
На стилистику акцента не было, но приложение адаптивное. 
Есть на выбор 3 сложности
Также реализована таблица лидеров
    
    -Поле 8х8. Время 10 минут
    -Поле 16х16. Время 40 минут
    -Поле 32х32. Время 100 минут

## ENG
This application is a mini game "Miner".
Many people know this desktop game. I don't think the rules need to be explained.
There was no emphasis on style, but the application is adaptive.
There are 3 difficulties to choose from.
There is also a leaderboard
    
    -Field 8x8. Time 10 minutes
    -Field 16x16. Time 40 minutes
    -Field 32x32. Time 100 minutes
<br />

## Used technologies 
    -TypeScript
    -ReactJS
    -Redux

# Presentation

![alt text](https://i.postimg.cc/yYdTTX7y/image.png)
![alt text](https://i.postimg.cc/sx1Z5m5B/image.png)

<br />

## Examples code this application

### [App.ts](https://github.com/Grekalimbus/Miner/blob/main/src/App.tsx)
```js
export interface STYLES {
  [key: string]: string;
}

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(loadData());
  }, []);

  return (
    <div style={{ overflow: 'auto', height: '100vh' }}>
      <Switch>
        <Route path="/" exact>
          <MainPage />
        </Route>
        <Route path="/play/:id?" exact>
          <GamePage />
        </Route>
        <Route path="/table">
          <Table />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
```
<br />


## Redux
### [tableSlice.ts](https://github.com/Grekalimbus/Miner/blob/main/src/app/store/tableSlice.ts)

```js
import { createSlice, PayloadAction, ThunkAction, Action } from '@reduxjs/toolkit';
import { RootState } from '.';

export type TableData = {   
    nik: string;
    lvl: string;
    time: string;
    timeNum: number
  
};
interface TableState {
  tableData: TableData[];
}

const initialState: TableState = {
  tableData: [],
};

const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    addData: (state, action: PayloadAction<TableData[]>) => {
      state.tableData = action.payload
    },
    resetTable: (state) => {
      state.tableData = [];
    },
  },
});

export const { addData, resetTable } = tableSlice.actions;

export const selectTableData = (state: RootState): TableData[] =>
  state.table.tableData;

export const loadData = (): ThunkAction<void, RootState, unknown, Action<string>> => (
  dispatch
) => {
  const data = localStorage.getItem('results');
  if (data) {       
      dispatch(addData(JSON.parse(data)));    
  }
};

export default tableSlice.reducer;
```
<br />

### [GamePage.tsx](https://github.com/Grekalimbus/Miner/blob/main/src/app/components/pages/gamePage/GamePage.tsx)

```js
type GamePageParams = {
  id: string;
};

const GamePage: FC = () => {
  const { id } = useParams<GamePageParams>();
  const [win, setWin] = useState<boolean>(false);
  const [died, setDied] = useState(false);
  const [time, setTime] = useState<number>(0);
  const [lose, setLose] = useState<boolean>(false);

  const size = id === '1' ? 8 : id === '2' ? 16 : 32;
  const changeWin = () => {
    setWin(true);
  };
  const changeDied = () => {
    setDied(true);
  };
  const changeTime = (time: number) => {
    setTime(time);
  };
  const changeLose = () => {
    setLose(true);
  };

  return (
    <div className={styles.wrapper}>
      <Timer
        win={win}
        died={died}
        id={id}
        changeTime={changeTime}
        changeLose={changeLose}
      />
      <GameField
        size={size}
        changeWin={changeWin}
        changeDied={changeDied}
        time={time}
        lose={lose}
      />
    </div>
  );
};

export default GamePage;
```

### [GameField.tsx](https://github.com/Grekalimbus/Miner/blob/main/src/app/components/pages/gamePage/GameField.tsx)

```js
interface Props {
  size: number;
  changeWin: () => void;
  changeDied: () => void;
  time: number;
  lose: boolean;
}

const Mine = -1;

const GameField: FC<Props> = ({ size, changeWin, changeDied, time, lose }) => {
  const callCreateField = sizeField(size, Mine);
  const createMask = new Array(size * size).fill(Mask.Fill);
  const dimension = new Array(size).fill(0);
  const [field, setField] = useState<number[]>(callCreateField);
  const [mask, setMask] = useState<Mask[]>(createMask);
  const [died, setDied] = useState<boolean>(false);

  useEffect(() => {
    checksInUseEffect(field, mask, Mine, size, time, changeWin, changeDied, died, lose);
  }, [chekedWin(field, mask, Mine), died, time, lose]);

  console.log(field);

  return (
    <div className={styles.wrapperGame}>
      {dimension.map((_, y) => (
        <div
          key={y}
          style={{
            display: 'flex',
          }}
        >
          {dimension.map((_, x) => (
            <Cell
              key={x}
              size={size}
              field={field}
              mask={mask}
              Mine={Mine}
              died={died}
              y={y}
              x={x}
              setDied={setDied}
              setMask={setMask}
              lose={lose}
            />
          ))}
        </div>
      ))}
      <Buttons />
    </div>
  );
};

export default GameField;
```
<br />

### [Cell](https://github.com/Grekalimbus/Miner/blob/main/src/app/components/pages/gamePage/Cell.tsx)

```js
interface Props {
  size: number;
  field: number[];
  mask: Mask[];
  Mine: number;
  died: boolean;
  y: number;
  x: number;
  setDied: React.Dispatch<React.SetStateAction<boolean>>;
  setMask: React.Dispatch<React.SetStateAction<Mask[]>>;
  lose: boolean;
}

function stylesForCell(size: number) {
  if (size < 9) {
    return styles.cellSmall;
  } else if (size === 16) {
    return styles.cellBig;
  } else if (size === 32) {
    return styles.cellVeryBig;
  }
}

const Cell: FC<Props> = ({
  size,
  field,
  mask,
  Mine,
  died,
  y,
  x,
  setDied,
  setMask,
  lose,
}) => {
  return (
    <div
      className={stylesForCell(size)}
      style={{
        backgroundColor: stylesCell(died, field, mask, Mine),
        color: numberColor(field[y * size + x]),
      }}
      onClick={() => {
        if (!lose) {
          chekedWin(field, mask, Mine) ??
            clickCell(x, y, mask, size, field, Mine, setMask, setDied);
        }
      }}
      onContextMenu={e => {
        e.preventDefault();
        if (!lose) {
          chekedWin(field, mask, Mine) ??
            clickContextMenu(x, y, mask, size, setMask, field, Mine);
        }
      }}
      key={x}
    >
      {mask[y * size + x] !== Mask.Transparent
        ? mapMaskToView[mask[y * size + x]]
        : field[y * size + x] === Mine
        ? '🧨'
        : field[y * size + x]}
    </div>
  );
};

export default Cell;
```
<br />

## Utils
### [clickCell.ts](https://github.com/Grekalimbus/Miner/blob/main/src/app/utils/clickCell.ts)

```js
import { Mask } from "./gameField";
import { chekedWin } from "./checkWin";

export function clickCell(x: number, y: number, mask: Mask[], size: number, field: number[], Mine:number, setMask: React.Dispatch<React.SetStateAction<Mask[]>>, setDied: React.Dispatch<React.SetStateAction<boolean>>) {
    if (mask[y * size + x] === Mask.Transparent) return;
    const clearing: [number, number][] = [];
    function clear(x: number, y: number) {
      if (x >= 0 && x < size && y >= 0 && y < size) {
        if (mask[y * size + x] === Mask.Transparent) return;
        clearing.push([x, y]);
      }
    }
    clear(x, y);
    while (clearing.length) {
      const [x, y] = clearing.pop()!!;
      mask[y * size + x] = Mask.Transparent;
      if (field[y * size + x] !== 0) continue;
      clear(x + 1, y);
      clear(x - 1, y);
      clear(x, y + 1);
      clear(x, y - 1);
    }
    if (field[y * size + x] === Mine) {
      mask.forEach((_, i) => (mask[i] = Mask.Transparent));
      setDied(true);
    }
    setMask(prev => [...prev]);
    chekedWin(field, mask, Mine);
  }
```
<br />

### [clickContextMenu.ts](https://github.com/Grekalimbus/Miner/blob/main/src/app/utils/clickContextMenu.ts)

```js
import { Mask } from "./gameField";
import { chekedWin } from "./checkWin";



export function clickContextMenu(x: number, y: number, mask: Mask[], size: number,setMask: React.Dispatch<React.SetStateAction<Mask[]>>, field: number[], Mine:number) {
    if (mask[y * size + x] === Mask.Transparent) return;
    if (mask[y * size + x] === Mask.Fill) {
      mask[y * size + x] = Mask.Flag;
    } else if (mask[y * size + x] === Mask.Flag) {
      mask[y * size + x] = Mask.Question;
    } else if (mask[y * size + x] === Mask.Question) {
      mask[y * size + x] = Mask.Fill;
    }
    setMask(prev => [...prev])
    chekedWin(field, mask, Mine);
  }
```
<br />

### [createBigField.ts](https://github.com/Grekalimbus/Miner/blob/main/src/app/utils/createBigField.ts)

```js
export function createBigField(size: number, Mine: number): number[] {
    const numMines = Math.floor((size * size) / 10);
    const field: number[] = new Array(size * size).fill(0);
    function inc(x: number, y: number) {
      if (x >= 0 && x < size && y >= 0 && y < size) {
        if (field[y * size + x] === Mine) return;
        field[y * size + x] += 1;
      }
    }
  
    for (let i = 0; i < numMines; ) {
      const x = Math.floor(Math.random() * size);
      const y = Math.floor(Math.random() * size);
  
      if (field[y * size + x] === Mine) continue;
      field[y * size + x] = Mine;
      i += 1;
      inc(x + 1, y);
      inc(x - 1, y);
      inc(x, y + 1);
      inc(x, y - 1);
      inc(x + 1, y - 1);
      inc(x - 1, y - 1);
      inc(x + 1, y + 1);
      inc(x - 1, y + 1);
    }
    return field;
  }
```
<br />

### [resultTime.ts](https://github.com/Grekalimbus/Miner/blob/main/src/app/utils/resultTime.ts)

```js
export function formatTimeElapsed(time: number, time2: number): string {
  const timeElapsed = Math.abs(time - time2);
  const minutes = Math.floor(timeElapsed / 60);
  const seconds = timeElapsed % 60;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
  console.log("time", time);
  console.log("time2", time2);
  
  
  return `${formattedMinutes}:${formattedSeconds}`;
}
```