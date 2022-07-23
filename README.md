## React의 Master가 돼보자!!

React Master Class 공부 및 정리

### styled-component

```
npm i styled-components
```

**css가 적용된 element를 마치 component처럼 쓸 수 있게 해주는 아주 고마운 친구**

```js
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
