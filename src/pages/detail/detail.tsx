import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./detail.module.css";

interface CoinDetail {
  id: string;
  name: string;
  symbol: string;
  market_data: {
    current_price: { usd: number };
    market_cap: { usd: number };
    total_volume: { usd: number };
    price_change_percentage_24h: number;
  };
  image: {
    large: string;
  };
}

export function Detail() {
  const { id } = useParams<{ id: string }>();
  const [coin, setCoin] = useState<CoinDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("ID recebido na rota:", id);

    async function fetchCoin() {
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${id}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Dados da API:", data);

        if (!data.id) {
          setCoin(null);
        } else {
          setCoin(data);
        }
      } catch (err) {
        console.error("Erro ao buscar dados da moeda:", err);
        setCoin(null);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchCoin();
    } else {
      setLoading(false);
    }
  }, [id]);

  if (loading) return <p className={styles.loading}>Carregando...</p>;
  if (!coin) return <p className={styles.error}>Moeda não encontrada.</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        {coin.name} ({coin.symbol?.toUpperCase() ?? "—"})
      </h1>
      {coin.image?.large && (
        <img
          src={coin.image.large}
          alt={coin.name}
          className={styles.coinImage}
        />
      )}
      {coin.market_data ? (
        <div className={styles.marketData}>
          <p>
            <strong>Preço:</strong>{" "}
            ${coin.market_data.current_price.usd.toLocaleString()}
          </p>
          <p>
            <strong>Valor de mercado:</strong>{" "}
            ${coin.market_data.market_cap.usd.toLocaleString()}
          </p>
          <p>
            <strong>Volume 24h:</strong>{" "}
            ${coin.market_data.total_volume.usd.toLocaleString()}
          </p>
          <p>
            <strong>Mudança 24h:</strong>{" "}
            {coin.market_data.price_change_percentage_24h.toFixed(2)}%
          </p>
        </div>
      ) : (
        <p>Dados de mercado indisponíveis.</p>
      )}
    </div>
  );
}
