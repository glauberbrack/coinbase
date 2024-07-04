import React, {useEffect, useState} from 'react';
import {Image, View, ScrollView} from 'react-native';

import {Typography, Button} from '../../components/common';
import {styles} from './styles';
import {getCurrencies} from '../../api/currencies.api';

const USER_COINS = ['BTC', 'ETH', 'LTC', 'BCH', 'XRP', 'ADA'];

export const Home = () => {
  const [currencies, setCurrencies] = useState<TCurrency[]>([]);

  const onPageLoad = async () => {
    try {
      const response = await getCurrencies();
      const filteredCurrencies = response.filter(currency =>
        USER_COINS.includes(currency.currency),
      );

      setCurrencies(filteredCurrencies);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    onPageLoad();
  }, []);

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
        <Typography size="small" marginTop="max" marginBottom="lg">
          Your coins
        </Typography>
        {currencies.map(item => (
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
        ))}
      </ScrollView>
      <View>
        <Button text="Connect to Live Market" />
      </View>
    </View>
  );
};
