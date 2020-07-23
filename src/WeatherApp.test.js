import React from "react";
import { configure, shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import WeatherApp from "./WeatherApp";
import ChangeViewButton from "./components/ChangeViewButton";
configure({ adapter: new Adapter() });

it("WeatherApp renders without crashing", () => {
  shallow(<WeatherApp />);
});

it("Expects to find button element in the DOM", () => {
  const wrapper = shallow(<ChangeViewButton />);
  expect(wrapper.find("button")).toHaveLength(1);
});

it("WeatherApp state updates after search bar input is changed", () => {
  const wrapper = shallow(<WeatherApp />);
  const input = wrapper.find("input");
  input.simulate("change", { target: { value: "Detroit" } });
  expect(wrapper.state().queryParam).toEqual("Detroit");
});

it("Should initialize this.state.weather to null", () => {
  const app = shallow(<WeatherApp />);
  expect(app.state("weather")).toEqual(null);
});

it("Should initialize this.state.fiveDayWeather to null", () => {
  const app = shallow(<WeatherApp />);
  expect(app.state("fiveDayWeather")).toEqual(null);
});
