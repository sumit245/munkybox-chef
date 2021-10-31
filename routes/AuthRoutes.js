import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../components/auth/login.component";
import Signup from "../components/auth/signup.component";
import MainRoutes from "./MainRoutes";
import PinPage from "../components/auth/pin.component";
import OtpComponent from "../components/auth/otp.component";
import PastOrders from "../screens/PastOrders";
import OrderDetails from "../components/pastorders/OrderDetails";
import AddMealsLayout from "../components/add_meals/AddMealsLayout";
import NewOrders from "../components/orders/NewOrders";
import GenerateCoupon from "../components/coupons/GenerateCoupon";
import SelectCoupon from "../components/campaign/SelectCoupon";
import CreateCoupon from "../components/campaign/CreateCoupon";
import PreviewCoupon from "../components/campaign/PreviewCoupon";
import PromoSubmit from "../components/campaign/promo.submit";
import SelectBanners from "../components/campaign/SelectBanners";
import CreateBanner from "../components/campaign/CreateBanner";
import PreviewBanner from "../components/campaign/PreviewBanner";
import TrackPerformance from "../components/campaign/TrackPerformance";

const Stack = createStackNavigator();

export default function AuthRoutes({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Pin">
        {(props) => <PinPage {...props} />}
      </Stack.Screen>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="OTP">
        {(props) => <OtpComponent {...props} />}
      </Stack.Screen>
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="myOrders" component={PastOrders} />
      <Stack.Screen name="orderDetails" component={OrderDetails} />
      <Stack.Screen name="Main" component={MainRoutes} />
      <Stack.Screen name="newOrders" component={NewOrders} />
      <Stack.Screen name="add_meals" component={AddMealsLayout} />
      <Stack.Screen name="coupons" component={GenerateCoupon} />
      <Stack.Screen name="selectpromo" component={SelectCoupon} />
      <Stack.Screen name="create_coupon" component={CreateCoupon} />
      <Stack.Screen name="preview_coupon" component={PreviewCoupon} />
      <Stack.Screen name="submit_coupon" component={PromoSubmit} />
      <Stack.Screen name="select_banner" component={SelectBanners} />
      <Stack.Screen name="create_banner" component={CreateBanner} />
      <Stack.Screen name="preview_banner" component={PreviewBanner} />
      <Stack.Screen name="track" component={TrackPerformance} />
    </Stack.Navigator>
  );
}
