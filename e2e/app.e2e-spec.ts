import { CrewportalQarPage } from './app.po';

describe('crewportal-qar App', () => {
  let page: CrewportalQarPage;

  beforeEach(() => {
    page = new CrewportalQarPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
