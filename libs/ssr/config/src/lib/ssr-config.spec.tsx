import { render } from '@testing-library/react';

import SsrConfig from './ssr-config';

describe('SsrConfig', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SsrConfig />);
    expect(baseElement).toBeTruthy();
  });
});
