import { useState, FormEvent } from "react";
import styles from "./home.module.css";
import { BsSearch } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";

export function Home() {

    const [input, setInput] = useState("");
    const navigate = useNavigate();

    function handleSubmit(e:FormEvent)  {
        e.preventDefault();

        if (input === "") return;

        navigate(`/detail/${input}`);
    };

    function handleGetMore() {
        alert("Carregar mais moedas");
    };

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
                        <th scope="col">Nome</th>
                        <th scope="col">Valor mercado</th>
                        <th scope="col">Preco</th>
                        <th scope="col">Volume</th>
                        <th scope="col">Mudanca 24h</th>
                    </tr>
                </thead>
                
                <tbody id="tbody">
                    <tr className={styles.tr}>
                        <td className={styles.tdLabel} data-label="Moeda">
                            <div className={styles.name}>
                                <Link to={"./detail/bitcoin"}>
                                    <span>Bitcoin | BTC</span>
                                </Link>
                            </div>
                        </td>

                        <td className={styles.tdLabel} data-label="Valor mercado">
                            1T
                        </td>
                        <td className={styles.tdLabel} data-label="Preco">
                            8.000
                        </td>
                        <td className={styles.tdLabel} data-label="Volume">
                            2B
                        </td>
                        <td className={styles.tdProfit} data-label="Mudanca 24h">
                            <span>1.20</span>
                        </td>
                    </tr>
                </tbody>
            </table>

            <button 
                className={styles.buttonMore}
                onClick={handleGetMore}>
                    Carregar mais
            </button>
        </main>
    );
}
