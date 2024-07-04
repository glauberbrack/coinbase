import React, {useEffect, useState} from 'react';

import {getEnv} from '../../utils';

import {Image, View, ScrollView, ActivityIndicator} from 'react-native';
import {Typography, Button} from '../../components/common';
import {styles} from './styles';
import {getCurrencies} from '../../api/currencies.api';

const USER_COINS = ['BTC', 'ETH', 'LTC', 'BCH', 'XRP', 'ADA'];
const {COINBASE_WS} = getEnv();

export const Home = () => {
  // @states
  const [loading, setLoading] = useState(false);
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);

  const [currencies, setCurrencies] = useState<TCurrency[]>([]);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  // @loaders
  const onPageLoad = async () => {
    try {
      setLoading(true);
      const response = await getCurrencies();
      const filteredCurrencies = response.filter(currency =>
        USER_COINS.includes(currency.currency),
      );

      setCurrencies(filteredCurrencies);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // @handlers
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
                product_ids: [
                  'BTC-USD',
                  'ETH-USD',
                  'LTC-USD',
                  'BCH-USD',
                  'XRP-USD',
                  'ADA-USD',
                ],
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
          setCurrencies(prevCurrencies =>
            prevCurrencies.map(currency =>
              currency.currency === data.product_id.split('-')[0]
                ? {...currency, value: parseFloat(data.price)}
                : currency,
            ),
          );
        }
      };

      ws.onclose = () => {
        console.log('WebSocket disconnected');
        setConnected(false);
        setConnecting(false); // Set loading state to false when connection is closed
        onPageLoad(); // Reset to API data
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
    onPageLoad();

    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [socket]);

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
          currencies.map(item => (
            <View key={`currency-${item.currency}`} style={styles.currencyItem}>
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
