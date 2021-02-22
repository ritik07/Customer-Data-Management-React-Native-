import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Home from "../Screens/Home/Home";
import Login from "../Screens/Login/Login";
import FormDetail from "../Screens/FormDetail/FormDetail";
import AddForm from "../Screens/AddForm/AddForm";

const screens = {
  Home: {
    screen: Home,
  },
  Login: {
    screen: Login,
  },
  FormDetail: {
    screen: FormDetail,
  },
  AddForm: {
    screen: AddForm,
  },
};

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);
