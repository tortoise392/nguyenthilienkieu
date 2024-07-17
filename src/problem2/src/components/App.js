import { useEffect, useMemo, useRef, useState } from 'react';
import style from '../assets/styles/App.module.css';
import Box from './Box';
import Dropdown from './Dropdown';
import Input from './Input';
import { getDummyData } from '../data'
import Loading from './Loading';

const AMOUNT_REGEX = /^[0-9]*\.?[0-9]*$/;
const DIGIT = 5;

function App() {
  const [send, setSend] = useState('');
  const [sendCurrency, setSendCurrency] = useState({});
  const [receive, setReceive] = useState('');
  const [receiveCurrency, setReceiveCurrency] = useState({});
  const [rate, setRate] = useState(0);
  const [expectedSend, setExpectedSend] = useState(0);
  const [expectedReceive, setExpectedReceive] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const currencies = useRef([]);

  useEffect(() => {
    setTimeout(() => {
      currencies.current = getDummyData();
      setIsLoading(false);
    }, 0);
  }, []);

  useEffect(() => {
    setCalculatedRate();
  }, [sendCurrency, receiveCurrency, send, receive])

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!sendCurrency?.currency || !receiveCurrency?.currency) {
      alert('Select send currency and receive currency to continue.')
    } else if (send === '' && receive === '') {
      alert('Enter either the send amount or the receive amount.')
    } else {
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        alert("Success!");
      }, 1000);
    }
  }

  const handleSendChange = (e) => {
    const val = e.target.value;

    if (!AMOUNT_REGEX.test(val)) {
      return;
    }

    setSend(val);
    setExpectedSend(val);
    setReceive('');
    setExpectedReceive(0);
  }

  const handleReceiveChange = (e) => {
    const val = e.target.value;

    if (!AMOUNT_REGEX.test(val)) {
      return;
    }

    setSend('');
    setExpectedSend(0);
    setReceive(val);
    setExpectedReceive(val);
  }

  const setCalculatedRate = () => {
    let text = 0, cal = 0;

    if (sendCurrency?.currency && receiveCurrency?.currency) {
      cal = sendCurrency.price / receiveCurrency.price;
      text = `1 ${sendCurrency.currency} = ${cal.toFixed(DIGIT)} ${receiveCurrency.currency}`

      if (send !== '') {
        setExpectedReceive((send*cal).toFixed(DIGIT));
      } else if (receive !== '') {
        cal = receiveCurrency.price / sendCurrency.price;
        setExpectedSend((receive*cal).toFixed(DIGIT));
      }
    }

    setRate(text);
  }
  
  return (
    <>
      {!isLoading ?
        <div className={style.container}>
          <form className={style.mainContainer} onSubmit={handleSubmit}>
            <Box text="Amount to send">
              <Dropdown currencies={currencies.current} currency={sendCurrency} setCurrency={setSendCurrency} />
              <Input value={send} onChange={handleSendChange} />
            </Box>
            <Box text="Amount to receive" istyle={{ marginTop: '40px', marginBottom: '20px' }}>
              <Dropdown currencies={currencies.current} currency={receiveCurrency} setCurrency={setReceiveCurrency} />
              <Input value={receive} onChange={handleReceiveChange} />
            </Box>
            <div className={style.infoRow}>
              <span>Exchange rate</span>
              <span>{rate}</span>
            </div>
            <div className={style.infoRow}>
              <span>Expected send</span>
              <span>{expectedSend}</span>
            </div>
            <div className={style.infoRow}>
              <span>Exchange receive</span>
              <span>{expectedReceive}</span>
            </div>
            <button type="submit" disabled={isProcessing} className={style.button}>{isProcessing ? 'Processing...' : 'Confirm swap'}</button>
          </form>
        </div>
        : <Loading />
      }
    </>
  );
}

export default App;
