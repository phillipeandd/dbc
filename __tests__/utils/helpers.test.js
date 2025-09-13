import { validateEmail, validatePhone, truncateText, generateInitials } from '../../utils/helpers';

describe('Helper Functions', () => {
  describe('validateEmail', () => {
    it('validates correct email', () => {
      expect(validateEmail('test@example.com')).toBe(true);
    });

    it('rejects invalid email', () => {
      expect(validateEmail('invalid-email')).toBe(false);
    });
  });

  describe('validatePhone', () => {
    it('validates correct phone number', () => {
      expect(validatePhone('1234567890')).toBe(true);
    });

    it('rejects invalid phone number', () => {
      expect(validatePhone('123')).toBe(false);
    });
  });

  describe('truncateText', () => {
    it('truncates long text', () => {
      const longText = 'This is a very long text that should be truncated';
      expect(truncateText(longText, 20)).toBe('This is a very long ...');
    });

    it('returns original text if shorter than max length', () => {
      const shortText = 'Short text';
      expect(truncateText(shortText, 20)).toBe('Short text');
    });
  });

  describe('generateInitials', () => {
    it('generates initials from full name', () => {
      expect(generateInitials('John Doe')).toBe('JD');
    });

    it('handles single name', () => {
      expect(generateInitials('John')).toBe('J');
    });

    it('handles empty name', () => {
      expect(generateInitials('')).toBe('?');
    });
  });
});