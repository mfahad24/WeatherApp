import React from "react";
import { configure, shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import WeatherApp from "./WeatherApp";
import ChangeViewButton from "./components/ChangeViewButton/ChangeViewButton";
configure({ adapter: new Adapter() });

it("WeatherApp renders without crashing", () => {
  shallow(<WeatherApp />);
});

it("Expects to find button element in the DOM", () => {
  const wrapper = shallow(<ChangeViewButton />);
  expect(wrapper.find("button")).toHaveLength(1);
});

it("Should initialize this.state.singleDayWeather to null", () => {
  const app = shallow(<WeatherApp />);
  expect(app.state("singleDayWeather")).toEqual(null);
});

it("Should initialize this.state.fiveDayWeather to null", () => {
  const app = shallow(<WeatherApp />);
  expect(app.state("fiveDayWeather")).toEqual(null);
});

it("WeatherApp state updates after search bar input is changed", () => {
  const wrapper = mount(<WeatherApp />);
  const input = wrapper.find("input");
  input.simulate("change", { target: { value: "Detroit" } });
  expect(wrapper.state().queryParam).toEqual("Detroit");
});

it("queryParam state remains an empty string with user entry of a number", () => {
  const wrapper = mount(<WeatherApp />);
  const input = wrapper.find("input");
  input.simulate("change", { target: { value: 23 } });
  expect(wrapper.state().queryParam).toEqual("");
});

it("queryParam state remains an empty string with user entry of special characters", () => {
  const wrapper = mount(<WeatherApp />);
  const input = wrapper.find("input");
  input.simulate("change", { target: { value: "&Detroit" } });
  expect(wrapper.state().queryParam).toEqual("");

  //only tested one special character, but there are many more
});
