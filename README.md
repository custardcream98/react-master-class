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
