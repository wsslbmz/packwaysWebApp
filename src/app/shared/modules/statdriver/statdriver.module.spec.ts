import { StatDriverModule } from './statdriver.module';

describe('StatDriverModule', () => {
    let statDriverModule: StatDriverModule;

    beforeEach(() => {
        statDriverModule = new StatDriverModule();
    });

    it('should create an instance', () => {
        expect(statDriverModule).toBeTruthy();
    });
});
