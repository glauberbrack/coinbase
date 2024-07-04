import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Image, View, ScrollView, ActivityIndicator} from 'react-native';
import {Typography, Button} from '../../components/common';
import {styles} from './styles';
import {
  fetchCurrencies,
  updateCurrencyValue,
} from '../../store/slices/currencySlice';
import {RootState, AppDispatch} from '../../store';
import {getEnv} from '../../utils';

const USER_COINS = ['BTC', 'ETH', 'LTC', 'BCH', 'XRP', 'ADA'];

const {COINBASE_WS} = getEnv();

export const Home = () => {
  // @redux
  const dispatch = useDispatch<AppDispatch>();
  const {currencies, loading} = useSelector(
    (state: RootState) => state.currency,
  );

  // @states
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  const handleLiveMarket = () => {
    if (!connected) {
      setConnecting(true);
      const ws = new WebSocket(COINBASE_WS);
      ws.onopen = () => {
        console.log('WebSocket connected');
        ws.send(
          JSON.stringify({
            type: 'subscribe',
            channels: [
              {
                name: 'ticker',
                product_ids: USER_COINS.map(coin => `${coin}-USD`),
              },
            ],
          }),
        );
        setConnected(true);
        setConnecting(false);
      };

      ws.onmessage = e => {
        const data = JSON.parse(e.data);
        if (data.type === 'ticker') {
          dispatch(
            updateCurrencyValue({
              currency: data.product_id.split('-')[0],
              value: parseFloat(data.price),
            }),
          );
        }
      };

      ws.onclose = () => {
        console.log('WebSocket disconnected');
        setConnected(false);
        setConnecting(false);
        dispatch(fetchCurrencies());
      };

      setSocket(ws);
    } else {
      if (socket) {
        socket.close();
      }
    }
  };

  // @effects
  useEffect(() => {
    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [socket]);

  useEffect(() => {
    dispatch(fetchCurrencies());
  }, [dispatch]);

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <Typography variant="light" size="small" marginBottom="xs">
          Asset value
        </Typography>
        <Typography size="h2" bold>
          $11,600
        </Typography>
      </View>

      <ScrollView>
        <Typography size="medium" marginTop="max" marginBottom="lg">
          Your coins{' '}
          {connected && (
            <Typography size="medium" marginLeft="md" variant="error">
              🔴 Live
            </Typography>
          )}
        </Typography>
        {loading ? (
          <ActivityIndicator />
        ) : (
          currencies
            .filter(currency => USER_COINS.includes(currency.currency))
            .map(item => (
              <View
                key={`currency-${item.currency}`}
                style={styles.currencyItem}>
                <View style={styles.currencyInfo}>
                  {item.image && (
                    <Image
                      source={{
                        uri: item.image,
                      }}
                      style={styles.currencyImage}
                    />
                  )}
                  <Typography size="h4" bold>
                    {item.currency}
                  </Typography>
                </View>
                <Typography size="medium" bold>
                  {item.value}
                </Typography>
              </View>
            ))
        )}
      </ScrollView>
      <View>
        <Button
          text={
            connected ? 'Disconnect from Live Market' : 'Connect to Live Market'
          }
          isLoading={connecting}
          variant={connected ? 'light' : 'default'}
          onPress={handleLiveMarket}
        />
      </View>
    </View>
  );
};
