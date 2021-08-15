import ProgressStore from "./progress";
import AuthStore from "./auth"
const Store = {
  progressStore: new ProgressStore(),
  authStore: new AuthStore()
}
export default Store
