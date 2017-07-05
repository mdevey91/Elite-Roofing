import { PaymentsPage } from './app.po';

describe('payments App', () => {
  let page: PaymentsPage;

  beforeEach(() => {
    page = new PaymentsPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
