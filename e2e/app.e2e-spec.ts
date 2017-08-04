import { EdutermFrontendPage } from './app.po';

describe('eduterm-frontend App', () => {
  let page: EdutermFrontendPage;

  beforeEach(() => {
    page = new EdutermFrontendPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
