import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  padding: 0 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loder = styled.span`
  text-align: center;
`;

interface RouteParams {
  coinId: string;
}

interface LocationParams {
  state: {
    name: string;
    rank: number;
  };
}

const Coin = () => {
  const { coinId } = useParams<keyof RouteParams>();
  const [loading, setLoading] = useState(true);
  const { state } = useLocation() as LocationParams;
  const [info, setInfo] = useState({});
  const [priceInfo, setPriceInfo] = useState({});

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
    })();
  }, []);

  console.log(state);

  return (
    <Container>
      <Header>
        <Title>{state?.name || "로딩중..."}</Title>
      </Header>
      {loading ? <Loder>로딩중...</Loder> : <span>{}</span>}
    </Container>
  );
};

export default Coin;
