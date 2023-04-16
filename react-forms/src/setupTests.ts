import matchers from '@testing-library/jest-dom/matchers';
import { expect } from 'vitest';

window.scrollTo = () => {};

expect.extend(matchers);
