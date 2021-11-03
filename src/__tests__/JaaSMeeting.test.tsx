import * as React from 'react'
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { JaaSMeeting } from '../index';
import { DEFAULT_OPTIONS } from '../constants';

describe('JaaSMeeting component', () => {

  it('should render correctly', () => {
    const props = {
      id: "testingRender",
      appId: "testAppId",
      options: DEFAULT_OPTIONS,
      onApiReady: () => { return {}; }
    };
    const wrapper = shallow(<JaaSMeeting {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});