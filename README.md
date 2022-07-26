## React의 Master가 돼보자!!

React Master Class 공부 및 정리

---

## 실습 결과물

### 1. 코인 차트

`styled-components` `react-query` `react-router-dom` `typescript` `react-apexcharts`

> 간단하게 코인의 정보를 불러오고, 과거 가격 정보로 코인 가격을 보여주는 차트를 띄웁니다.

<p align="center">
<img src="./Coin%20Chart%20Project/Coin%20Chart.gif" width="300px" /></p>

### 2. ToDo App (개발중)

---

### styled-component

```
npm i styled-components
```

**css가 적용된 element를 마치 component처럼 쓸 수 있게 해주는 아주 고마운 친구**

```jsx
import styled from "styled-components";

const Father = styled.div`
  display: flex;
`;

const Box = styled.div`
  width: 100px;
  height: 100px;
  span {
    color: teal;
    font-size: 30px;
    font-weight: 700;
  }
`; // 이렇게 element의 child element에 대한 css도 편리하게 정의할 수 있습니다.

const ColoredBox = styled.div`
  width: 100px;
  height: 200px;
  background-color: ${(props) => props.bgColor};
`;

const ColoredBox2 = styled(ColoredBox)`
  border-radius: 50px;
`;

function App() {
  return (
    <Father>
      {/* 원래는 <div style={{ display: "flex" }}> 이렇게 썼어야 하는 친구*/}
      <Box>
        <span>문구</span>
      </Box>
      <ColoredBox bgColor="tomato" />
      <ColoredBox2 bgColor="blue" />
    </Father>
  );
}

export default App;
```

이외에도 Theme, keyframes(animation) 등의 매우 유용한 기능들이 있습니다. 스타일 관리에 아주 강력한 툴인듯!

### TypeScript에서 Component에 Prop 보내기

```tsx
import styled from "styled-components";

interface ContainerProps {
  bgColor: string;
}

const Container = styled.div<ContainerProps>`
  width: 200px;
  height: 200px;
  background-color: ${(props) => props.bgColor};
`;

interface CircleProps {
  bgColor: string;
}

const Circle = ({ bgColor }: CircleProps) => {
  return <Container bgColor={bgColor} />;
};

export default Circle;
```

즉, 제너릭을 이용해서 `ContainerProps`라는 객체 타입의 prop이 넘어올것이라고 알려줘야 합니다.

### React useState Hook with TypeScript

```ts
const [value, setValue] = useState(0);
// 일반적인 react js 문법대로 하면 ts에서는 state의 type을 추론해 지정해줍니다.
const [value, setValue] = useState<number | string>(0);
// 이런 식으로 제너릭을 이용해 커스텀 타입을 지정해 줄 수도 있습니다.
```

### Event in TypeScript

타입스크립트로 이벤트 객체를 다룰 때 handler측에 마우스를 갖다대면 어떤 타입을 사용하면 될지 힌트를 얻을 수 있습니다.

```tsx
function App() {
  const [username, setUsername] = useState("");
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    // 이런 식으로 이벤트 객체의 타입을 정해주면 됩니다.
    // 아래의 input onChange attribute에서 마우스를 갖다 대면 힌트를 얻을 수 있어요
    const {
      currentTarget: { value },
    } = event;
    setUsername(value);
  };
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(`hello ${username}`);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={onChange}
        />
        <button>Log in</button>
      </form>
    </div>
  );
}
```

### styled-component Theme for TypeScript

```tsx:styled.d.ts
import "styled-components"

declare module "styled-components" {
    export interface DefaultTheme {
        textColor: string;
        bgColor: string;
        btnColor: string;
    }
}
```

`styled.d.ts`에 이렇게 DefaultTheme 타입 object를 정의 후 override해서,

```tsx:theme.ts
import { DefaultTheme } from "styled-components";

export const lightTheme: DefaultTheme = {
    bgColor: "white",
    textColor: "black",
    btnColor: "tomato"
}

export const darkTheme: DefaultTheme = {
    bgColor: "black",
    textColor: "white",
    btnColor: "teal"
}
```

이런 식으로 theme 객체를 정의 후 `index.tsx`에서 불러와 ThemeProvieder component에 theme prop으로 넣으면, 전역 css가 적용됩니다.

### Dynamic Routing

```tsx:/routes/Router.tsx
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:coinId" element={<Coin />} />
        <Route path="/" element={<Coins />} />
      </Routes>
    </BrowserRouter>
  );
};
```

```tsx:/routes/Coin.tsx
const Coin = () => {
  const { coinId } = useParams<keyof RouteParams>();
  // 모든 param은 string이므로(react-router-dom v6 기준) 제너릭을 key만 가져와도 된다고 합니다.
  // 다른 방법으로는 단순히 "coinId"를 꺽쇠 안에 넣기만 해도 되는겁니다.
  return <div></div>;
};
```

### Styles

기본적으로 적용돼있는 스타일을 모두 해제하려면 두가지 방법이 있습니다.

1. [reset css 설치](https://meyerweb.com/eric/tools/css/reset/)
2. npm package `styled-reset` 설치
   - 굳이 패키지를 설치하지 않고 [이 코드](https://github.com/zacanger/styled-reset/blob/master/src/index.ts) 가져와도 됩니다. (이게 더 깔끔한 방법인듯)

전역적인 css를 적용하고 싶다면(폰트 등) styled-components에서 제공하는 `createGlobalStyle`을 이용해 global scope에 스타일을 적용할 수 있습니다.

```tsx:App.tsx
const GlobalStyle = createGlobalStyle`
    body {
        color: red;
    }
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <Router />
    </>
  );
}
```

### 자바스크립트 문법 - 함수를 선언과 동시에 실행하기

```js
useEffect(() => {
  (async () => {
    const res = await fetch("https://api.coinpaprika.com/v1/coins");
    const json = await res.json();
    setCoins(json.slice(0, 10));
  })();
}, []);
```

이 방법을 이용하면 위 예시처럼 async function을 선언과 동시에 실행할 수 있습니다.

### API fetch & Load Data

```tsx
const Coins = () => {
  const [coins, setCoins] = useState<CoinInterface[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const res = await fetch("https://api.coinpaprika.com/v1/coins");
      const json = await res.json();
      setCoins(json.slice(0, 100));
      setLoading(false);
    })();
  }, []);

  const Loder = styled.span`
    text-align: center;
  `;

  return (
    <Container>
      <Header>
        <Title>코인</Title>
      </Header>
      {loading ? (
        <Loder>로딩중...</Loder>
      ) : (
        <CoinsList>
          {coins.map((coin) => (
            <Coin key={coin.id}>
              <Link to={`/${coin.id}`}>{coin.name} &rarr;</Link>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
  );
};
```

### TypeScript interface 명명법

타입스크립트에서는 interface를 이름 지을 때 대문자 I 를 변수명 앞에 붙입니다. 그게 더 보기 좋대요

### 놀라운 VSC의 단축키 세계

개발자가 개발하는 개발툴... 개발자들은 역시 귀찮은걸 정말 싫어하나 봅니다. 거의 모든 상황에 대한 단축키가 있는 것 같던데 새로 배울 때 마다 이걸 모르고 살았던 과거가 너무 불쌍해요.

오늘 배운 개꾸르팁 단축키

```
cmd + d : 특정 문자(열)을 선택한 상태에서 단축키를 연타하면 똑같은 문자열을 계속해서 추가로 선택해줘요.

alt + shift + I : 여러 줄을 선택한 상태에서 단축키를 누르면 각각의 줄의 맨 마지막에 멀티 커서를 놔줘요. (이거 진짜 미친 개꿀팁)

cmd + shift + -> : 현재 커서부터 줄 끝까지 모두 선택해줘요. 멀티 커서와 합하면 아주 강력한 기능!!
```

### Type Assertion

```ts
interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}
const [info, setInfo] = useState<InfoData>({});
```

이 경우, info state를 empty object로 initiate하고 싶었으나, `Argument of type '{}' is not assignable to parameter of type 'PriceData | (() => PriceData)'.` 라는 오류가 뜹니다. 이는 타입스크립트의 규칙과 목적에 의하면 당연한 상황입니다.

그러나, 개발의 용이성을 위해 강제적으로 형식에 맞지 않는 데이터여도 형식에 맞는 '척'을 하게 만들수 있습니다.

```ts
const [info, setInfo] = useState<InfoData>({} as InfoData);
```

이를 `type assertion(타입 표명)`이라고 하는데, 타입스크립트의 원래 목적에는 배반되는 행동이므로 매우 주의해야 합니다. 개발자가 컴파일러에게 '걱정하지 말고 나만 믿어' 하는 꼴인데, 개발자의 실수로 컴파일러와 약속한 속성을 추가하지 않는 경우를 막아주지 못하기 때문입니다.

저는 저를 믿지 않고 컴퓨터를 믿는 훌륭한 개발자이므로 위의 type assertion보다는 아래의 방법으로 첫 state를 부여했습니다.

```ts
const [info, setInfo] = useState<InfoData | null>(null);
```

### Nested Routes using React-Router-Dom v6

v6 React Router에서는 nested route를 구현하는 방법이 두 가지 있습니다.

1. 부모 route의 path 마지막에 `/*`를 적어 명시적으로 이 route 내부에서 nested route가 render될 수 있음을 표시하고 자식 route를 부모 route의 element 내부에 작성하는 방법입니다.

```tsx:Router.tsx
<Route path="/:coinId/*" element={<Coin />} />
// /:coinId => /:coinId/*
```

```tsx:Coin.tsx
<Routes>
  <Route path="price" element={<Price />} />
</Routes>
```

이 때, Routes는 상대경로도 지원하기에 `` path=`/${coinId}/price`  ``라고 적지 않아도 됩니다.

> 참고로, 상대경로가 아닌 절대경로 표기 시에 굳이 `${}`를 이용하지 않아도 `:coinId`라고 적어도 알아서 잘 가져온다네요.

2. 자식 route를 부모 element의 내부가 아닌 route 내부에 작성하는 방법입니다.

```tsx:Router.tsx
<Route path="/:coinId" element={<Coin />} >
  <Route path="chart" element={<Chart />} />
  <Route path="price" element={<Price />} />
</Route>
```

그리고 이 자식 Route들이 어디에 render될 지 부모의 element 안에 원하는 위치에 `<Outlet />`을 이용해 표시해주면 됩니다.

> 두 방법간의 성능상 차이는 없으나, 두 번째 방법이 보기 좋아서 저는 두 번째로 가겠습니다.
> Outlet 이용 시 자식 컴포넌트에게 prop을 전해주고 싶다면 [useOutletContext Hook](https://reactrouter.com/docs/en/v6/hooks/use-outlet-context)을 사용하면 됩니다. 자세한 예시는 [여기를 참고해주세요.](#useoutletcontext-hook을-이용해-자식-컴포넌트에게-context-전달하기)

### CSS Grid

```css
.LinkBox {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 10px;

  a {
    ...;
  }
}
```

한 줄에 나란히 놓일 버튼을 구현하기 위해 CSS의 Grid 레이아웃을 사용해봤습니다. 정말 간편하고 너무너무 재밌습니다. 본 과정을 완료하면 CSS Layout과 CSS의 함수들을 한 번 열심히 정리해봐야겠습니다.

보통 Grid Layout은 전체적인 얼개를, Flex Layout은 세세한 디테일을 잡을 때 사용한다고 합니다. "차세대 레이아웃"이라고 불린다는데, 이게 없었던 시절에는 대체 어떻게 레이아웃을 잡은걸까요? (ㅠㅠ)

**ToDo: 아래 사이트에서 CSS MASTER하기**
[Flexbox Froggy](https://flexboxfroggy.com/#ko)
[CSS Grid Garden](https://cssgridgarden.com/#ko)

### React-Query

> 제발 한국인이면 리액트 쿼리로 데이터 가져옵시다

끝없는 API fetching, 매 번 컴포넌트가 mount 될 때마다 fetch돼 깜빡거리는 화면이 지긋지긋하다면 리액트 쿼리를 씁시다.

React-Query는 isLoading도 주고, 데이터 캐싱도 해줘요.

```ts
const [loading, setLoading] = useState(true);
const [info, setInfo] = useState<InfoData | null>(null);
const [priceInfo, setPriceInfo] = useState<PriceData | null>(null);
useEffect(() => {
  (async () => {
    const infoData = await (
      await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
    ).json();
    const priceData = await (
      await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
    ).json();
    setInfo(infoData);
    setPriceInfo(priceData);
    setLoading(false);
  })();
}, [coinId]);
```

이렇게 더러웠던 코드가

```ts
const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(
  ["info", coinId],
  () => fetchCoinInfo(coinId ?? "")
);
const { isLoading: tickersLoading, data: tickersData } = useQuery<PriceData>(
  ["tickers", coinId],
  () => fetchCoinTickers(coinId ?? "")
);
const loading = infoLoading || tickersLoading;
```

이렇게 이쁘게 바뀌는 매직... (물론 `api.ts`에 fetching function들을 따로 정의해주긴 했지만 그래도 간결 그 자체)

이제 홈 <-> Coin 페이지 와리가리해도 로딩 안하고 깔끔하게 캐싱된 데이터를 보여줍니다.

React Query가 이쁘게 해주는 캐싱을 시각적으로 보고싶다면 `root`를 `ReactQueryDevtools` 컴포넌트로 감싸줘봅시다! 멋진 리액트 쿼리 상태 조회용 개발도구가 보이게 됩니다.

### useOutletContext Hook을 이용해 자식 컴포넌트에게 context 전달하기

**`Coin.tsx`**

```tsx
<Outlet context={{ coinId }} />
```

```tsx
interface IChartProps {
  coinId: string;
}
export const useCoinId = () => useOutletContext<IChartProps>();
```

타입스크립트를 이용할 경우, 공식 문서에서는 이렇게 부모쪽에서 부모의 context에 접근할 수 있도록 도와주는 커스텀 Hook을 선언할것을 권고하고 있습니다. 이를 통해 consumer(자식)측에서는 typing이 가능하고, 부모 측에서는 consumer를 control할 수 있게 된다는 장점이 있습니다.

자식 측에서는 간단하게 위의 Hook을 불러와 사용하면 됩니다.

**`Chart.tsx`**

```tsx
const { coinId } = useCoinId();
```

### Framer Motion의 강려크한 Animation

```tsx
import styled from "styled-components";
import { motion } from "framer-motion";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;

const Box = styled(motion.div)`
  background-color: rgba(242, 86, 86, 0.826);
  width: 100px;
  height: 100px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.1);
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  border-radius: 35px;
  padding: 7px;
`;

const Circle = styled(motion.div)`
  background-color: white;
  place-self: center;
  height: 35px;
  width: 35px;
  border-radius: 18px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.1);
`;

const boxVariants = {
  start: {
    opacity: 0,
    scale: 0.5,
  },
  end: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      duration: 0.5,
      bounce: 0.5,
      delayChildren: 0.2,
      staggerChildren: 0.2,
    },
  },
};

const circleVariants = {
  start: {
    opacity: 0,
    y: 10,
  },
  end: {
    opacity: 1,
    y: 0,
  },
};

const Home = () => {
  return (
    <Wrapper>
      <Box variants={boxVariants} initial="start" animate="end">
        <Circle variants={circleVariants} />
        <Circle variants={circleVariants} />
        <Circle variants={circleVariants} />
        <Circle variants={circleVariants} />
      </Box>
    </Wrapper>
  );
};

export default Home;
```
