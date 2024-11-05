import { makeAutoObservable } from 'mobx';

class RootStore {
  isAppLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  loadFiles = async () => {
    this.setIsLoading(true);
    try {
      // TBD
    } catch (error) {
      console.error(error);
    } finally {
      this.setIsLoading(false);
    }
  };

  get isLoading() {
    return this.isAppLoading;
  }

  private setIsLoading = (isLoading: boolean) => {
    this.isAppLoading = isLoading;
  };
}

const rootStore = new RootStore();
export const useRootStore = () => rootStore;
export default rootStore;
