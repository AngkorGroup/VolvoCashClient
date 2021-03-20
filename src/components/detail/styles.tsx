import { StyleSheet } from 'react-native';
import { theme } from 'utils/styles';
import { unit } from 'utils/responsive';

export default StyleSheet.create({
  container: {
    flex: 1,
    ...theme.background,
  },
  card: {
    ...theme.surface,
    ...theme.shadow,
    marginVertical: unit(20),
    paddingVertical: unit(20),
    paddingHorizontal: unit(40),
    alignItems: 'center',
  },
  buttonsContainer: {
    alignItems: 'center',
    marginTop: unit(20),
  },
  button: {
    marginVertical: unit(10),
  },
  shareContainer: {
    marginVertical: unit(10),
  },
  amountRow: {
    fontWeight: '700',
  },
});
