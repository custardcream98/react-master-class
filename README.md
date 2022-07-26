## React의 Master가 돼보자!!

React Master Class 공부 및 정리

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
