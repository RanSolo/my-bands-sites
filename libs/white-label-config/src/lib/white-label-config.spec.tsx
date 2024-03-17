import { render } from '@testing-library/react';

import WhiteLabelConfig from './white-label-config';

describe('WhiteLabelConfig', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<WhiteLabelConfig />);
    expect(baseElement).toBeTruthy();
  });
});
