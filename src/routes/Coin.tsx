import { useParams } from "react-router-dom";

interface RouteParams {
  coinId: string;
}

const Coin = () => {
  const { coinId } = useParams<keyof RouteParams>();
  // 모든 param은 string이므로(react-router-dom v6 기준) 제너릭을 key만 가져와도 된다고 합니다.
  // 다른 방법으로는 단순히 "coinId"를 꺽쇠 안에 넣기만 해도 되는겁니다.
  return <div></div>;
};

export default Coin;
