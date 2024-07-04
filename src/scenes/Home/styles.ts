import {StyleSheet} from 'react-native';
import {defaultTheme} from '../../theme';

export const styles = StyleSheet.create({
  wrapper: {
    padding: 20,
    height: '100%',
  },
  header: {
    width: '100%',
  },
  currencyItem: {
    paddingVertical: defaultTheme.spacing.xl,
    paddingHorizontal: defaultTheme.spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: defaultTheme.ui.grey1,
    borderRadius: defaultTheme.borderRadius.md,
    backgroundColor: defaultTheme.ui.white,
    marginBottom: defaultTheme.spacing.md,
  },
  currencyInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currencyImage: {
    width: 30,
    height: 30,
    borderRadius: 30,
    marginRight: defaultTheme.spacing.md,
    backgroundColor: defaultTheme.ui.grey2,
  },
});
