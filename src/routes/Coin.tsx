import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  useParams,
  useLocation,
  useMatch,
  Outlet,
  Link,
} from "react-router-dom";
import styled from "styled-components";
import { fetchCoinInfo, fetchCoinTickers } from "../api";

const Container = styled.div`
  padding: 0 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-content: center;
  align-items: center;

  a {
    font-size: 15px;
    color: ${(props) => props.theme.textColor};
    transition: color 0.1s ease-in;
  }
  a:hover {
    color: ${(props) => props.theme.accentColor};
  }
`;

const Title = styled.h1`
  font-size: 30px;
  text-align: center;
  color: ${(props) => props.theme.accentColor};
`;

const Loder = styled.span`
  text-align: center;
`;

const InfoBox = styled.div`
  border-radius: 15px;
  border-color: black;
  border-width: 2px;
  border-style: inset;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px 30px;
  span:first-child {
    font-size: 15px;
    font-weight: 400;
    margin-bottom: 10px;
  }
  span:nth-child(2) {
    font-size: 21px;
    font-weight: 500;
  }
`;

const LinkBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 10px;
`;

const LinkItem = styled.span<{ isActive: boolean }>`
  border-radius: 15px;
  border-color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  border-width: 2px;
  border-style: solid;
  text-align: center;
  font-size: 17px;
  transition: color 0.15s ease-in;

  a {
    display: block;
    padding: 10px;
  }

  &:hover {
    color: white;
    background-color: ${(props) => props.theme.textColor};
    border-color: transparent;
  }
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

interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

const Coin = () => {
  const { coinId } = useParams<keyof RouteParams>();
  const { state } = useLocation() as LocationParams;
  const priceMatch = useMatch("/:coinId/price");
  const chartMatch = useMatch("/:coinId/chart");
  const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(
    ["info", coinId],
    () => fetchCoinInfo(coinId ?? "")
  );
  const { isLoading: tickersLoading, data: tickersData } = useQuery<PriceData>(
    ["tickers", coinId],
    () => fetchCoinTickers(coinId ?? "")
  );

  const loading = infoLoading || tickersLoading;

  return (
    <Container>
      <Header>
        <Link to="/">홈으로</Link>
        <Title>
          {state?.name ? state.name : loading ? "로딩중" : infoData?.name}
        </Title>
        <div></div>
      </Header>
      {loading ? (
        <Loder>로딩중...</Loder>
      ) : (
        <>
          <InfoBox>
            <InfoItem>
              <span>순위</span>
              <span>{infoData?.rank}</span>
            </InfoItem>
            <InfoItem>
              <span>티커</span>
              <span>{infoData?.symbol}</span>
            </InfoItem>
            <InfoItem>
              <span>Proof Type</span>
              <span>{infoData?.proof_type}</span>
            </InfoItem>
          </InfoBox>
          <InfoBox>
            <InfoItem>
              <span>공급량</span>
              <span>{tickersData?.total_supply}</span>
            </InfoItem>
            <InfoItem>
              <span>총 공급량</span>
              <span>{tickersData?.max_supply}</span>
            </InfoItem>
          </InfoBox>
          <LinkBox>
            <LinkItem isActive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`}>차트</Link>
            </LinkItem>
            <LinkItem isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>가격</Link>
            </LinkItem>
          </LinkBox>

          <Outlet />
        </>
      )}
    </Container>
  );
};

export default Coin;
