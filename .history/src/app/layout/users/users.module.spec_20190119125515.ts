import { UsersModule } from './users.module';

describe('TablesModule', () => {
  let usersModule: UsersModule;

  beforeEach(() => {
    usersModule = new UsersModule();
  });

  it('should create an instance', () => {
    expect(usersModule).toBeTruthy();
  });
});
