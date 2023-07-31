import React, { useState, useEffect } from "react";
import "./styles.css";
import {
  FiPlayCircle,
  FiPauseCircle,
  FiStopCircle,
  FiPlusCircle,
  FiMinusCircle
} from "react-icons/fi";

import { BsSun, BsMoon } from "react-icons/bs";
import { Container } from "./styles";

const CountdownTimer = () => {
  const [timeRemaining, setTimeRemaining] = useState(60);
  const [running, setRunning] = useState(false);
  const [paused, setPaused] = useState(false);
  const [finished, setFinished] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    let interval;

    if (running && timeRemaining > 0) {
      // Iniciar o timer se estiver rodando e o tempo for maior que zero
      interval = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000); // Intervalo de 1 segundo
    } else if (!running && timeRemaining !== 0) {
      // Parar o timer se não estiver rodando e o tempo for maior que zero
      clearInterval(interval);
    } else if (timeRemaining === 0) {
      // Se o tempo chegou a zero, pare o timer e faça alguma ação
      clearInterval(interval);
      // Aqui, você pode executar uma ação, por exemplo, mostrar uma mensagem ou chamar uma função de callback.
      setRunning(false);
      setPaused(false);
      setFinished(true);
    }

    // Limpar o intervalo quando o componente for desmontado
    return () => clearInterval(interval);
  }, [running, timeRemaining]);

  // Função para formatar o tempo em minutos e segundos
  const formatTime = () => {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    return `${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const handlePlay = () => {
    setFinished(false);
    setRunning(true);
    setPaused(false);
  };

  const handlePause = () => {
    setRunning(false);
    setPaused(true);
  };

  const handleStop = () => {
    setRunning(false);
    setPaused(false);
    setTimeRemaining(60);
  };

  const handleIncreaseTime = () => {
    if (timeRemaining >= 60) {
      // Aumenta de 1 em 1 minuto quando o tempo for maior que 1 minuto
      setTimeRemaining((prevTime) => prevTime + 60);
    } else if (timeRemaining >= 5) {
      // Aumenta de 5 em 5 segundos quando o tempo estiver entre 5 segundos e 1 minuto
      setTimeRemaining((prevTime) => prevTime + 5);
    } else {
      // Aumenta de 1 em 1 segundo quando o tempo for menor que 10 segundos
      setTimeRemaining((prevTime) => prevTime + 1);
    }
  };

  const handleDecreaseTime = () => {
    if (timeRemaining > 60) {
      // Diminui de 1 em 1 minuto quando o tempo for maior que 1 minuto
      setTimeRemaining((prevTime) => prevTime - 60);
    } else if (timeRemaining > 10) {
      // Diminui de 5 em 5 segundos quando o tempo estiver entre 10 segundos e 1 minuto
      setTimeRemaining((prevTime) => prevTime - 5);
    } else {
      // Diminui de 1 em 1 segundo quando o tempo for menor que 10 segundos, mas não permite tempo negativo
      setTimeRemaining((prevTime) => (prevTime - 1 >= 0 ? prevTime - 1 : 0));
    }
  };

  return (
    <Container theme={darkMode ? "dark" : "light"}>
      <h1>{formatTime()}</h1>
      <div className="controls">
        <button disabled={timeRemaining === 0} onClick={handlePlay}>
          <FiPlayCircle size={35} color={running ? "#42D3FF" : "#F8F8FC"} />
        </button>
        <button disabled={!running && !paused} onClick={handlePause}>
          <FiPauseCircle size={35} color={paused ? "#42D3FF" : "#F8F8FC"} />
        </button>
        <button disabled={!running && !paused} onClick={handleStop}>
          <FiStopCircle size={35} color={"#F8F8FC"} />
        </button>
        <button disabled={running || paused} onClick={handleIncreaseTime}>
          <FiPlusCircle size={35} />
        </button>
        <button
          disabled={running || paused || timeRemaining === 0}
          onClick={handleDecreaseTime}
        >
          <FiMinusCircle size={35} />
        </button>
      </div>
      {finished && <h2>Finished</h2>}
      <button
        className="theme-button"
        onClick={() => setDarkMode((state) => !state)}
      >
        {darkMode ? <BsSun size={20} /> : <BsMoon size={20} />}
      </button>
    </Container>
  );
};

export default CountdownTimer;
