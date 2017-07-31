import { DocsAppPage } from './app.po';

describe('docs-app App', () => {
  let page: DocsAppPage;

  beforeEach(() => {
    page = new DocsAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
