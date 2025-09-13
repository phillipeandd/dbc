import { StyleSheet } from 'react-native';
import { lightTheme } from '../theme';

export const createGlobalStyles = (theme = lightTheme) => StyleSheet.create({
  // Layout styles
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  rowCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  column: {
    flexDirection: 'column',
  },

  // Spacing utilities
  mt_xs: { marginTop: theme.spacing.xs },
  mt_sm: { marginTop: theme.spacing.sm },
  mt_md: { marginTop: theme.spacing.md },
  mt_lg: { marginTop: theme.spacing.lg },
  mt_xl: { marginTop: theme.spacing.xl },

  mb_xs: { marginBottom: theme.spacing.xs },
  mb_sm: { marginBottom: theme.spacing.sm },
  mb_md: { marginBottom: theme.spacing.md },
  mb_lg: { marginBottom: theme.spacing.lg },
  mb_xl: { marginBottom: theme.spacing.xl },

  mx_xs: { marginHorizontal: theme.spacing.xs },
  mx_sm: { marginHorizontal: theme.spacing.sm },
  mx_md: { marginHorizontal: theme.spacing.md },
  mx_lg: { marginHorizontal: theme.spacing.lg },
  mx_xl: { marginHorizontal: theme.spacing.xl },

  my_xs: { marginVertical: theme.spacing.xs },
  my_sm: { marginVertical: theme.spacing.sm },
  my_md: { marginVertical: theme.spacing.md },
  my_lg: { marginVertical: theme.spacing.lg },
  my_xl: { marginVertical: theme.spacing.xl },

  p_xs: { padding: theme.spacing.xs },
  p_sm: { padding: theme.spacing.sm },
  p_md: { padding: theme.spacing.md },
  p_lg: { padding: theme.spacing.lg },
  p_xl: { padding: theme.spacing.xl },

  px_xs: { paddingHorizontal: theme.spacing.xs },
  px_sm: { paddingHorizontal: theme.spacing.sm },
  px_md: { paddingHorizontal: theme.spacing.md },
  px_lg: { paddingHorizontal: theme.spacing.lg },
  px_xl: { paddingHorizontal: theme.spacing.xl },

  py_xs: { paddingVertical: theme.spacing.xs },
  py_sm: { paddingVertical: theme.spacing.sm },
  py_md: { paddingVertical: theme.spacing.md },
  py_lg: { paddingVertical: theme.spacing.lg },
  py_xl: { paddingVertical: theme.spacing.xl },

  // Text styles
  textCenter: { textAlign: 'center' },
  textLeft: { textAlign: 'left' },
  textRight: { textAlign: 'right' },

  // Common card style
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    ...theme.shadows.md,
  },

  // Form styles
  formContainer: {
    padding: theme.spacing.md,
  },

  inputContainer: {
    marginBottom: theme.spacing.md,
  },

  // Button styles
  buttonPrimary: {
    backgroundColor: theme.colors.primary[500],
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.md,
  },

  buttonSecondary: {
    backgroundColor: theme.colors.secondary[500],
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.sm,
  },

  buttonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: theme.colors.primary[500],
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonText: {
    color: theme.colors.text.inverse,
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.semibold,
    fontFamily: theme.typography.fontFamily.medium,
  },

  buttonTextOutline: {
    color: theme.colors.primary[500],
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.semibold,
    fontFamily: theme.typography.fontFamily.medium,
  },

  // Divider
  divider: {
    height: 1,
    backgroundColor: theme.colors.neutral[200],
    marginVertical: theme.spacing.md,
  },

  // Loading overlay
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
});

export default createGlobalStyles();