import { useState, useEffect, FormEvent } from "react";
import styles from "./home.module.css";
import { BsSearch } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";

interface CoinProps {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  market_cap: number;
  total_volume: number;
  price_change_percentage_24h: number;
  image: string;
}

export function Home() {
  const [input, setInput] = useState("");
  const [coins, setCoins] = useState<CoinProps[]>([]);
  const [page, setPage] = useState(1); // página atual
  const [loadingMore, setLoadingMore] = useState(false); // loading para carregar mais
  const navigate = useNavigate();

  useEffect(() => {
    getData(1, true);
  }, []);

  async function getData(pageToFetch: number, replace = false) {
    try {
      if (!replace) setLoadingMore(true);
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=50&page=${pageToFetch}`
      );
      const data = await response.json();

      if (replace) {
        setCoins(data);
      } else {
        setCoins((oldCoins) => [...oldCoins, ...data]);
      }
    } catch (error) {
      console.error("Erro ao buscar moedas:", error);
    } finally {
      setLoadingMore(false);
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (input.trim() === "") return;

    const coin = coins.find((coin) => {
      return (
        coin.id.toLowerCase() === input.toLowerCase() ||
        coin.name.toLowerCase() === input.toLowerCase() ||
        coin.symbol.toLowerCase() === input.toLowerCase()
      );
    });

    if (coin) {
      navigate(`/detail/${coin.id}`);
    } else {
      alert("Moeda não encontrada. Verifique o nome ou símbolo e tente novamente.");
    }
  }

  function handleGetMore() {
    const nextPage = page + 1;
    setPage(nextPage);
    getData(nextPage);
  }

  function formatCurrency(value: number) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 2,
    }).format(value);
  }

  return (
    <main className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Digite o nome da moeda..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">
          <BsSearch size={30} color="#fff" />
        </button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Valor mercado</th>
            <th>Preço</th>
            <th>Volume</th>
            <th>Mudança 24h</th>
          </tr>
        </thead>
        <tbody>
          {coins.map((coin) => (
            <tr className={styles.tr} key={coin.id}>
              <td className={styles.tdLabel} data-label="Moeda">
                <div className={styles.name}>
                  <img
                    src={coin.image}
                    alt={coin.name}
                    style={{ width: 20, marginRight: 10 }}
                  />
                  <Link to={`/detail/${coin.id}`}>
                    <span>
                      {coin.name} | {coin.symbol.toUpperCase()}
                    </span>
                  </Link>
                </div>
              </td>
              <td className={styles.tdLabel} data-label="Valor mercado">
                {formatCurrency(coin.market_cap)}
              </td>
              <td className={styles.tdLabel} data-label="Preço">
                {formatCurrency(coin.current_price)}
              </td>
              <td className={styles.tdLabel} data-label="Volume">
                {formatCurrency(coin.total_volume)}
              </td>
              <td
                className={
                  coin.price_change_percentage_24h >= 0
                    ? styles.tdProfit
                    : styles.tdLoss
                }
                data-label="Mudança 24h"
              >
                <span>{coin.price_change_percentage_24h.toFixed(2)}%</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        className={styles.buttonMore}
        onClick={handleGetMore}
        disabled={loadingMore}
      >
        {loadingMore ? "Carregando..." : "Carregar mais"}
      </button>
    </main>
  );
}
