import {createAsyncThunk, createSlice, PayloadAction} from '../../modules';
import {getCurrencies} from '../../api/currencies.api';

interface CurrencyState {
  currencies: TCurrency[];
  loading: boolean;
  error: string | null;
}

const initialState: CurrencyState = {
  currencies: [],
  loading: false,
  error: null,
};

export const fetchCurrencies = createAsyncThunk(
  'currency/fetchCurrencies',
  async () => {
    const response = await getCurrencies();
    return response;
  },
);

const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    updateCurrencyValue: (
      state,
      action: PayloadAction<{currency: string; value: number}>,
    ) => {
      const index = state.currencies.findIndex(
        c => c.currency === action.payload.currency,
      );
      if (index !== -1) {
        state.currencies[index].value = action.payload.value;
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCurrencies.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCurrencies.fulfilled, (state, action) => {
        state.currencies = action.payload;
        state.loading = false;
      })
      .addCase(fetchCurrencies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch currencies';
      });
  },
});

export const {updateCurrencyValue} = currencySlice.actions;
export default currencySlice.reducer;
