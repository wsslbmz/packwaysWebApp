import { DriversModule } from './drivers.module';

describe('TablesModule', () => {
  let driversModule: DriversModule;

  beforeEach(() => {
    driversModule = new DriversModule();
  });

  it('should create an instance', () => {
    expect(driversModule).toBeTruthy();
  });
});
