import { PickUpModule } from './pickup.module';

describe('BlankPageModule', () => {
    let pickUpModule: PickUpModule;

    beforeEach(() => {
        pickUpModule = new PickUpModule();
    });

    it('should create an instance', () => {
        expect(pickUpModule).toBeTruthy();
    });
});
